#!/bin/bash

# Define colors for pretty print
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if Docker is running. If not, the script will exit.
check_docker() {
  if ! docker info >/dev/null 2>&1; then
    echo -e "${RED}Docker is not running. Please start Docker and try again.${NC}"
    exit 1
  fi
}

# Function to create a Docker volume if it does not already exist.
create_volume() {
  VOLUME_NAME=$1
  VOLUME_EXISTS=$(docker volume ls -q --filter name=$VOLUME_NAME)
  if [ -z "$VOLUME_EXISTS" ]; then
    echo -e "${BLUE}Creating volume $VOLUME_NAME...${NC}"
    docker volume create $VOLUME_NAME
    echo -e "${GREEN}Volume $VOLUME_NAME created.${NC}"
  else
    echo -e "${YELLOW}Volume $VOLUME_NAME already exists.${NC}"
  fi
}

# Function to remove a Docker volume if it exists.
remove_volume() {
  VOLUME_NAME=$1
  VOLUME_EXISTS=$(docker volume ls -q --filter name=$VOLUME_NAME)
  if [ -n "$VOLUME_EXISTS" ]; then
    echo -e "${BLUE}Removing volume $VOLUME_NAME...${NC}"
    docker volume rm $VOLUME_NAME
    echo -e "${GREEN}Volume $VOLUME_NAME removed.${NC}"
  else
    echo -e "${YELLOW}Volume $VOLUME_NAME does not exist.${NC}"
  fi
}

# Function to perform actions (start, stop, restart) on the Docker environment
perform_action() {
  ENV=$1
  ACTION=$2

  case $ACTION in
    "start")
      echo -e "${BLUE}Starting $ENV environment...${NC}"
      
      NETWORK_EXISTS=$(docker network ls -q --filter name=circles)
      if [ -z "$NETWORK_EXISTS" ]; then
        echo -e "${BLUE}Creating network circles...${NC}"
        docker network create circles
      else
        echo -e "${YELLOW}Network circles already exists${NC}"
      fi

      create_volume "circles-volume"
      
      echo -e "${BLUE}Starting Docker container circles-$ENV...${NC}"
      TARGET=$ENV docker-compose --project-name circles -f ./sql/docker-compose.yml up -d circles-$ENV &
      wait
      
      echo -e "${BLUE}Checking if PostgreSQL server is initialized...${NC}"
      for i in {1..10}; do
        if docker exec circles-$ENV pg_isready >/dev/null 2>&1; then
          echo -e "${GREEN}PostgreSQL server is initialized.${NC}"
          break
        else
          if [ $i -eq 10 ]; then
            echo -e "${RED}PostgreSQL server is not ready after 10 attempts, waiting for 10 seconds before checking again${NC}"
            sleep 10
          else
            echo -e "${BLUE}PostgreSQL server is not ready, retrying in 1 second...${NC}"
            sleep 1
          fi
        fi
      done

      echo -e "${BLUE}Running Sqitch migration on the $ENV environment...${NC}"
      if [ "$ENV" == "dev" ] || [ "$ENV" == "test" ]; then
          cd ./sql/migrations && sqitch deploy --target $ENV &
          wait
          echo -e "${GREEN}Sqitch migration completed successfully.${NC}"
      else
          echo -e "${RED}Sqitch migration not supported for the $ENV environment${NC}"
          exit 1
      fi
      ;;
    "stop")
      echo -e "${BLUE}Stopping $ENV environment...${NC}"
      docker-compose --project-name circles -f ./sql/docker-compose.yml rm -f -s -v circles-$ENV &
      wait
      echo -e "${GREEN}Environment $ENV stopped.${NC}"
      remove_volume "circles-volume"

      # Check if PostgreSQL image exists
      POSTGRES_IMAGE_EXISTS=$(docker images -q postgres)

      if [ -n "$POSTGRES_IMAGE_EXISTS" ]; then
        # Ask if user wants to remove the PostgreSQL image
        while true; do
          echo "Do you want to remove the PostgreSQL image? [Y/N]"
          read answer
          case $answer in
            [Yy]* ) 
              echo -e "${BLUE}Removing PostgreSQL image...${NC}"
              docker rmi postgres
              echo -e "${GREEN}PostgreSQL image removed.${NC}"
              break;;
            [Nn]* ) break;;
            * ) echo "Please answer yes or no.";;
          esac
        done
      fi
      ;;
    "restart")
      echo -e "${BLUE}Restarting $ENV environment...${NC}"
      docker-compose --project-name circles -f ./sql/docker-compose.yml restart circles-$ENV &
      wait
      echo -e "${GREEN}Environment $ENV restarted.${NC}"
      ;;
    *)
      echo -e "${RED}Invalid action. Use start, stop, or restart.${NC}"
      exit 1
      ;;
  esac
}

# Check if Docker is running before proceeding
check_docker

# If no arguments are passed to the script, use "dev" as default environment
ENV=${1:-dev}
ACTION=${2:-null}

if [ $ACTION == "null" ]; then
  while true; do
    PS3='Please enter your choice: '
    options=("Start" "Stop" "Exit")
    select opt in "${options[@]}"
    do
      case $opt in
        "Start")
          perform_action $ENV "start"
          break
          ;;
        "Stop")
          perform_action $ENV "stop"
          break
          ;;
        "Exit")
          exit 0
          ;;
        *)
          echo -e "${RED}Invalid option${NC}"
          ;;
      esac
    done
  done
else
  perform_action $ENV $ACTION
fi
