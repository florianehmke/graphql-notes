import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';
import { ListComponent } from './list.component';
import { HeaderComponent } from './header.component';
import { NotesStateService } from './state/notes-state.service';
import { FilterComponent } from './filter.component';
import { FilterContainerComponent } from './components/filter-container.component';
import { FilterUserComponent } from './components/filter-user.component';
import { NoteComponent } from './components/note.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FormComponent,
    FilterComponent,
    ListComponent,
    NoteComponent,
    FilterContainerComponent,
    FilterUserComponent
  ],
  exports: [HeaderComponent, ListComponent, FilterComponent, FormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [NotesStateService]
})
export class NotesModule {}
