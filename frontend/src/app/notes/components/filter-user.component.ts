import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { User } from '../../../generated/graphql';

@Component({
  selector: 'app-filter-user',
  template: `
    <p
      class="text-right"
      [class.text-muted]="selectedUserId !== user.id"
      (click)="userIdSelected.emit(user.id)"
    >
      {{ user.firstName }} {{ user.lastName }}
      <ng-container *ngIf="user.noteCount">
        - {{ user.noteCount }} Notes</ng-container
      >
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
export class FilterUserComponent {
  @Input() user: User;
  @Input() selectedUserId: number;
  @Output() userIdSelected = new EventEmitter<number>();
}
