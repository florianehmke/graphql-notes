import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { ListComponent } from './list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { NotesStateService } from './state/notes-state.service';

@NgModule({
  declarations: [HeaderComponent, FormComponent, ListComponent],
  exports: [HeaderComponent, ListComponent, FormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [NotesStateService]
})
export class NotesModule {}
