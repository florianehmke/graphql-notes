import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { Notification } from '../../generated/graphql';

export const notificationFactory = Factory.Sync.makeFactory<Notification>({
  title: faker.random.words(3),
  content: faker.random.words(15)
});