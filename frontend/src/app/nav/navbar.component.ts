import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification, User } from '../../generated/graphql';
import { NavbarStateService } from './state/navbar-state.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-dark justify-content-between bg-dark">
      <span class="navbar-brand">GraphQL Notes</span>
      <app-notification
        [notification]="notification$ | async"
      ></app-notification>
      <app-user 
        [user]="currentUser$ | async"
      ></app-user>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  currentUser$: Observable<User>;
  notification$: Observable<Notification>;

  constructor(private appState: NavbarStateService) {
    this.currentUser$ = appState.currentUser$;
    this.notification$ = appState.notification$;
  }
}
