import * as Factory from 'factory.ts';
import { Book, Note, NotesQuery, User } from '../../generated/graphql';
import { userFactory } from './user';
import * as faker from "faker";

export const bookFactory = Factory.Sync.makeFactory<Book>({
  id: Factory.each(i => i),
  bookTitle: faker.random.words(2),
  createdBy: userFactory.build()
});

export const noteFactory = Factory.Sync.makeFactory<Note>({
  id: Factory.each(i => i),
  createdBy: userFactory.build(),
  noteTitle: faker.random.words(2),
  noteContent: faker.random.words(30),
  book: bookFactory.build(),
  deletable: faker.random.boolean()
});

export const notesQueryFactory = Factory.Sync.makeFactory<NotesQuery>({
  users: userFactory.buildList(2),
  notes: noteFactory.buildList(2) as any,
  books: bookFactory.buildList(2),
});