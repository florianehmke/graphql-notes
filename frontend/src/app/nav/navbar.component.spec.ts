import {
  createHostComponentFactory,
  mockProvider
} from '@netbasal/spectator/jest';
import { MockComponent } from 'ng-mocks';

import { NavbarComponent } from './navbar.component';
import { NavbarUserComponent } from './navbar-user.component';
import { NavbarNotificationComponent } from './navbar-notification.component';
import { NavbarStateService } from './state/navbar-state.service';
import { userFactory } from '../../testing/mocks/user';
import { Subject } from 'rxjs';
import { Notification, User } from '../../generated/graphql';
import { forSubject } from '../../testing';
import { notificationFactory } from '../../testing/mocks/notification';

describe('NavbarComponent', () => {
  const currentUser$ = new Subject<User>();
  const notification$ = new Subject<Notification>();

  const createHost = createHostComponentFactory({
    component: NavbarComponent,
    providers: [
      mockProvider(NavbarStateService, {
        currentUser$: currentUser$,
        notification$: notification$
      })
    ],
    declarations: [
      MockComponent(NavbarUserComponent),
      MockComponent(NavbarNotificationComponent)
    ]
  });

  it('should create', () => {
    const host = createHost(`<app-navbar></app-navbar>`);

    expect(host.component).toBeTruthy();
  });

  it('should pass user to NavbarUserComponent', () => {
    const host = createHost(`<app-navbar></app-navbar>`);
    const user = forSubject(userFactory.build(), currentUser$);
    const component = host.query<NavbarUserComponent>(NavbarUserComponent);

    host.detectChanges();

    expect(component).toBeTruthy();
    expect(component.user).toEqual(user);
  });

  it('should pass notification to NavbarNotificationComponent', () => {
    const host = createHost(`<app-navbar></app-navbar>`);
    const notification = forSubject(notificationFactory.build(), notification$);
    const component = host.query<NavbarNotificationComponent>(NavbarNotificationComponent);

    host.detectChanges();

    expect(component).toBeTruthy();
    expect(component.notification).toEqual(notification);
  });
});
