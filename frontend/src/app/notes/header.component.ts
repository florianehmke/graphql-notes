import { Component } from '@angular/core';
import { NotesStateService } from './state/notes-state.service';
import { Observable } from 'rxjs';
import { Author } from './state/notes.models';

@Component({
  selector: 'app-header',
  template: `
    <h1 class="mt-3 display-4">GraphQL Notes</h1>
  `
})
export class HeaderComponent {}
