import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  template: `
    <app-note-create></app-note-create>
    <app-note-filter></app-note-filter>
    <app-note-list></app-note-list>
  `,
  styles: [
    `
      app-note-create,
      app-note-filter,
      app-note-list {
        display: block;
        margin-top: 1rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {}
