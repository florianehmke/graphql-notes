import { Component } from '@angular/core';
import { NotesGraphqlFacade } from './graphql/notes.graphql.facade';
import { Observable } from 'rxjs';
import { Author } from './graphql/notes.models';

@Component({
  selector: 'app-header',
  template: `
    <div class="d-flex justify-content-between mt-3">
      <div>
        <h1 class="display-4">GraphQL Notes</h1>
      </div>
      <div>
        <ng-container *ngFor="let author of authors$ | async">
          <p class="text-right m-0">
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

  constructor(private notesGraphql: NotesGraphqlFacade) {
    this.authors$ = this.notesGraphql.authors$;
  }
}
