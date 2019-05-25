import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../generated/graphql';

@Component({
  selector: 'app-user',
  template: `
    <span class="text-light" *ngIf="user; else notLoggedIn"
      >{{ user.firstName }} {{ user.lastName }}</span
    >
    <ng-template #notLoggedIn>
      <span>Not logged in!</span>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarUserComponent {
  @Input() user: User;
}
