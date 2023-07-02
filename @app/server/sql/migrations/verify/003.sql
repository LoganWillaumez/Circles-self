-- Verify circles:003 on pg

BEGIN;

DO $$ BEGIN
  -- Check that the column "email_valid" exists
  ASSERT (
    SELECT 
      COUNT(*) 
    FROM 
      INFORMATION_SCHEMA.COLUMNS 
    WHERE 
      TABLE_NAME = 'customer' AND 
      COLUMN_NAME = 'email_valid'
  ) = 1, 'Column "email_valid" does not exist';

  -- Check that the column "emailValid" does not exist
  ASSERT (
    SELECT 
      COUNT(*) 
    FROM 
      INFORMATION_SCHEMA.COLUMNS 
    WHERE 
      TABLE_NAME = 'customer' AND 
      COLUMN_NAME = 'emailValid'
  ) = 0, 'Column "emailValid" still exists';

END $$;


ROLLBACK;
