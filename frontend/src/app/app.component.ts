import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-header></app-header>
      <app-form></app-form>
      <app-filter></app-filter>
      <app-list></app-list>
    </div>
  `,
  styles: [
    `
      app-header,
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
export class AppComponent {}
