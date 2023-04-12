#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./manage-sqitch.sh <action>"
  echo "  action: create, deploy, revert, or verify"
  exit 1
fi

ACTION=$1

case "$ACTION" in
  create)
    echo "Enter migration name:"
    read migration_name
    sqitch add "$migration_name" --dir ./sql/migrations
    ;;
  deploy)
    docker exec -t circles-dev bash -c "cd /sql/migrations && sqitch deploy"
    ;;
  revert)
    docker exec -t circles-dev bash -c "cd /sql/migrations && sqitch revert"
    ;;
  verify)
    docker exec -t circles-dev bash -c "cd /sql/migrations && sqitch verify"
    ;;
  *)
    echo "Invalid action. Use create, deploy, revert, or verify."
    exit 1
    ;;
esac
