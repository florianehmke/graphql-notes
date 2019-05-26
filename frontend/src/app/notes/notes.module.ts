import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NotesStateService } from './state/notes-state.service';
import { NoteFilterComponent } from './note-filter/note-filter.component';
import { FilterContainerComponent } from './note-filter/filter-container.component';
import { FilterUserComponent } from './note-filter/filter-user.component';
import { NoteComponent } from './note-list/note.component';
import { FilterBookComponent } from './note-filter/filter-book.component';
import { NotesComponent } from './notes.component';

@NgModule({
  declarations: [
    NotesComponent,
    NoteCreateComponent,
    NoteFilterComponent,
    NoteListComponent,
    NoteComponent,
    FilterContainerComponent,
    FilterUserComponent,
    FilterBookComponent
  ],
  exports: [NotesComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [NotesStateService]
})
export class NotesModule {}
