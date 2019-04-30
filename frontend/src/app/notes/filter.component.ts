import { Component, OnInit } from '@angular/core';
import { NotesStateService } from './state/notes-state.service';
import { Observable } from 'rxjs';
import { Author } from './state/notes.models';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  template: `
    <h4 class="border-dark border-bottom">Filter Notes</h4>
    <div class="d-flex justify-content-between mb-3">
      <div>
        <label for="search" class="m-0"><small>Search</small></label>
        <input class="d-block" id="search" [formControl]="searchControl" />
      </div>
      <div>
        <ng-container *ngFor="let author of authors$ | async">
          <small
            class="text-right m-0 d-block"
            style="cursor: pointer"
            [class.font-weight-bold]="(selectedAuthorId$ | async) === author.id"
            (click)="selectAuthorId(author.id)"
          >
            {{ author.firstName }} {{ author.lastName }} -
            {{ author.noteCount }} Notes
          </small>
        </ng-container>
      </div>
    </div>
  `
})
export class FilterComponent implements OnInit {
  authors$: Observable<Author[]>;
  selectedAuthorId$: Observable<number>;
  searchControl: FormControl;

  constructor(private notesState: NotesStateService) {
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
        debounceTime(400)
      )
      .subscribe(searchTerm => this.notesState.setNoteSearchTerm(searchTerm));
  }
}
