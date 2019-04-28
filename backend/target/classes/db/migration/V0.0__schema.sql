CREATE SEQUENCE hibernate_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE author
(
    id         BIGINT       NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE note
(
    id           BIGINT       NOT NULL,
    note_title   VARCHAR(255) NOT NULL,
    note_content TEXT         NOT NULL,
    author_id    BIGINT       NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES author (id),
);
