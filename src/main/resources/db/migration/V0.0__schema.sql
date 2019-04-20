CREATE SEQUENCE hibernate_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE author
(
    id         BIGINT       NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE entry
(
    id          BIGINT       NOT NULL,
    name        VARCHAR(255) NOT NULL,
    secret_note VARCHAR(255) NOT NULL,
    author_id   BIGINT       NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES author (id),
);
