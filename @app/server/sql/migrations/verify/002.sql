-- Verify circles:002 on pg

BEGIN;

DO $$ BEGIN
  -- Check that the column "activated_at" exists
  ASSERT (
    SELECT 
      COUNT(*) 
    FROM 
      INFORMATION_SCHEMA.COLUMNS 
    WHERE 
      TABLE_NAME = 'customer' AND 
      COLUMN_NAME = 'activated_at'
  ) = 1, 'Column "activated_at" does not exist';

  -- Check that the column "validated_at" does not exist
  ASSERT (
    SELECT 
      COUNT(*) 
    FROM 
      INFORMATION_SCHEMA.COLUMNS 
    WHERE 
      TABLE_NAME = 'customer' AND 
      COLUMN_NAME = 'validated_at'
  ) = 0, 'Column "validated_at" still exists';

END $$;

ROLLBACK;
