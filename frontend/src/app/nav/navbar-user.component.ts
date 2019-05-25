import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../generated/graphql';

@Component({
  selector: 'app-user',
  template: `
    <span class="text-light" *ngIf="user; else notLoggedIn"
      >{{ user.firstName }} {{ user.lastName }}</span
    >
    <ng-template #notLoggedIn>
      Not logged in!
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarUserComponent {
  @Input() user: User;
}
