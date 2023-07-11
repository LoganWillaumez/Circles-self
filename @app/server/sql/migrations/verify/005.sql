BEGIN;

DO $$BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM   information_schema.columns 
        WHERE  table_name   = 'circle'
        AND    column_name  = 'identifier'
    )
    THEN
        RAISE EXCEPTION 'column identifier does not exist in table circles.';
    END IF;
END$$;

COMMIT;
