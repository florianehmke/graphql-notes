import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <h1 class="display-4">GraphQL Notes</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
