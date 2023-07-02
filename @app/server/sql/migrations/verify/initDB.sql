BEGIN;

-- Verify Extension
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_extension
        WHERE extname = 'uuid-ossp'
    ) THEN
        RAISE EXCEPTION 'Extension uuid-ossp does not exist';
    END IF;
END $$;

-- Verify Functions
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'update_updated_at_column'
    ) THEN
        RAISE EXCEPTION 'Function update_updated_at_column does not exist';
    END IF;
END $$;

-- Verify Tables
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE tablename IN ('customer', 'circle', 'event', 'message', 'circle_customer')
    ) THEN
        RAISE EXCEPTION 'One or more tables do not exist';
    END IF;
END $$;

-- Verify Triggers
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger t
        JOIN pg_class c ON c.oid = t.tgrelid
        WHERE t.tgname = 'tg_customer_updated_at'
          AND c.relname IN ('customer', 'circle', 'event')
    ) THEN
        RAISE EXCEPTION 'Trigger tg_customer_updated_at does not exist on one or more of the tables customer, circle, event';
    END IF;
END $$;

COMMIT;
