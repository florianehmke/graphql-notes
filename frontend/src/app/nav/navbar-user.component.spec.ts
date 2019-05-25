import {
  createHostComponentFactory,
  SpectatorWithHost
} from '@netbasal/spectator/jest';
import { NavbarUserComponent } from './navbar-user.component';
import { userFactory } from '../../testing/mocks/user';

describe('NavbarUserComponent', () => {
  let host: SpectatorWithHost<NavbarUserComponent>;
  const createHost = createHostComponentFactory(NavbarUserComponent);

  it('should display "Not logged in!" if user is empty', () => {
    host = createHost(`<app-user></app-user>`);

    expect(host.query('span')).toHaveExactText('Not logged in!');
  });

  it('should display user name', () => {
    const user = userFactory.build();
    host = createHost(`<app-user></app-user>`, true, { user: user });

    expect(host.query('span')).toHaveExactText(
      `${user.firstName} ${user.lastName}`
    );
  });
});
