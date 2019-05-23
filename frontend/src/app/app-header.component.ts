import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification, User } from '../generated/graphql';
import { AppStateService } from './state/app-state.service';

@Component({
  selector: 'app-header',
  template: `
    <h1 class="display-4">
      GraphQL Notes
    </h1>
    <div class="d-flex justify-content-between">
      <small *ngIf="currentUser$ | async as user; else notLoggedIn"
        >User: {{ user.firstName }} {{ user.lastName }}</small
      >
      <ng-template #notLoggedIn>
        Not logged in!
      </ng-template>
      <small *ngIf="notifications$ | async as notification">
        {{ notification.title }} - {{ notification.content }}
      </small>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent {
  currentUser$: Observable<User>;
  notifications$: Observable<Notification>;

  constructor(private appState: AppStateService) {
    this.currentUser$ = appState.currentUser$;
    this.notifications$ = appState.notifications$;
  }
}
