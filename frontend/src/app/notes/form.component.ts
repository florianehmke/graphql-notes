import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { addNote, notesByAuthorQuery } from './notes.graphql';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="noteForm" (ngSubmit)="onSubmit()" novalidate>
      <input formControlName="title" />
      <input formControlName="content" />
      <button type="submit" [disabled]="noteForm.invalid">Submit</button>
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
