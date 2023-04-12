-- Deploy circles:002 to pg

BEGIN;

ALTER TABLE customer RENAME COLUMN validated_at TO activated_at;

COMMIT;
