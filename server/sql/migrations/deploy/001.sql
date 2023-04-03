-- Deploy circles:001 to pg

BEGIN;

ALTER TABLE customer
ADD COLUMN validated_at TIMESTAMPTZ DEFAULT NULL;


COMMIT;
