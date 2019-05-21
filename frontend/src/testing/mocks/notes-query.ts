import * as Factory from 'factory.ts';
import { NotesQuery } from '../../generated/graphql';
import { userFactory } from './user';
import { bookFactory } from './book';
import { noteFactory } from './note';

export const notesQueryFactory = Factory.Sync.makeFactory<NotesQuery>({
  users: userFactory.buildList(2),
  notes: noteFactory.buildList(2) as any,
  books: bookFactory.buildList(2),
  currentUser: userFactory.build()
});