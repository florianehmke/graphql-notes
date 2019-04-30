import { NotesStateService } from './state/notes-state.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './state/notes.models';

@Component({
  selector: 'app-list',
  template: `
    <h4 class="border-dark border-bottom">Notes</h4>
    <div *ngFor="let note of notes$ | async" class="mb-3">
      <div class="d-flex justify-content-between border-bottom">
        <h6 class="m-0 font-weight-bold">
          {{ note.noteTitle }}
        </h6>
        <h6 class="m-0 text-muted">
          {{ note.author.firstName }} {{ note.author.lastName }}
        </h6>
      </div>
      <div>
        <small>{{ note.noteContent }}</small>
      </div>
    </div>
  `
})
export class ListComponent {
  notes$: Observable<Note[]>;

  constructor(private notesState: NotesStateService) {
    this.notes$ = notesState.notes$;
  }
}
