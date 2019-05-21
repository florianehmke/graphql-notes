import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { User } from '../../generated/graphql';

export const userFactory = Factory.Sync.makeFactory<User>({
  id: Factory.each(i => i),
  userId: faker.name.firstName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  noteCount: faker.random.number()
});
