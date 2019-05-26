import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { Note } from '../../../generated/graphql';

@Component({
  selector: 'app-note',
  template: `
    <ng-container *ngIf="note">
      <div class="d-flex justify-content-between border-bottom">
        <div>
          <span data-test-id="title" class="m-0 font-weight-bold">
            {{ note.noteTitle }}
          </span>
          <span data-test-id="author" class="m-0 text-muted">
            - {{ note.createdBy.firstName }} {{ note.createdBy.lastName }}
          </span>
          <span data-test-id="book-title" class="m-0 text-muted">
            - {{ note.book.bookTitle }}</span
          >
        </div>
        <span
          data-test-id="delete-button"
          class="m-0 text-danger"
          style="cursor:pointer;"
          *ngIf="hover && note.deletable"
          (click)="delete.emit(note)"
        >
          Delete
        </span>
      </div>
      <div>
        <span data-test-id="note-content" class="font-weight-light">{{
          note.noteContent
        }}</span>
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent {
  @Input() note: Note;
  @Output() delete = new EventEmitter<Note>();

  hover = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hover = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hover = false;
  }
}
