import { Injectable, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  addNoteMutation,
  authorsQuery,
  authorsQueryKey,
  notesByAuthorQuery,
  notesByAuthorQueryKey
} from './notes.graphql';
import { Observable } from 'rxjs';
import { pluck, shareReplay } from 'rxjs/operators';
import { Author, Note } from './notes.models';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class NotesGraphqlFacade {
  authors$: Observable<Author[]>;
  notesByAuthor$: Observable<Note[]>;

  constructor(private apollo: Apollo) {
    this.authors$ = this.watchAuthorsQuery().pipe(
      pluck('data', authorsQueryKey)
    );

    this.notesByAuthor$ = this.watchNotesByAuthorQuery().pipe(
      pluck('data', notesByAuthorQueryKey)
    );
  }

  addNote(title: string, content: string, authorId = -10) {
    this.apollo
      .mutate({
        mutation: addNoteMutation,
        variables: { title, content, authorId },
        refetchQueries: [
          {
            query: notesByAuthorQuery
          },
          {
            query: authorsQuery
          }
        ]
      })
      .subscribe();
  }

  private watchAuthorsQuery() {
    return this.apollo
      .watchQuery<any>({
        query: authorsQuery
      })
      .valueChanges.pipe(shareReplay(1));
  }

  private watchNotesByAuthorQuery() {
    return this.apollo
      .watchQuery<any>({
        query: notesByAuthorQuery
      })
      .valueChanges.pipe(shareReplay(1));
  }
}
