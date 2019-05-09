import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotesStateService } from './state/notes-state.service';
import { Observable } from 'rxjs';
import { Notification, User } from '../../generated/graphql';

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
export class HeaderComponent {
  currentUser$: Observable<User>;
  notifications$: Observable<Notification>;

  constructor(private notesState: NotesStateService) {
    this.currentUser$ = notesState.currentUser$;
    this.notifications$ = notesState.notifications$;
  }
}
