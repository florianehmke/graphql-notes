INSERT INTO author(id, first_name, last_name)
VALUES (-10, 'Entry 1', 'Much Secret');

INSERT INTO entry(id, name, secret_note, author_id)
VALUES (-1, 'Max', 'Payne', -10);
