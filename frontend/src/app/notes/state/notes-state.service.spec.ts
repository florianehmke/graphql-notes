import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';
import { NotesStateService } from './notes-state.service';
import {
  AddNoteDocument,
  AddNoteMutationVariables,
  DeleteNoteDocument,
  DeleteNoteMutationVariables,
  NotesDocument,
  NotificationsDocument
} from '../../../generated/graphql';
import { noteFactory } from '../../../testing/mocks/note';
import { notificationFactory } from '../../../testing/mocks/notification';
import { notesQueryFactory } from '../../../testing/mocks/notes-query';

describe('NotesStateService', () => {
  let service: NotesStateService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [NotesStateService]
    });
    service = TestBed.get(NotesStateService);
    controller = TestBed.get(ApolloTestingController);
    jest.useFakeTimers();
  });

  describe('GQL Queries', () => {
    it('users$ should contain data', done => {
      const notes = notesQueryFactory.build();
      service.users$.subscribe(users => {
        expect(users.length).toEqual(2);
        expect(users[0].firstName).toEqual(notes.users[0].firstName);
        expect(users[0].lastName).toEqual(notes.users[0].lastName);
        expect(users[0].noteCount).toEqual(notes.users[0].noteCount);
        expect(users[0].id).toEqual(notes.users[0].id);
        done();
      });
      controller.expectOne(NotesDocument).flush({ data: notes });
      jest.runAllTimers();
    });

    it('notes$ should contain data', done => {
      const query = notesQueryFactory.build();
      service.notes$.subscribe(notes => {
        expect(notes.length).toEqual(2);
        expect(notes[0].noteContent).toEqual(query.notes[0].noteContent);
        expect(notes[0].noteTitle).toEqual(query.notes[0].noteTitle);
        done();
      });
      controller.expectOne(NotesDocument).flush({ data: query });
      jest.runAllTimers();
    });
  });

  describe('GQL Subscriptions', () => {
    it('notifications$ should contain data', done => {
      const testNotification = notificationFactory.build();
      service.notifications$.subscribe(notification => {
        expect(notification).toBeTruthy();
        expect(notification.title).toEqual(testNotification.title);
        expect(notification.content).toEqual(testNotification.content);
        done();
      });
      controller.expectOne(NotificationsDocument).flush({
        data: { notifications: testNotification }
      });
      jest.runAllTimers();
    });
  });

  describe('GQL Mutations', () => {
    it('addNote should add a note and refresh notes and users', done => {
      const testNote = noteFactory.build();
      service
        .addNote(
          testNote.book.bookTitle,
          testNote.noteTitle,
          testNote.noteContent
        )
        .subscribe(() => {
          controller.expectOne(NotesDocument);
          done();
        });
      const op = controller.expectOne(AddNoteDocument);
      const variables = <AddNoteMutationVariables>op.operation.variables;

      expect(variables.param.bookTitle).toEqual(testNote.book.bookTitle);
      expect(variables.param.noteTitle).toEqual(testNote.noteTitle);
      expect(variables.param.content).toEqual(testNote.noteContent);

      op.flush({ data: { addNote: { id: testNote.id } } });
      jest.runAllTimers();
    });

    it('deleteNote should delete the note and refresh notes and users', done => {
      const testNote = noteFactory.build();
      service.deleteNote(testNote.id).subscribe(() => {
        controller.expectOne(NotesDocument);
        done();
      });
      const op = controller.expectOne(DeleteNoteDocument);
      const variables = <DeleteNoteMutationVariables>op.operation.variables;

      expect(variables.param.noteId).toEqual(testNote.id);

      op.flush({ data: { deleteNote: {} } });
      jest.runAllTimers();
    });
  });

  afterEach(() => {
    controller.verify();
  });
});
