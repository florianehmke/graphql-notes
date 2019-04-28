import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { addNote, notesByAuthorQuery } from './notes.graphql';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="noteForm" (ngSubmit)="onSubmit()" novalidate>
      <p class="h6 mb-0">Add Note:</p>
      <div class="row mb-3">
        <div class="col-sm">
          <input formControlName="title" />
        </div>
        <div class="col-sm">
          <input formControlName="content" />
        </div>
        <div class="col-sm">
          <button type="submit" [disabled]="noteForm.invalid">Submit</button>
        </div>
      </div>
    </form>
  `
})
export class FormComponent {
  noteForm: FormGroup;

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  onSubmit() {
    this.apollo
      .mutate({
        mutation: addNote,
        variables: {
          title: this.noteForm.value.title,
          content: this.noteForm.value.content,
          authorId: -10
        },
        refetchQueries: [
          {
            query: notesByAuthorQuery
          }
        ]
      })
      .subscribe();
  }
}
