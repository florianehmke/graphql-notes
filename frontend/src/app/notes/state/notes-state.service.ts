import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mapTo, skip, tap } from 'rxjs/operators';

import { LocalStateService } from '../../../lib/local-state.service';
import { handleErrors } from '../../../lib/errors';
import {
  AddNoteGQL,
  AddNoteMutation,
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

  refetchNotesOnFilterChanges(): Observable<void> {
    return combineLatest(this.selectedUserId$, this.noteSearchTerm$).pipe(
      skip(1),
      tap(([userId, searchTerm]) =>
        this.notesQueryRef.refetch({ userId, searchTerm })
      ),
      mapTo(null)
    );
  }

  deleteNote(noteId: number): Observable<DeleteNoteMutation> {
    return this.deleteNoteGQL.mutate({ noteId }).pipe(
      filter(response => handleErrors(response)),
      tap(() => {
        this.notesQueryRef.refetch();
        this.usersQueryRef.refetch();
      })
    );
  }

  addNote(title: string, content: string): Observable<AddNoteMutation> {
    return this.addNoteGQL.mutate({ title, content }).pipe(
      filter(response => handleErrors(response)),
      tap(() => {
        this.notesQueryRef.refetch();
        this.usersQueryRef.refetch();
      })
    );
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
}
