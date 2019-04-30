import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '../state/notes.models';

@Component({
  selector: 'app-filter-author',
  template: `
    <p
      class="text-right"
      [class.text-muted]="selectedAuthorId !== author.id"
      (click)="authorIdSelected.emit(author.id)"
    >
      {{ author.firstName }} {{ author.lastName }} -
      {{ author.noteCount }} Notes
    </p>
  `,
  styles: [
    `
      p {
        margin: 0;
      }
      :host {
        display: block;
      }
    `
  ]
})
export class FilterAuthorComponent {
  @Input() author: Author;
  @Input() selectedAuthorId: number;
  @Output() authorIdSelected = new EventEmitter<number>();
}
