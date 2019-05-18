import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { Note } from '../../generated/graphql';
import { userFactory } from './user';

export const noteFactory = Factory.Sync.makeFactory<Note>({
  id: Factory.each(i => i),
  createdBy: userFactory.build(),
  noteTitle: faker.random.words(2),
  noteContent: faker.random.words(30)
});
