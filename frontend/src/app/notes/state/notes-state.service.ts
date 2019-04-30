import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Author, Note } from './notes.models';
import {
  notesByAuthorIdQuery,
  notesByAuthorIdQueryKey,
  NotesQueryResponse,
  NotesQueryVariables
} from './queries/notes.query';
import {
  authorsQuery,
  authorsQueryKey,
  AuthorsQueryResponse
} from './queries/authors.query';
import {
  addNoteMutation,
  AddNoteMutationResponse,
  AddNoteMutationVariables
} from './mutations/notes.mutation';
import { LocalStateService } from '@lib/localStateService';

export interface NotesState {
  selectedAuthorId: number;
  currentAuthorId: number;
}

const initialState: NotesState = {
  selectedAuthorId: -10,
  currentAuthorId: -10
};

@Injectable()
export class NotesStateService extends LocalStateService<NotesState> {
  authors$: Observable<Author[]>;
  notes$: Observable<Note[]>;
  selectedAuthorId$ = this.state$.pipe(map(state => state.selectedAuthorId));

  private authorsQuery: QueryRef<AuthorsQueryResponse>;
  private notesQuery: QueryRef<NotesQueryResponse, NotesQueryVariables>;

  constructor(private apollo: Apollo) {
    super(initialState);

    this.authorsQuery = this.getAuthorsQuery();
    this.authors$ = this.getAuthors();
    this.notesQuery = this.getNotesQuery();
    this.notes$ = this.getNotes();
  }

  private getNotes() {
    return this.notesQuery.valueChanges.pipe(
      map(result => result.data.notesByAuthorId)
    );
  }

  private getNotesQuery() {
    return this.apollo.watchQuery<NotesQueryResponse, NotesQueryVariables>({
      query: notesByAuthorIdQuery,
      variables: {
        authorId: this.state.selectedAuthorId
      }
    });
  }

  private getAuthors() {
    return this.authorsQuery.valueChanges.pipe(
      map(result => result.data.authors)
    );
  }

  private getAuthorsQuery() {
    return this.apollo.watchQuery<AuthorsQueryResponse>({
      query: authorsQuery
    });
  }

  addNote(title: string, content: string) {
    const authorId = this.state.currentAuthorId;
    this.apollo
      .mutate<AddNoteMutationResponse, AddNoteMutationVariables>({
        mutation: addNoteMutation,
        variables: { title, content, authorId },
        refetchQueries: [notesByAuthorIdQueryKey, authorsQueryKey]
      })
      .subscribe();
  }

  setSelectedAuthorId(authorId: number): void {
    this.notesQuery.refetch({ authorId });
    this.setState({
      ...this.state,
      selectedAuthorId: authorId
    });
  }
}
