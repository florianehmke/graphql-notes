import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesStateService } from './state/notes-state.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DestructionAware } from '../../lib/destruction-aware';
import { Book, User } from '../../generated/graphql';

@Component({
  selector: 'app-filter',
  template: `
    <h3 class="border-dark border-bottom">Filter Notes</h3>
    <div class="d-flex align-items-start">
      <app-filter-container label="Search by Title/Content" class="mr-3">
        <input class="w-100" [formControl]="searchControl" />
      </app-filter-container>
      <app-filter-container label="Filter by Book" [showBorder]="true">
        <app-filter-book
          *ngFor="let book of books$ | async"
          [book]="book"
          [selectedBookId]="selectedBookId$ | async"
          (bookIdSelected)="selectBookId($event)"
        >
        </app-filter-book>
      </app-filter-container>
      <app-filter-container label="Filter by Author" [showBorder]="true">
        <app-filter-user
          *ngFor="let user of users$ | async"
          [user]="user"
          [selectedUserId]="selectedUserId$ | async"
          (userIdSelected)="selectUserId($event)"
        >
        </app-filter-user>
      </app-filter-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent extends DestructionAware implements OnInit {
  users$: Observable<User[]>;
  selectedUserId$: Observable<number>;

  books$: Observable<Book[]>;
  selectedBookId$: Observable<number>;

  searchControl: FormControl;

  constructor(private notesState: NotesStateService) {
    super();
    this.users$ = this.notesState.users$;
    this.selectedUserId$ = this.notesState.selectedUserId$;
    this.books$ = this.notesState.books$;
    this.selectedBookId$ = this.notesState.selectedBookId$;
    this.searchControl = new FormControl('');
  }

  selectUserId(userId: number) {
    const currentId = this.notesState.state.selectedUserId;
    const selectedUserId = currentId !== userId ? userId : null;

    this.notesState.setSelectedUserId(selectedUserId);
  }

  selectBookId(bookId: number) {
    const currentId = this.notesState.state.selectedBookId;
    const selectedBookId = currentId !== bookId ? bookId : null;

    this.notesState.setSelectedBookId(selectedBookId);
  }

  ngOnInit(): void {
    this.notesState
      .refetchNotesOnVariableChanges()
      .pipe(takeUntil(this.destroyed()))
      .subscribe();

    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        takeUntil(this.destroyed())
      )
      .subscribe(searchTerm => this.notesState.setNoteSearchTerm(searchTerm));
  }
}
