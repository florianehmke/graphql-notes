import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Book } from '../../../generated/graphql';

@Component({
  selector: 'app-filter-book',
  template: `
    <p
      [class.text-muted]="selectedBookId !== book.id"
      (click)="bookIdSelected.emit(book.id)"
    >
      {{ book.bookTitle }}
    </p>
  `,
  styles: [
    `
      p {
        margin: 0;
        cursor: pointer;
      }
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBookComponent {
  @Input() book: Book;
  @Input() selectedBookId: number;
  @Output() bookIdSelected = new EventEmitter<number>();
}
