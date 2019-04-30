import { OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class DestructionAware implements OnDestroy {
  destroyed$: Subject<boolean> = new Subject<boolean>();

  destroyed(): Observable<boolean> {
    return this.destroyed$.asObservable();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
    console.log("Ja")
  }
}