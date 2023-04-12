-- Revert circles:003 from pg

BEGIN;

ALTER TABLE "customer" RENAME COLUMN "email_valid" TO "emailValid";

COMMIT;
