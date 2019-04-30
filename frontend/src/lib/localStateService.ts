import { BehaviorSubject, Observable } from 'rxjs';

export class LocalStateService<T> {
  private readonly _state$;
  state$: Observable<T>;

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state (): T {
    return this._state$.getValue();
  }

  setState(nextState: T) {
    this._state$.next(nextState);
  }
}
