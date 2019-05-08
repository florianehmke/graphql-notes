import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotesStateService } from './state/notes-state.service';
import { Observable } from 'rxjs';
import { User } from '../../generated/graphql';

@Component({
  selector: 'app-header',
  template: `
    <h1 class="display-4">
      GraphQL Notes
    </h1>
    <small *ngIf="currentUser$ | async as user; else notLoggedIn"
      >User: {{ user.firstName }} {{ user.lastName }}</small
    >
    <ng-template #notLoggedIn>
        Not logged in!
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  currentUser$: Observable<User>;

  constructor(private notesState: NotesStateService) {
    this.currentUser$ = notesState.currentUser$;
  }
}
