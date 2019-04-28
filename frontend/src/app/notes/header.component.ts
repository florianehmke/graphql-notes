import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  Author,
  authors,
  Note,
  notesByAuthorQuery
} from '../graphql/notes.graphql';

@Component({
  selector: 'app-header',
  template: `
    <div class="d-flex justify-content-between mt-3">
      <div>
        <h1 class="display-4">GraphQL Notes</h1>
      </div>
      <div>
        <p class="text-right m-0" *ngFor="let author of authors">
          {{ author.firstName }} {{ author.lastName }} -
          {{ author.noteCount }} Notes
        </p>
      </div>
    </div>
  `
})
export class HeaderComponent implements OnInit, OnDestroy {
  private loading: boolean;
  private authors: Author[];
  private errors: any;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: authors
      })
      .valueChanges.subscribe(({ data, loading, errors }) => {
        this.loading = loading;
        this.errors = errors;
        this.authors = data.authors;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
