import { createHostComponentFactory } from '@netbasal/spectator/jest';

import { NavbarUserComponent } from './navbar-user.component';
import { userFactory } from '../../testing/mocks/user';

describe('NavbarUserComponent', () => {
  const createHost = createHostComponentFactory(NavbarUserComponent);

  it('should display "Not logged in!" if user is empty', () => {
    const host = createHost(`<app-user></app-user>`);

    expect(host.query('span')).toHaveExactText('Not logged in!');
  });

  it('should display user name', () => {
    const user = userFactory.build();
    const host = createHost(`<app-user></app-user>`, true, { user: user });

    const span = host.query('span');

    expect(span).toHaveText(user.firstName);
    expect(span).toHaveText(user.lastName);
  });
});
