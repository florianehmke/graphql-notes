import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-header></app-header>
      <app-form></app-form>
      <app-list></app-list>
    </div>
  `,
  styles: []
})
export class AppComponent {}
