import { NotesGraphqlFacade } from './graphql/notes.graphql.facade';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './graphql/notes.models';

@Component({
  selector: 'app-list',
  template: `
    <div *ngFor="let note of notes$ | async" class="mb-3">
      <div class="d-flex justify-content-between border-bottom">
        <p class="m-0 font-weight-bold">
          {{ note.noteTitle }}
        </p>
        <p class="m-0 text-muted">
          {{ note.author.firstName }} {{ note.author.lastName }}
        </p>
      </div>
      <div>
        <p class="font-weight-light mb-0">{{ note.noteContent }}</p>
      </div>
    </div>
  `
})
export class ListComponent {
  notes$: Observable<Note[]>;

  constructor(private notesGraphql: NotesGraphqlFacade) {
    this.notes$ = notesGraphql.notesByAuthor$;
  }
}
