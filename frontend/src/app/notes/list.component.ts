import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Note } from './model';

const notesByAuthorQuery = gql`
  {
    notesByAuthorId(authorId: -10) {
      id
      noteTitle
      noteContent
      author {
        firstName
        lastName
      }
    }
  }
`;

@Component({
  selector: 'app-list',
  template: `
    <div *ngFor="let note of notes">
      {{ note.noteTitle | json }}: {{ note.noteContent | json }}
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
