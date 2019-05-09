import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { combineLatest, Observable } from 'rxjs';
import { map, skip, takeUntil, tap } from 'rxjs/operators';

import { LocalStateService } from '../../../lib/local-state.service';
import { extractClientErrors } from '../../../lib/extract-error-extensions';
import {
  AddNoteGQL,
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
  noteSearchTerm: string;
}

const initialState: NotesState = {
  selectedUserId: null,
  noteSearchTerm: null
};

@Injectable()
export class NotesStateService extends LocalStateService<NotesState> {
  users$: Observable<User[]>;
  notes$: Observable<Note[]>;
  currentUser$: Observable<User>;
  notifications$: Observable<Notification>;

  selectedUserId$ = this.state$.pipe(map(s => s.selectedUserId));
  noteSearchTerm$ = this.state$.pipe(map(s => s.noteSearchTerm));

  private usersQueryRef: QueryRef<UsersQuery, UsersQueryVariables>;
  private notesQueryRef: QueryRef<NotesQuery, NotesQueryVariables>;
  private currentUserQueryRef: QueryRef<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >;

  constructor(
    private addNoteGQL: AddNoteGQL,
    private deleteNoteGQL: DeleteNoteGQL,
    private notesGQL: NotesGQL,
    private usersGQL: UsersGQL,
    private currentUserGQL: CurrentUserGQL,
    private notificationsGQL: NotificationsGQL
  ) {
    super(initialState);

    const notifications = this.notificationsGQL.subscribe();
    this.notifications$ = notifications.pipe(map(v => v.data.notifications));

    this.notesQueryRef = notesGQL.watch();
    this.notes$ = this.notesQueryRef.valueChanges.pipe(
      map(vc => vc.data.notes)
    );

    this.usersQueryRef = usersGQL.watch();
    this.users$ = this.usersQueryRef.valueChanges.pipe(
      map(vc => vc.data.users)
    );

    this.currentUserQueryRef = currentUserGQL.watch();
    this.currentUser$ = this.currentUserQueryRef.valueChanges.pipe(
      map(vc => vc.data.currentUser)
    );

    combineLatest(this.selectedUserId$, this.noteSearchTerm$)
      .pipe(
        takeUntil(this.destroyed()),
        skip(1)
      )
      .subscribe(([userId, searchTerm]) =>
        this.notesQueryRef.refetch({ userId, searchTerm })
      );
  }

  addNote(title: string, content: string) {
    this.addNoteGQL
      .mutate({ title, content })
      .pipe(tap(response => this.handleClientErrors(response)))
      .subscribe(() => {
        this.notesQueryRef.refetch();
        this.usersQueryRef.refetch();
      });
  }

  deleteNote(noteId: number) {
    this.deleteNoteGQL
      .mutate({ noteId })
      .pipe(tap(response => this.handleClientErrors(response)))
      .subscribe(() => {
        this.notesQueryRef.refetch();
        this.usersQueryRef.refetch();
      });
  }

  setSelectedUserId(userId: number): void {
    this.setState({
      ...this.state,
      selectedUserId: userId
    });
  }

  setNoteSearchTerm(searchTerm: string): void {
    this.setState({
      ...this.state,
      noteSearchTerm: searchTerm
    });
  }

  private handleClientErrors(response) {
    const errors = extractClientErrors(response);
    if (errors) {
      errors.forEach(err => console.log(err));
    }
  }
}
