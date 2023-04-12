#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: ./manage-docker.sh <action> <environment>"
  echo "  action: start, stop, restart, migrate, or setup"
  echo "  environment: dev or test"
  exit 1
fi

ACTION=$1
ENV=$2

create_volume() {
  VOLUME_EXISTS=$(docker volume ls -q --filter name=circles-volume)
  if [ -z "$VOLUME_EXISTS" ]; then
    echo "Creating volume"
    docker volume create circles-volume
  else
    echo "Volume already exists"
  fi
}

build_image() {
  IMAGE_EXISTS=$(docker images -q circles-image)
  if [ -z "$IMAGE_EXISTS" ]; then
    echo "Building image"
    docker build -t circles-image ./sql
  else
    echo "Image already exists"
  fi
}

case "$ACTION" in
  start)
    echo "Starting $ENV environment"

    # Check if network exists
    NETWORK_EXISTS=$(docker network ls -q --filter name=circles)
    if [ -z "$NETWORK_EXISTS" ]; then
      echo "Creating network"
      docker network create circles
    else
      echo "Network already exists"
    fi

    # Check if volume exists
    create_volume

    # Check if image exists
    build_image
    # Start container
    TARGET=$ENV docker-compose --project-name circles -f ./sql/docker-compose.yml up -d circles-$ENV

    # Wait for the PostgreSQL server to initialize
    echo "Waiting for the PostgreSQL server to initialize"
    sleep 10

    # Run Sqitch migration
    echo "Running Sqitch migration on the $ENV environment"
    if [ "$ENV" == "dev" ] || [ "$ENV" == "test" ]; then
        docker exec -t circles-$ENV bash -c "cd ./migrations && sqitch deploy --target $ENV"
    else
        echo "Sqitch migration not supported for the $ENV environment"
        exit 1
    fi
    ;;

  stop)
    echo "Stopping $ENV environment"
    docker-compose --project-name circles -f ./sql/docker-compose.yml --project-name circles rm -f -s -v circles-$ENV
    ;;
  restart)
    echo "Restarting $ENV environment"
    docker-compose --project-name circles -f ./sql/docker-compose.yml --project-name circles restart circles-$ENV
    ;;

  migrate)
    echo "Running migration on the $ENV environment"
    if [ "$ENV" == "dev" ] || [ "$ENV" == "test" ]; then
      docker exec -t circles-$ENV bash -c "cd /sql/migrations && sqitch deploy --target $ENV"
    else
      echo "Migrations not supported for the $ENV environment"
      exit 1
    fi
    ;;

  setup)
    echo "Setting up database on the $ENV environment"

    # Check if network exists
    NETWORK_EXISTS=$(docker network ls -q --filter name=circles)
    if [ -z "$NETWORK_EXISTS" ]; then
      echo "Creating network"
      docker network create circles
    else
      echo "Network already exists"
    fi

    # Check if volume exists
    create_volume

    # Check if image exists
    build_image

    # Run migrations
    docker exec -t circles-$ENV bash -c "cd ./migrations && sqitch deploy --target $ENV"
    ;;

  *)
    echo "Invalid action. Use start, stop, restart, migrate, or setup."
    exit 1
    ;;
esac
