import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { ListComponent } from './list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { NotesStateService } from './state/notes-state.service';
import { FilterComponent } from './filter.component';
import { FilterContainerComponent } from './filter-container.component';
import { FilterAuthorComponent } from './filter-author.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FormComponent,
    FilterComponent,
    ListComponent,
    FilterContainerComponent,
    FilterAuthorComponent
  ],
  exports: [HeaderComponent, ListComponent, FilterComponent, FormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [NotesStateService]
})
export class NotesModule {}
