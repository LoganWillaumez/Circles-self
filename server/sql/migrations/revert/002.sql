-- Revert circles:002 from pg

BEGIN;

ALTER TABLE customer RENAME COLUMN activated_at TO validated_at;


COMMIT;
