import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { Author } from '../../generated/graphql';

export const authorFactory = Factory.Sync.makeFactory<Author>({
  id: Factory.each(i => i),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  noteCount: faker.random.number()
});
