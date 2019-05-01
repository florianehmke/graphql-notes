import { NotesStateService } from './state/notes-state.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './state/notes.models';

@Component({
  selector: 'app-list',
  template: `
    <h3 class="border-dark border-bottom">Notes</h3>
    <app-note-component
      class="mb-2"
      *ngFor="let note of notes$ | async"
      [note]="note"
    >
    </app-note-component>
  `,
})
export class ListComponent {
  notes$: Observable<Note[]>;

  constructor(private notesState: NotesStateService) {
    this.notes$ = notesState.notes$;
  }
}
