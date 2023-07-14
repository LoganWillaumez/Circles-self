-- Deploy circles:006 to pg

BEGIN;

ALTER TABLE customer ADD COLUMN random TEXT;
ALTER TABLE customer ADD COLUMN reset_validity TIMESTAMP;

COMMIT;
