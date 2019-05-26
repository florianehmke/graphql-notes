import { createHostComponentFactory } from '@netbasal/spectator/jest';
import { NavbarNotificationComponent } from './navbar-notification.component';
import { notificationFactory } from '../../testing/mocks/notification';

describe('NavbarNotificationComponent', () => {
  const createHost = createHostComponentFactory(NavbarNotificationComponent);

  it('should not display anything if no notification is present', () => {
    const host = createHost(`<app-notification></app-notification>`);

    expect(host.query('span')).toBeFalsy();
  });

  it('should display the notification', () => {
    const notification = notificationFactory.build();
    const host = createHost(`<app-notification></app-notification>`, true, {
      notification: notification
    });

    const span = host.query('span');

    expect(span).toHaveText(notification.title);
    expect(span).toHaveText(notification.content);
  });
});
