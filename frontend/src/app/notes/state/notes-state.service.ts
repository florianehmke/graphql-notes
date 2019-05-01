import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Author, Note } from './notes.models';
import { notesQuery, notesQueryKey, NotesQueryResponse, NotesQueryVariables } from './queries/notes.query';
import { authorsQuery, authorsQueryKey, AuthorsQueryResponse } from './queries/authors.query';
import { addNoteMutation, AddNoteMutationResponse, AddNoteMutationVariables } from './mutations/add-note.mutation';
import { LocalStateService } from '@lib/local-state.service';
import { ApolloHelperService } from '@lib/apollo-helper.service';
import {
  deleteNoteMutation,
  DeleteNoteMutationResponse,
  DeleteNoteMutationVariables
} from './mutations/delete-note.mutation';

export interface NotesState {
  selectedAuthorId: number;
  currentAuthorId: number;
  noteSearchTerm: string;
}

const initialState: NotesState = {
  selectedAuthorId: null,
  currentAuthorId: -10, // FIXME replace with user
  noteSearchTerm: null
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
        refetchQueries: [notesQueryKey, authorsQueryKey]
      })
      .subscribe();
  }

  deleteNote(noteId: number) {
    this.apollo
      .mutate<DeleteNoteMutationResponse, DeleteNoteMutationVariables>({
        mutation: deleteNoteMutation,
        variables: { noteId },
        refetchQueries: [notesQueryKey, authorsQueryKey]
      })
      .subscribe();
  }

  setSelectedAuthorId(authorId: number): void {
    this.setState({
      ...this.state,
      selectedAuthorId: authorId
    });
    this.notesQueryRef.refetch(this.loadNotesQueryVariables());
  }

  setNoteSearchTerm(searchTerm: string): void {
    this.setState({
      ...this.state,
      noteSearchTerm: searchTerm
    });
    this.notesQueryRef.refetch(this.loadNotesQueryVariables());
  }

  private setupNotesQuery() {
    const query = this.apolloHelper.setupQuery<
      NotesQueryResponse,
      NotesQueryVariables
    >({
      query: notesQuery,
      variables: this.loadNotesQueryVariables()
    });

    this.notesQueryRef = query.queryRef;
    this.notes$ = query.data$.pipe(map(data => data.notes));
  }

  private loadNotesQueryVariables(): NotesQueryVariables {
    return {
      searchTerm: this.state.noteSearchTerm,
      authorId: this.state.selectedAuthorId
    };
  }

  private setupAuthorsQuery() {
    const query = this.apolloHelper.setupQuery<AuthorsQueryResponse>({
      query: authorsQuery
    });

    this.authorsQueryRef = query.queryRef;
    this.authors$ = query.data$.pipe(map(data => data.authors));
  }
}
