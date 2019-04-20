CREATE SEQUENCE hibernate_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE entry
(
    id          BIGINT       NOT NULL,
    name        VARCHAR(255) NOT NULL,
    secret_note VARCHAR(255) NOT NULL,
)