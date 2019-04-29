import { Component } from '@angular/core';
import { NotesGraphqlFacade } from './graphql/notes.graphql.facade';
import { Observable } from 'rxjs';
import { Author } from './graphql/notes.models';
import { NotesService } from './notes.service';

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

  constructor(
    private notesGraphql: NotesGraphqlFacade,
    private notesService: NotesService
  ) {
    this.authors$ = this.notesGraphql.authors$;
    this.selectedAuthorId$ = this.notesService.seletedAuthorId$;
  }

  selectAuthorId(authorId: number) {
    this.notesService.setSelectedAuthorId(authorId);
  }
}
