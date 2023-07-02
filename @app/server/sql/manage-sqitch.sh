#!/bin/bash

# Configuration directory for Sqitch migrations
SQITCH_CONFIG_DIR="./sql/migrations"

# Infinite loop to handle user's menu choices
while true; do
  echo "Choose an action:"
  echo "1) create"
  echo "2) deploy"
  echo "3) revert"
  echo "4) verify"
  echo "5) remove"
  echo "6) exit"

  echo -n "Enter the number of your choice: "
  read ACTION

  case "$ACTION" in
    1)
      # Option to create a new Sqitch migration
      echo -n "Enter migration name: "
      read migration_name
      echo -n "Enter a note for this migration: "
      read migration_note

      # Execute Sqitch add command with provided name and note
      # Check if the command succeeds
      if sqitch --chdir $SQITCH_CONFIG_DIR add "$migration_name" --note "$migration_note"; then
        echo "Migration created successfully"
      else
        echo "Error creating migration"
        exit 1
      fi
      ;;
    2|4)
      # Choose an environment
      echo "Choose an environment:"
      echo "1) dev"
      echo "2) test"

      echo -n "Enter the number of your choice: "
      read ENV_CHOICE

      case "$ENV_CHOICE" in
        1)
          TARGET="dev"
          ;;
        2)
          TARGET="test"
          ;;
        *)
          echo "Invalid choice. Choose 1 for dev or 2 for test."
          exit 1
          ;;
      esac

      # Option to deploy or verify Sqitch migrations
      # Execute Sqitch command locally with the target as the Docker environment
      # Check if the command succeeds
      OPERATION="deploy"
      if [ "$ACTION" = "4" ]; then OPERATION="verify"; fi

      if sqitch --chdir $SQITCH_CONFIG_DIR $OPERATION --target $TARGET; then
        echo "Operation $OPERATION on $TARGET environment completed successfully"
      else
        echo "Error performing operation $OPERATION on $TARGET environment"
        exit 1
      fi
      ;;
    3)
      # Choose an environment
      echo "Choose an environment:"
      echo "1) dev"
      echo "2) test"

      echo -n "Enter the number of your choice: "
      read ENV_CHOICE

      case "$ENV_CHOICE" in
        1)
          TARGET="dev"
          ;;
        2)
          TARGET="test"
          ;;
        *)
          echo "Invalid choice. Choose 1 for dev or 2 for test."
          exit 1
          ;;
      esac

      # Add extra explanation for revert action
      echo "Enter the name of the migration to which you want to revert."
      echo "This will revert all migrations that were run after the named migration."
      echo -n "Enter the name of the migration to revert: "
      read migration_name

      # Option to revert Sqitch migrations
      # Execute Sqitch command locally with the target as the Docker environment
      # Check if the command succeeds
      if sqitch --chdir $SQITCH_CONFIG_DIR revert --target $TARGET "$migration_name"; then
        echo "Revert operation on $TARGET environment completed successfully"
      else
        echo "Error performing revert operation on $TARGET environment"
        exit 1
      fi
      ;;
    5)
      # Option to remove Sqitch migration
      echo -n "Enter migration name to remove: "
      read migration_name

      # Manually remove migration from sqitch.plan
      if sed -i.bak "/^$migration_name /d" "$SQITCH_CONFIG_DIR/sqitch.plan"; then
        echo "Migration removed from sqitch.plan successfully"
      else
        echo "Error removing migration from sqitch.plan"
        exit 1
      fi

      # Remove migration scripts
      if rm -rf "$SQITCH_CONFIG_DIR/deploy/$migration_name.sql" "$SQITCH_CONFIG_DIR/revert/$migration_name.sql" "$SQITCH_CONFIG_DIR/verify/$migration_name.sql"; then
        echo "Migration scripts removed successfully"
      else
        echo "Error removing migration scripts"
        exit 1
      fi
      ;;
    6)
      # Option to exit the script
      echo "Exiting..."
      exit 0
      ;;
    *)
      # Handle invalid choices
      echo "Invalid choice. Choose 1, 2, 3, 4, 5, or 6."
      ;;
  esac
done
