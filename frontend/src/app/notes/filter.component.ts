import { Component, OnInit } from '@angular/core';
import { NotesStateService } from './state/notes-state.service';
import { Observable } from 'rxjs';
import { Author } from './state/notes.models';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DestructionAware } from '@lib/destruction-aware';

@Component({
  selector: 'app-filter',
  template: `
    <h4 class="border-dark border-bottom">Filter Notes</h4>
    <div class="d-flex align-items-start mb-3">
      <app-filter-container label="Search">
        <input class="d-block" id="search" [formControl]="searchControl" />
      </app-filter-container>
      <app-filter-container label="Filter by Author">
        <ng-container *ngFor="let author of authors$ | async">
          <small
            class="d-block"
            style="cursor: pointer"
            [class.font-weight-bold]="(selectedAuthorId$ | async) === author.id"
            (click)="selectAuthorId(author.id)"
          >
            {{ author.firstName }} {{ author.lastName }} -
            {{ author.noteCount }} Notes
          </small>
        </ng-container>
      </app-filter-container>
    </div>
  `
})
export class FilterComponent extends DestructionAware implements OnInit {
  authors$: Observable<Author[]>;
  selectedAuthorId$: Observable<number>;
  searchControl: FormControl;

  constructor(private notesState: NotesStateService) {
    super();
    this.authors$ = this.notesState.authors$;
    this.selectedAuthorId$ = this.notesState.selectedAuthorId$;
    this.searchControl = new FormControl('');
  }

  selectAuthorId(authorId: number) {
    const currentId = this.notesState.state.selectedAuthorId;
    const selectedAuthorId = currentId !== authorId ? authorId : null;

    this.notesState.setSelectedAuthorId(selectedAuthorId);
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        takeUntil(this.destroyed())
      )
      .subscribe(searchTerm => this.notesState.setNoteSearchTerm(searchTerm));
  }
}
