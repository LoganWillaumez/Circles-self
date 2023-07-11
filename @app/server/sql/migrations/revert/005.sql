-- Revert circles:005 from pg

BEGIN;

ALTER TABLE circle DROP COLUMN IF EXISTS identifier;

COMMIT;
