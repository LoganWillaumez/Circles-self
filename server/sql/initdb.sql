BEGIN;

DROP TABLE IF EXISTS "customer", "circle", "event", "message", "circle_customer";

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE "customer" (
                        "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
                        "firstname" VARCHAR(50) NOT NULL,
                        "lastname" VARCHAR(50) NOT NULL,
                        "gender" VARCHAR(10) NOT NULL,
                        "email" VARCHAR(50) NOT NULL UNIQUE,
                        "password" VARCHAR(250) NOT NULL,
                        "birthdate" DATE NOT NULL,
                        "firstconnect" BOOLEAN NOT NULL DEFAULT FALSE,
                        "firstcircle" BOOLEAN NOT NULL DEFAULT FALSE,
                        "img" TEXT NOT NULL,
                        "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                        "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


CREATE TRIGGER tg_customer_updated_at
    BEFORE UPDATE
    ON customer
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();


CREATE TABLE "circle" (
                           "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
                           "name" VARCHAR(50) NOT NULL,
                           customer_admin int NOT NULL,
                           FOREIGN KEY (customer_admin) REFERENCES Customer(id) ON UPDATE CASCADE ON DELETE CASCADE,
                           "description" TEXT,
                           "img" TEXT,
                           "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                           "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER tg_customer_updated_at
    BEFORE UPDATE
    ON circle
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TABLE "event" (
                                "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                "title" VARCHAR(50) NOT NULL,
                                "description" TEXT,
                                "start" TIMESTAMPTZ NOT NULL,
                                "end" TIMESTAMPTZ NOT NULL,
                                "allday" BOOLEAN NOT NULL DEFAULT FALSE,
                                id_circle INT NOT NULL,
                                id_customer INT NOT NULL,
                                CONSTRAINT fk_constrain_event_circle FOREIGN KEY(id_circle) REFERENCES Circle(id) ON DELETE CASCADE,
                                CONSTRAINT fk_constrain_event_customer  FOREIGN KEY(id_customer) REFERENCES Customer(id) ON DELETE CASCADE,
                                "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                                "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER tg_customer_updated_at
    BEFORE UPDATE
    ON event
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TABLE "message" (
                         "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                         "content" TEXT,
                         id_circle INT NOT NULL,
                         id_customer INT NOT NULL,
                         CONSTRAINT fk_constrain_message_circle FOREIGN KEY(id_circle) REFERENCES Circle(id),
                         FOREIGN KEY(id_customer) REFERENCES Customer(id),
                         "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE "circle_customer" (
                                id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                id_customer INT NOT NULL,
                                id_circle INT NOT NULL,
                                FOREIGN KEY (id_customer) REFERENCES Customer(id) ON UPDATE CASCADE ON DELETE CASCADE,
                                FOREIGN KEY (id_circle) REFERENCES Circle(id) ON UPDATE CASCADE ON DELETE CASCADE
);

COMMIT;

-- INSERT INTO circle(name,description, img)
-- VALUES ('prout','descri','img');
-- INSERT INTO circle_customer(id_customer,id_circle)
-- VALUES (4,currval(pg_get_serial_sequence('circle','id')));
