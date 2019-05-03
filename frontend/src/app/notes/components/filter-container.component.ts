import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-container',
  template: `
    <small [class.border-bottom]="showBorder">{{ label }}</small>
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host,
      small {
        display: block;
        width: 100%;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FilterContainerComponent {
  @Input() label: string;
  @Input() showBorder: boolean = false;
}
