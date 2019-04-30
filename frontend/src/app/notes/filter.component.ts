import { Component } from '@angular/core';
import { NotesStateService } from './state/notes-state.service';
import { Observable } from 'rxjs';
import { Author } from './state/notes.models';

@Component({
  selector: 'app-filter',
  template: `
    <h4 class="border-dark border-bottom">Filter Notes</h4>
    <div class="d-flex justify-content-between">
      <div>
        Filter by Content
      </div>
      <div class="mb-3">
        <ng-container *ngFor="let author of authors$ | async">
          <small
            class="text-right m-0 d-block"
            style="cursor: pointer"
            [class.font-weight-bold]="(selectedAuthorId$ | async) === author.id"
            (click)="selectAuthorId(author.id)"
          >
            {{ author.firstName }} {{ author.lastName }} -
            {{ author.noteCount }} Notes
          </small>
        </ng-container>
      </div>
    </div>
  `
})
export class FilterComponent {
  authors$: Observable<Author[]>;
  selectedAuthorId$: Observable<number>;

  constructor(private notesState: NotesStateService) {
    this.authors$ = this.notesState.authors$;
    this.selectedAuthorId$ = this.notesState.selectedAuthorId$;
  }

  selectAuthorId(authorId: number) {
    const currentId = this.notesState.state.selectedAuthorId;
    const selectedAuthorId = currentId !== authorId ? authorId : null;

    this.notesState.setSelectedAuthorId(selectedAuthorId);
  }
}
