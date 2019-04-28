import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

const addNote = gql`
  mutation addNote($title: String!, $content: String!, $authorId: Long) {
    addNote(title: $title, content: $content, authorId: $authorId) {
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
  selector: 'app-form',
  template: `
    <form [formGroup]="noteForm" (ngSubmit)="onSubmit()" novalidate>
      <input formControlName="title" />
      <input formControlName="content" />
      <button type="submit" [disabled]="noteForm.invalid">Submit</button>
    </form>
  `
})
export class FormComponent implements OnInit {
  noteForm: FormGroup;

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.noteForm.value);
    this.apollo
      .mutate({
        mutation: addNote,
        variables: {
          title: this.noteForm.value.title,
          content: this.noteForm.value.content,
          authorId: -10
        }
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);
        },
        error => {
          console.log('there was an error sending the query', error);
        }
      );
  }
}
