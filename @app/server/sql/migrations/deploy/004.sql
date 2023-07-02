-- Deploy circles:004 to pg

BEGIN;

ALTER TABLE event ALTER COLUMN "end" DROP NOT NULL;

COMMIT;
