INSERT INTO author(id, first_name, last_name)
VALUES (-10, 'Florian', 'Ehmke'),
       (-11, 'Jenny', 'Ehmke');

INSERT INTO note(id, note_title, note_content, author_id)
VALUES (nextval('hibernate_sequence'), 'Note 1', 'Long Description', -10),
       (nextval('hibernate_sequence'), 'Note 2', 'Long Description', -10),
       (nextval('hibernate_sequence'), 'Note 3', 'Long Description', -11);
