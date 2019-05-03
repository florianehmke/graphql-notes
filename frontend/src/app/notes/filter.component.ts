import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesStateService } from './state/notes-state.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DestructionAware } from '../../lib/destruction-aware';
import { Author } from '../../generated/graphql';

@Component({
  selector: 'app-filter',
  template: `
    <h3 class="border-dark border-bottom">Filter Notes</h3>
    <div class="d-flex align-items-start">
      <app-filter-container class="mr-3" label="Search by Title/Content">
        <input class="w-100" [formControl]="searchControl" />
      </app-filter-container>
      <app-filter-container label="Filter by Author" [showBorder]="true">
        <app-filter-author
          *ngFor="let author of authors$ | async"
          [author]="author"
          [selectedAuthorId]="selectedAuthorId$ | async"
          (authorIdSelected)="selectAuthorId($event)"
        >
        </app-filter-author>
      </app-filter-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
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
