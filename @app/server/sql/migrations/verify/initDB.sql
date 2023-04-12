-- Verify circles:initDB on pg
BEGIN;

SELECT * FROM information_schema.columns WHERE table_name = 'customer';
SELECT * FROM information_schema.columns WHERE table_name = 'circle';
SELECT * FROM information_schema.columns WHERE table_name = 'event';
SELECT * FROM information_schema.columns WHERE table_name = 'message';
SELECT * FROM information_schema.columns WHERE table_name = 'circle_customer';

ROLLBACK;
