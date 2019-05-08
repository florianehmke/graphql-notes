import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable, combineLatest } from 'rxjs';
import { map, skip, takeUntil, tap } from 'rxjs/operators';

import { LocalStateService } from '../../../lib/local-state.service';
import { extractClientErrors } from '../../../lib/extract-error-extensions';
import {
  AddNoteGQL,
  DeleteNoteGQL,
  Note,
  NotesGQL,
  NotesQuery,
  NotesQueryVariables,
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

  selectedUserId$ = this.state$.pipe(map(s => s.selectedUserId));
  noteSearchTerm$ = this.state$.pipe(map(s => s.noteSearchTerm));

  private usersQueryRef: QueryRef<UsersQuery, UsersQueryVariables>;
  private notesQueryRef: QueryRef<NotesQuery, NotesQueryVariables>;

  constructor(
    private addNoteGQL: AddNoteGQL,
    private deleteNoteGQL: DeleteNoteGQL,
    private notesGQL: NotesGQL,
    private usersGQL: UsersGQL
  ) {
    super(initialState);

    this.notesQueryRef = notesGQL.watch();
    this.notes$ = this.notesQueryRef.valueChanges.pipe(
      map(vc => vc.data.notes)
    );

    this.usersQueryRef = usersGQL.watch();
    this.users$ = this.usersQueryRef.valueChanges.pipe(
      map(vc => vc.data.users)
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
