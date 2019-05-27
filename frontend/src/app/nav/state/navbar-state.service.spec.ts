import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';
import {
  CurrentUserDocument,
  NotificationsDocument
} from '../../../generated/graphql';
import { notificationFactory } from '../../../testing/mocks/notification';
import { NavbarStateService } from './navbar-state.service';
import { currentUserQueryFactory } from '../../../testing/mocks/user';

describe('NavbarStateService', () => {
  let service: NavbarStateService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [NavbarStateService]
    });
    service = TestBed.get(NavbarStateService);
    controller = TestBed.get(ApolloTestingController);
    jest.useFakeTimers();
  });

  describe('GQL Queries', () => {
    it('currentUser$ should contain data', done => {
      const query = currentUserQueryFactory.build();
      service.currentUser$.subscribe(user => {
        expect(user).toBeTruthy();
        expect(user.firstName).toEqual(query.currentUser.firstName);
        expect(user.lastName).toEqual(query.currentUser.lastName);
        done();
      });
      controller.expectOne(CurrentUserDocument).flush({ data: query });
      jest.runAllTimers();
    });
  });

  describe('GQL Subscriptions', () => {
    it('notification$ should contain data', done => {
      const testNotification = notificationFactory.build();
      service.notification$.subscribe(notification => {
        expect(notification).toBeTruthy();
        expect(notification.title).toEqual(testNotification.title);
        expect(notification.content).toEqual(testNotification.content);
        done();
      });
      controller.expectOne(NotificationsDocument).flush({
        data: { notifications: testNotification }
      });
      jest.runAllTimers();
    });
  });

  afterEach(() => {
    controller.verify();
  });
});
