import { Component } from '@angular/core';
import { NotesStateService } from './state/notes-state.service';
import { Observable } from 'rxjs';
import { Author } from './state/notes.models';

@Component({
  selector: 'app-header',
  template: `
    <div class="d-flex justify-content-between mt-3">
      <div>
        <h1 class="display-4">GraphQL Notes</h1>
      </div>
      <div>
        <ng-container *ngFor="let author of authors$ | async">
          <p
            class="text-right m-0"
            style="cursor: pointer"
            [class.font-weight-bold]="(selectedAuthorId$ | async) === author.id"
            (click)="selectAuthorId(author.id)"
          >
            {{ author.firstName }} {{ author.lastName }} -
            {{ author.noteCount }} Notes
          </p>
        </ng-container>
      </div>
    </div>
  `
})
export class HeaderComponent {
  authors$: Observable<Author[]>;
  selectedAuthorId$: Observable<number>;

  constructor(private notesState: NotesStateService) {
    this.authors$ = this.notesState.authors$;
    this.selectedAuthorId$ = this.notesState.selectedAuthorId$;
  }

  selectAuthorId(authorId: number) {
    this.notesState.setSelectedAuthorId(authorId);
  }
}
