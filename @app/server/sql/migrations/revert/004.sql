-- Revert circles:004 from pg

BEGIN;

ALTER TABLE event ALTER COLUMN "end" SET NOT NULL;

COMMIT;


