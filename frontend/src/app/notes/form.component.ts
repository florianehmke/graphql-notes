import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesGraphqlFacade } from './graphql/notes.graphql.facade';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="noteForm" (ngSubmit)="onSubmit()" novalidate>
      <div class="row d-flex align-items-end">
        <div class="col-9">
          <label for="title" class="mb-0"><small>Title</small></label>
          <input id="title" formControlName="title" />
        </div>
        <div class="col-3">
          <button type="submit" [disabled]="noteForm.invalid">
            Create Note
          </button>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label for="content" class="mb-0"><small>Content</small></label>
          <textarea id="content" formControlName="content"></textarea>
        </div>
      </div>
    </form>
  `,
  styles: [
    `
      input,
      label,
      textarea,
      button {
        width: 100%;
        display: block;
      }
    `
  ]
})
export class FormComponent {
  noteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notesGraphql: NotesGraphqlFacade
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  onSubmit() {
    this.notesGraphql.addNote(
      this.noteForm.value.title,
      this.noteForm.value.content
    );
  }
}
