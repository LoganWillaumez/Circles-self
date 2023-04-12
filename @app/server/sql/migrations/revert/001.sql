-- Revert circles:001 from pg

BEGIN;

ALTER TABLE customer
DROP COLUMN validated_at;


COMMIT;
