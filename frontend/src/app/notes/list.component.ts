import { NotesStateService } from './state/notes-state.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './state/notes.models';

@Component({
  selector: 'app-list',
  template: `
    <h3 class="border-dark border-bottom">Notes</h3>
    <div *ngFor="let note of notes$ | async" class="mb-3">
      <div class="d-flex justify-content-between border-bottom">
        <span class="m-0 font-weight-bold">
          {{ note.noteTitle }}
        </span>
        <span class="m-0 text-muted">
          {{ note.author.firstName }} {{ note.author.lastName }}
        </span>
      </div>
      <div>
        <span class="font-weight-light">{{ note.noteContent }}</span>
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
