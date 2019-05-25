import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './note-create/form.component';
import { ListComponent } from './note-list/list.component';
import { NotesStateService } from './state/notes-state.service';
import { FilterComponent } from './note-filter/filter.component';
import { FilterContainerComponent } from './note-filter/filter-container.component';
import { FilterUserComponent } from './note-filter/filter-user.component';
import { NoteComponent } from './note-list/note.component';
import { FilterBookComponent } from './note-filter/filter-book.component';
import { NotesComponent } from './notes.component';

@NgModule({
  declarations: [
    NotesComponent,
    FormComponent,
    FilterComponent,
    ListComponent,
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
