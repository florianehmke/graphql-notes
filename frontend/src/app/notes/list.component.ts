import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Note, notesByAuthorQuery } from './notes.graphql';

@Component({
  selector: 'app-list',
  template: `
    <div *ngFor="let note of notes" class="mb-3">
      <div>
        <p class="font-weight-bold mb-0 border-bottom">{{ note.noteTitle }}</p>
      </div>
      <div>
        <p class="font-weight-light mb-0">{{ note.noteContent }}</p>
      </div>
    </div>
  `
})
export class ListComponent implements OnInit, OnDestroy {
  private loading: boolean;
  private notes: Note[];
  private errors: any;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: notesByAuthorQuery
      })
      .valueChanges.subscribe(({ data, loading, errors }) => {
        this.loading = loading;
        this.errors = errors;
        this.notes = data.notesByAuthorId;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
