import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1 class="display-4">GraphQL Notes</h1>
      <app-form></app-form>
      <app-list></app-list>
    </div>
  `,
  styles: []
})
export class AppComponent {}
