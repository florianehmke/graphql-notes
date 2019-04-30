import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
import { LocalStateService } from '@lib/local-state.service';
import { ApolloHelperService } from '@lib/apollo-helper.service';

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
  selectedAuthorId$ = this.state$.pipe(map(s => s.selectedAuthorId));

  private authorsQueryRef: QueryRef<AuthorsQueryResponse>;
  private notesQueryRef: QueryRef<NotesQueryResponse, NotesQueryVariables>;

  constructor(
    private apolloHelper: ApolloHelperService,
    private apollo: Apollo
  ) {
    super(initialState);

    this.setupNotesQuery();
    this.setupAuthorsQuery();
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
    this.setState({
      ...this.state,
      selectedAuthorId: authorId
    });
    this.notesQueryRef.refetch({ authorId });
  }

  private setupNotesQuery() {
    const variables = {
      authorId: this.state.selectedAuthorId
    };

    const query = this.apolloHelper.setupQuery<
      NotesQueryResponse,
      NotesQueryVariables
    >({ query: notesByAuthorIdQuery, variables });

    this.notesQueryRef = query.queryRef;
    this.notes$ = query.data$.pipe(map(data => data.notesByAuthorId));
  }

  private setupAuthorsQuery() {
    const query = this.apolloHelper.setupQuery<AuthorsQueryResponse>({
      query: authorsQuery
    });

    this.authorsQueryRef = query.queryRef;
    this.authors$ = query.data$.pipe(map(data => data.authors));
  }
}
