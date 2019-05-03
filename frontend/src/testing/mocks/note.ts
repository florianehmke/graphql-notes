import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { Note } from '../../generated/graphql';
import { authorFactory } from './author';

export const noteFactory = Factory.Sync.makeFactory<Note>({
  id: Factory.each(i => i),
  author: authorFactory.build(),
  noteTitle: faker.random.words(2),
  noteContent: faker.random.words(30)
});
