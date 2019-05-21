import { Injectable, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, skip, tap } from 'rxjs/operators';

import { LocalStateService } from '../../../lib/local-state.service';
import { handleErrors } from '../../../lib/errors';
import {
  AddNoteGQL,
  Book,
  BooksGQL,
  BooksQuery,
  BooksQueryVariables,
  CurrentUserGQL,
  CurrentUserQuery,
  CurrentUserQueryVariables,
  DeleteNoteGQL,
  Note,
  NotesGQL,
  NotesQuery,
  NotesQueryVariables,
  Notification,
  NotificationsGQL,
  User,
  UsersGQL,
  UsersQuery,
  UsersQueryVariables
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
  login$: Observable<User>;
  notifications$: Observable<Notification>;

  private usersQueryRef: QueryRef<UsersQuery, UsersQueryVariables>;
  private notesQueryRef: QueryRef<NotesQuery, NotesQueryVariables>;
  private booksQueryRef: QueryRef<BooksQuery, BooksQueryVariables>;
  private loginQueryRef: QueryRef<CurrentUserQuery, CurrentUserQueryVariables>;

  constructor(
    // Mutations
    private addNoteGQL: AddNoteGQL,
    private deleteNoteGQL: DeleteNoteGQL,
    // Queries
    private notesGQL: NotesGQL,
    private usersGQL: UsersGQL,
    private booksGQL: BooksGQL,
    private currentUserGQL: CurrentUserGQL,
    // Subscriptions
    private notificationsGQL: NotificationsGQL
  ) {
    super(initialState);

    this.notesQueryRef = this.notesGQL.watch();
    this.notes$ = this.notesQueryRef.valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data.notes)
    );

    this.usersQueryRef = this.usersGQL.watch();
    this.users$ = this.usersQueryRef.valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data.users)
    );

    this.booksQueryRef = this.booksGQL.watch();
    this.books$ = this.booksQueryRef.valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data.books)
    );

    this.loginQueryRef = this.currentUserGQL.watch();
    this.login$ = this.loginQueryRef.valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data.currentUser)
    );

    this.notifications$ = this.notificationsGQL.subscribe().pipe(
      tap(response => handleErrors(response)),
      map(v => v.data.notifications)
    );
  }

  deleteNote(noteId: number): Observable<any> {
    return this.deleteNoteGQL.mutate({ param: { noteId } }).pipe(
      filter(response => handleErrors(response)),
      tap(() => this.refetchQueries())
    );
  }

  addNote(bookTitle, noteTitle: string, content: string): Observable<any> {
    return this.addNoteGQL
      .mutate({ param: { bookTitle, noteTitle, content } })
      .pipe(
        filter(response => handleErrors(response)),
        tap(() => this.refetchQueries())
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

  private refetchQueries() {
    this.notesQueryRef.refetch();
    this.usersQueryRef.refetch();
    this.booksQueryRef.refetch();
  }
}
