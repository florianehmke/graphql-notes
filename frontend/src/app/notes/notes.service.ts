import { Injectable } from '@angular/core';
import { StateService } from '@lib/state.service';
import { map } from 'rxjs/operators';

export interface NotesState {
  selectedAuthorId: number;
  currentAuthorId: number;
}

const initialState: NotesState = {
  selectedAuthorId: null,
  currentAuthorId: -10
};

@Injectable()
export class NotesService extends StateService<NotesState> {
  seletedAuthorId$ = this.state$.pipe(map(state => state.selectedAuthorId));

  constructor() {
    super(initialState);
  }

  setSelectedAuthorId(selectedId: number): void {
    this.setState({
      ...this.state,
      selectedAuthorId: selectedId
    });
  }
}
