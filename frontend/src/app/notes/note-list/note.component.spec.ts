import { createHostComponentFactory } from '@netbasal/spectator/jest';

import { NoteComponent } from './note.component';
import { noteFactory } from '../../../testing/mocks/notes';

describe('NavbarComponent', () => {
  const createHost = createHostComponentFactory({
    component: NoteComponent
  });

  it('should create', () => {
    const host = createHost(`<app-note></app-note>`);

    expect(host.component).toBeTruthy();
  });

  it('should display the book title', () => {
    const note = noteFactory.build();
    const host = createHost(`<app-note></app-note>`, true, { note: note });

    const el = host.query('[data-test-id=book-title]');
    expect(el).toHaveText(note.book.bookTitle);
  });

  it('should display the note title', () => {
    const note = noteFactory.build();
    const host = createHost(`<app-note></app-note>`, true, { note: note });

    const el = host.query('[data-test-id=title]');
    expect(el).toHaveText(note.noteTitle);
  });

  it('should display the note author', () => {
    const note = noteFactory.build();
    const host = createHost(`<app-note></app-note>`, true, { note: note });

    const el = host.query('[data-test-id=author]');
    expect(el).toHaveText(note.createdBy.firstName);
    expect(el).toHaveText(note.createdBy.lastName);
  });

  it('delete button click should emit event', () => {
    const note = noteFactory.build({ deletable: true });
    const host = createHost(`<app-note></app-note>`, false, { note: note });
    let emittedNote;

    host.component.delete.subscribe(v => (emittedNote = v));
    host.component.deleteButtonVisible = true;
    host.detectChanges();
    host.click(host.query('[data-test-id=delete-button]'));

    expect(emittedNote).toEqual(note);
  });

  describe('showDeleteButton', () => {
    it('should initially be false', () => {
      const note = noteFactory.build({ deletable: true });
      const host = createHost(`<app-note></app-note>`, true, { note: note });

      expect(host.component.deleteButtonVisible).toBeFalsy();
    });

    it('should be true on hover for deletable=true', () => {
      const note = noteFactory.build({ deletable: true });
      const host = createHost(`<app-note></app-note>`, true, { note: note });

      host.dispatchMouseEvent(host.element, 'mouseenter');
      host.detectChanges();

      expect(host.component.deleteButtonVisible).toBeTruthy();
    });

    it('should be false on hover for deletable=false', () => {
      const note = noteFactory.build({ deletable: false });
      const host = createHost(`<app-note></app-note>`, true, { note: note });

      host.dispatchMouseEvent(host.element, 'mouseenter');
      host.detectChanges();

      expect(host.component.deleteButtonVisible).toBeFalsy();
    });
  });
});
