import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesStateService } from './state/notes-state.service';

@Component({
  selector: 'app-form',
  template: `
      <h3 class="border-dark border-bottom">Create Note</h3>
      <form [formGroup]="noteForm" (ngSubmit)="onSubmit()" novalidate>
      <div class="row d-flex align-items-end mb-1">
        <div class="col-9">
          <small>Title</small>
          <input formControlName="title" />
        </div>
        <div class="col-3">
          <button type="submit" [disabled]="noteForm.invalid">
            Create Note
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <small>Content</small>
          <textarea formControlName="content"></textarea>
        </div>
      </div>
    </form>
  `,
  styles: [
    `
      input,
      small,
      textarea,
      button {
        width: 100%;
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FormComponent {
  noteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notesState: NotesStateService
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  onSubmit() {
    this.notesState.addNote(
      this.noteForm.value.title,
      this.noteForm.value.content
    );
  }
}
