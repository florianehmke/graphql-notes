INSERT INTO author(id, first_name, last_name)
VALUES (-10, 'Florian', 'Ehmke'),
       (-11, 'Jenny', 'Ehmke');

INSERT INTO entry(id, name, description, author_id)
VALUES (nextval('hibernate_sequence'), 'Entry 1', 'Long Description', -10),
       (nextval('hibernate_sequence'), 'Entry 2', 'Long Description', -10),
       (nextval('hibernate_sequence'), 'Entry 3', 'Long Description', -11);
