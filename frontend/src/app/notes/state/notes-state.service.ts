import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, skip, tap } from 'rxjs/operators';

import { LocalStateService } from '../../../lib/local-state.service';
import { handleErrors } from '../../../lib/errors';
import {
  AddNoteGQL,
  Book,
  DeleteNoteGQL,
  Note,
  NotesGQL,
  NotesQuery,
  NotesQueryVariables,
  User
} from '../../../generated/graphql';

export interface NotesState {
  selectedUserId: number;
  selectedBookId: number;
  noteSearchTerm: string;
}

const initialState: NotesState = {
  selectedUserId: null,
  selectedBookId: null,
  noteSearchTerm: null
};

@Injectable()
export class NotesStateService extends LocalStateService<NotesState> {
  selectedUserId$ = this.state$.pipe(map(s => s.selectedUserId));
  selectedBookId$ = this.state$.pipe(map(s => s.selectedBookId));
  noteSearchTerm$ = this.state$.pipe(map(s => s.noteSearchTerm));

  users$: Observable<User[]>;
  notes$: Observable<Note[]>;
  books$: Observable<Book[]>;

  private notesQueryRef: QueryRef<NotesQuery, NotesQueryVariables>;

  constructor(
    private addNoteGQL: AddNoteGQL,
    private deleteNoteGQL: DeleteNoteGQL,
    private notesGQL: NotesGQL
  ) {
    super(initialState);

    this.notesQueryRef = this.notesGQL.watch();
    const query$ = this.notesQueryRef.valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data)
    );

    this.notes$ = query$.pipe(map(value => value.notes));
    this.users$ = query$.pipe(map(value => value.users));
    this.books$ = query$.pipe(map(value => value.books));
  }

  deleteNote(noteId: number): Observable<any> {
    return this.deleteNoteGQL.mutate({ param: { noteId } }).pipe(
      filter(response => handleErrors(response)),
      tap(() => this.notesQueryRef.refetch())
    );
  }

  addNote(bookTitle, noteTitle: string, content: string): Observable<any> {
    return this.addNoteGQL
      .mutate({ param: { bookTitle, noteTitle, content } })
      .pipe(
        filter(response => handleErrors(response)),
        tap(() => this.notesQueryRef.refetch())
      );
  }

  setSelectedUserId(userId: number): void {
    this.setState({ selectedUserId: userId });
  }

  setSelectedBookId(bookId: number): void {
    this.setState({ selectedBookId: bookId });
  }

  setNoteSearchTerm(searchTerm: string): void {
    this.setState({ noteSearchTerm: searchTerm });
  }

  refetchNotesOnVariableChanges(): Observable<any> {
    return combineLatest(
      this.selectedBookId$,
      this.selectedUserId$,
      this.noteSearchTerm$
    ).pipe(
      skip(1),
      tap(([bookId, userId, searchTerm]) =>
        this.notesQueryRef.refetch({ param: { bookId, userId, searchTerm } })
      )
    );
  }
}
