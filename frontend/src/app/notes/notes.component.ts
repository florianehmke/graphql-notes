import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  template: `
    <app-form></app-form>
    <app-filter></app-filter>
    <app-list></app-list>
  `,
  styles: [
    `
      app-form,
      app-filter,
      app-list {
        display: block;
        margin-top: 1rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {}
