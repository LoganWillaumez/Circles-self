-- Verify circles:007 on pg
BEGIN;
  
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE  table_name   = 'customer' 
    AND column_name   = 'reset_validity'
  ) THEN 
    RAISE 'missing column reset_validity in table customer'; 
  END IF;
END $$; 

COMMIT;
