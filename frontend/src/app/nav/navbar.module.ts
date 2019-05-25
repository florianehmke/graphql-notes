import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { NavbarStateService } from './state/navbar-state.service';
import { NavbarNotificationComponent } from './navbar-notification.component';
import { NavbarUserComponent } from './navbar-user.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarNotificationComponent,
    NavbarUserComponent
  ],
  exports: [NavbarComponent],
  imports: [CommonModule],
  providers: [NavbarStateService]
})
export class NavbarModule {}
