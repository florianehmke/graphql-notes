import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { handleErrors } from '../../lib/errors';
import {
  Notification,
  NotificationsGQL,
  User
} from '../../generated/graphql';
import { CurrentUserGQL } from '../../generated/graphql';

@Injectable()
export class AppStateService {
  currentUser$: Observable<User>;
  notifications$: Observable<Notification>;

  constructor(
    private currentUser: CurrentUserGQL,
    private notifications: NotificationsGQL
  ) {
    this.currentUser$ = this.currentUser.watch().valueChanges.pipe(
      tap(response => handleErrors(response)),
      map(vc => vc.data.currentUser)
    );

    this.notifications$ = this.notifications.subscribe().pipe(
      tap(response => handleErrors(response)),
      map(v => v.data.notifications)
    );
  }
}
