import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from './state/notes.models';

@Component({
  selector: 'app-filter-author',
  template: `
    <span
      [class.text-muted]="selectedAuthorId !== author.id"
      (click)="authorIdSelected.emit(author.id)"
    >
      {{ author.firstName }} {{ author.lastName }} -
      {{ author.noteCount }} Notes
    </span>
  `,
  styles: [
    `
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
