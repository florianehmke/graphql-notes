import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-filter-container',
  template: `
    <div>
      <small>{{ label }}</small>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host,
      small {
        display: block;
        width: 100%;
      }
      
      h6 {
          margin: 0;
      }
    `
  ]
})
export class FilterContainerComponent {
  @Input() label: string;
}
