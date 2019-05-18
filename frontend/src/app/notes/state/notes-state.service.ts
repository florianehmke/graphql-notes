import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mapTo, skip, tap } from 'rxjs/operators';

import { LocalStateService } from '../../../lib/local-state.service';
import { handleErrors } from '../../../lib/errors';
import {
  AddNoteGQL,
  AddNoteMutation,
  Book,
  BooksGQL,
  BooksQuery,
  BooksQueryVariables,
  CurrentUserGQL,
  CurrentUserQuery,
  CurrentUserQueryVariables,
  DeleteNoteGQL,
  DeleteNoteMutation,
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
  users$: Observable<User[]>;
  notes$: Observable<Note[]>;
  books$: Observable<Book[]>;
  currentUser$: Observable<User>;
  notifications$: Observable<Notification>;

  selectedUserId$ = this.state$.pipe(map(s => s.selectedUserId));
  selectedBookId$ = this.state$.pipe(map(s => s.selectedBookId));
  noteSearchTerm$ = this.state$.pipe(map(s => s.noteSearchTerm));

  private usersQueryRef: QueryRef<UsersQuery, UsersQueryVariables>;
  private notesQueryRef: QueryRef<NotesQuery, NotesQueryVariables>;
  private booksQueryRef: QueryRef<BooksQuery, BooksQueryVariables>;
  private currentUserQueryRef: QueryRef<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >;

  constructor(
    private addNoteGQL: AddNoteGQL,
    private deleteNoteGQL: DeleteNoteGQL,
    private notesGQL: NotesGQL,
    private usersGQL: UsersGQL,
    private booksGQL: BooksGQL,
    private currentUserGQL: CurrentUserGQL,
    private notificationsGQL: NotificationsGQL
  ) {
    super(initialState);

    this.notesQueryRef = notesGQL.watch();
    this.notes$ = this.notesQueryRef.valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data.notes)
    );

    this.usersQueryRef = usersGQL.watch();
    this.users$ = this.usersQueryRef.valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data.users)
    );

    this.booksQueryRef = booksGQL.watch();
    this.books$ = this.booksQueryRef.valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data.books)
    );

    this.currentUserQueryRef = currentUserGQL.watch();
    this.currentUser$ = this.currentUserQueryRef.valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data.currentUser)
    );

    this.notifications$ = this.notificationsGQL.subscribe().pipe(
      tap(response => handleErrors(response)),
      map(v => v.data.notifications)
    );
  }

  refetchNotesOnFilterChanges(): Observable<any> {
    return combineLatest(
      this.selectedBookId$,
      this.selectedUserId$,
      this.noteSearchTerm$
    ).pipe(
      skip(1),
      tap(([bookId, userId, searchTerm]) =>
        this.notesQueryRef.refetch({ bookId, userId, searchTerm })
      )
    );
  }

  deleteNote(noteId: number): Observable<DeleteNoteMutation> {
    return this.deleteNoteGQL.mutate({ noteId }).pipe(
      filter(response => handleErrors(response)),
      tap(() => this.refetch())
    );
  }

  addNote(
    bookTitle: string,
    title: string,
    content: string
  ): Observable<AddNoteMutation> {
    return this.addNoteGQL.mutate({ bookTitle, title, content }).pipe(
      filter(response => handleErrors(response)),
      tap(() => this.refetch())
    );
  }

  setSelectedUserId(userId: number): void {
    this.setState({
      ...this.state,
      selectedUserId: userId
    });
  }

  setSelectedBookId(bookId: number): void {
    this.setState({
      ...this.state,
      selectedBookId: bookId
    });
  }

  setNoteSearchTerm(searchTerm: string): void {
    this.setState({
      ...this.state,
      noteSearchTerm: searchTerm
    });
  }

  private refetch() {
    this.notesQueryRef.refetch();
    this.usersQueryRef.refetch();
    this.booksQueryRef.refetch();
  }
}
