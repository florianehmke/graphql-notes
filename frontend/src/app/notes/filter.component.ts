import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesStateService } from './state/notes-state.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DestructionAware } from '../../lib/destruction-aware';
import { User } from '../../generated/graphql';

@Component({
  selector: 'app-filter',
  template: `
    <h3 class="border-dark border-bottom">Filter Notes</h3>
    <div class="d-flex align-items-start">
      <app-filter-container class="mr-3" label="Search by Title/Content">
        <input class="w-100" [formControl]="searchControl" />
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
  searchControl: FormControl;

  constructor(private notesState: NotesStateService) {
    super();
    this.users$ = this.notesState.users$;
    this.selectedUserId$ = this.notesState.selectedUserId$;
    this.searchControl = new FormControl('');
  }

  selectUserId(userId: number) {
    const currentId = this.notesState.state.selectedUserId;
    const selectedUserId = currentId !== userId ? userId : null;

    this.notesState.setSelectedUserId(selectedUserId);
  }

  ngOnInit(): void {
    this.notesState
      .refetchNotesOnFilterChanges()
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
