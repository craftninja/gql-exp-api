CREATE TABLE IF NOT EXISTS "customers"(
  "id"                               SERIAL            PRIMARY KEY NOT NULL,
  "name"                             VARCHAR(100)      NOT NULL,
  "email"                            VARCHAR(200)      NOT NULL,
  "age"                              INT,
  "createdAt"                        TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"                        TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP
);
