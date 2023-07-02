-- Verify circles:004 on pg

BEGIN;

DO $$ 
BEGIN 
    INSERT INTO event ("end") VALUES (NULL);
    DELETE FROM event WHERE "end" IS NULL;
EXCEPTION WHEN NOT_NULL_VIOLATION THEN
    RAISE EXCEPTION 'Column "end" is still NOT NULL';
END $$;

ROLLBACK;
