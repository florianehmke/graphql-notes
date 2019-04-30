import { Injectable } from '@angular/core';
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
import { NotesService } from '../notes.service';

@Injectable()
export class NotesGraphqlFacade {
  authors$: Observable<Author[]>;
  notesByAuthor$: Observable<Note[]>;

  constructor(private apollo: Apollo, private notesService: NotesService) {
    this.authors$ = this.watchAuthorsQuery().pipe(
      pluck('data', authorsQueryKey)
    );

    this.notesByAuthor$ = this.watchNotesByAuthorQuery().pipe(
      pluck('data', notesByAuthorQueryKey)
    );
  }

  addNote(title: string, content: string) {
    this.apollo
      .mutate({
        mutation: addNoteMutation,
        variables: {
          title,
          content,
          authorId: this.notesService.state.currentAuthorId
        },
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
        query: notesByAuthorQuery,
        variables: {
          authorId: this.notesService.state.selectedAuthorId
        }
      })
      .valueChanges.pipe(shareReplay(1));
  }
}
