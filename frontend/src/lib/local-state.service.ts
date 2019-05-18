import { BehaviorSubject, Observable } from 'rxjs';
import { DestructionAware } from './destruction-aware';

export class LocalStateService<T> extends DestructionAware {
  private readonly _state$;
  state$: Observable<T>;

  constructor(initialState: T) {
    super();
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state(): T {
    return this._state$.getValue();
  }

  setState(nextState: Partial<T>) {
    this._state$.next({
      ...this.state,
      ...nextState
    });
  }
}
