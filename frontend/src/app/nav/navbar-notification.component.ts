import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notification } from '../../generated/graphql';

@Component({
  selector: 'app-navbar-notification',
  template: `
    <span class="text-light" *ngIf="notification">
      {{ notification.title }} - {{ notification.content }}
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarNotificationComponent {
  @Input() notification: Notification;
}
