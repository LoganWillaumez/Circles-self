-- Deploy circles:005 to pg

BEGIN;

ALTER TABLE circle ADD COLUMN IF NOT EXISTS identifier character varying(36) DEFAULT uuid_generate_v4() NOT NULL;

COMMIT;
