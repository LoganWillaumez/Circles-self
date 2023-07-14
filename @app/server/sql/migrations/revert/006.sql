-- Revert circles:006 on pg
BEGIN;

ALTER TABLE customer DROP COLUMN random;
ALTER TABLE customer DROP COLUMN reset_validity;

COMMIT;
