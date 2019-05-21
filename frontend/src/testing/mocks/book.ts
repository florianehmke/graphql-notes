import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { Book } from '../../generated/graphql';
import { userFactory } from './user';

export const bookFactory = Factory.Sync.makeFactory<Book>({
  id: Factory.each(i => i),
  bookTitle: faker.random.words(2),
  createdBy: userFactory.build()
});
