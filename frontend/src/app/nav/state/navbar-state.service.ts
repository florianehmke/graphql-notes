import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { handleErrors } from '../../../lib/errors';
import {
  Notification,
  NotificationsGQL,
  User
} from '../../../generated/graphql';
import { CurrentUserGQL } from '../../../generated/graphql';

@Injectable()
export class NavbarStateService {
  currentUser$: Observable<User>;
  notification$: Observable<Notification>;

  constructor(
    private currentUser: CurrentUserGQL,
    private notification: NotificationsGQL
  ) {
    this.currentUser$ = this.currentUser.watch().valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data.currentUser)
    );

    this.notification$ = this.notification.subscribe().pipe(
      tap(response => handleErrors(response)),
      map(v => v.data.notifications)
    );
  }
}
