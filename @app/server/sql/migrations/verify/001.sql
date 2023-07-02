-- Verify circles:001 on pg

BEGIN;

DO $$ BEGIN
  -- Check that the column "validated_at" or "activated_at" exists in the "customer" table
  ASSERT (
    SELECT 
      COUNT(*) 
    FROM 
      INFORMATION_SCHEMA.COLUMNS 
    WHERE 
      TABLE_NAME = 'customer' AND 
      (COLUMN_NAME = 'validated_at' OR COLUMN_NAME = 'activated_at')
  ) = 1, 'Column "validated_at" or "activated_at" does not exist in the "customer" table';
END $$;

ROLLBACK;
