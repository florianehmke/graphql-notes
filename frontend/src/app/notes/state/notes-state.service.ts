import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { map, tap } from 'rxjs/operators';
import { LocalStateService } from '@lib/local-state.service';

import { extractClientErrors } from '@lib/extract-error-extensions';
import {
  AddNoteGQL,
  AuthorsGQL,
  AuthorsQuery,
  AuthorsQueryVariables,
  DeleteNoteGQL,
  NotesGQL,
  NotesQuery,
  NotesQueryVariables
} from '@graphql';

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
  authors$; // FIXME typing?
  notes$;
  selectedAuthorId$ = this.state$.pipe(map(s => s.selectedAuthorId));

  private authorsQueryRef: QueryRef<AuthorsQuery, AuthorsQueryVariables>;
  private notesQueryRef: QueryRef<NotesQuery, NotesQueryVariables>;

  constructor(
    private addNoteGQL: AddNoteGQL,
    private deleteNoteGQL: DeleteNoteGQL,
    private notesGQL: NotesGQL,
    private authorsGQL: AuthorsGQL
  ) {
    super(initialState);

    this.notesQueryRef = notesGQL.watch(this.loadNotesQueryVariables());
    this.notes$ = this.notesQueryRef.valueChanges.pipe(
      map(vc => vc.data.notes)
    );

    this.authorsQueryRef = authorsGQL.watch();
    this.authors$ = this.authorsQueryRef.valueChanges.pipe(
      map(vc => vc.data.authors)
    );
  }

  addNote(title: string, content: string) {
    const authorId = this.state.currentAuthorId;
    this.addNoteGQL
      .mutate({ title, content, authorId })
      .pipe(tap(response => this.handleClientErrors(response)))
      .subscribe(() => {
        this.notesQueryRef.refetch();
        this.authorsQueryRef.refetch();
      });
  }

  deleteNote(noteId: number) {
    this.deleteNoteGQL
      .mutate({ noteId })
      .pipe(tap(response => this.handleClientErrors(response)))
      .subscribe(() => {
        this.notesQueryRef.refetch();
        this.authorsQueryRef.refetch();
      });
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

  private loadNotesQueryVariables(): NotesQueryVariables {
    return {
      authorId: this.state.selectedAuthorId,
      searchTerm: this.state.noteSearchTerm
    };
  }

  private handleClientErrors(response) {
    const errors = extractClientErrors(response);
    if (errors) {
      errors.forEach(err => console.log(err));
    }
  }
}
