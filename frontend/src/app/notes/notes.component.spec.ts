import { createHostComponentFactory } from '@netbasal/spectator/jest';
import { MockComponent } from 'ng-mocks';

import { NotesComponent } from './notes.component';
import { NotesStateService } from './state/notes-state.service';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteFilterComponent } from './note-filter/note-filter.component';
import { NoteListComponent } from './note-list/note-list.component';

describe('NavbarComponent', () => {
  const createHost = createHostComponentFactory({
    component: NotesComponent,
    mocks: [NotesStateService],
    declarations: [
      MockComponent(NoteCreateComponent),
      MockComponent(NoteFilterComponent),
      MockComponent(NoteListComponent)
    ]
  });

  it('should create', () => {
    const host = createHost(`<app-notes></app-notes>`);

    expect(host.component).toBeTruthy();
  });
});
