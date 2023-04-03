-- Deploy circles:003 to pg

BEGIN;

ALTER TABLE customer RENAME COLUMN "emailValid" TO email_valid;

COMMIT;
