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

  describe('Delete Button', () => {
    it('should be hidden if note is not deletable', () => {
      const note = noteFactory.build({deletable: false});
      const host = createHost(`<app-note></app-note>`, true, { note: note });

      const el = host.query('[data-test-id=delete-button]');
      expect(el).toBeFalsy();
    });

    it('should be visible if note is deletable and note is hovered', () => {
      const note = noteFactory.build({deletable: true});
      const host = createHost(`<app-note></app-note>`, true, { note: note });

      host.dispatchMouseEvent(host.element, 'mouseenter');
      host.detectChanges();

      const el = host.query('[data-test-id=delete-button]');
      expect(el).toHaveText("Delete");
    });

    it('should be hidden if note is deletable and note is not hovered', () => {
      const note = noteFactory.build({deletable: true});
      const host = createHost(`<app-note></app-note>`, true, { note: note });

      host.dispatchMouseEvent(host.element, 'mouseenter');
      host.dispatchMouseEvent(host.element, 'mouseleave');
      host.detectChanges();

      const el = host.query('[data-test-id=delete-button]');
      expect(el).toBeFalsy();
    });
  });
});
