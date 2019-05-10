import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';
import { NotesStateService } from './notes-state.service';
import {
  UsersDocument,
  NotesDocument,
  NotificationsDocument,
  AddNoteDocument,
  AddNoteMutationVariables
} from '../../../generated/graphql';
import { userFactory } from '../../../testing/mocks/user';
import { noteFactory } from '../../../testing/mocks/note';
import { notificationFactory } from '../../../testing/mocks/notification';

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
      const testUser = userFactory.build();
      service.users$.subscribe(users => {
        expect(users.length).toEqual(1);
        expect(users[0].firstName).toEqual(testUser.firstName);
        expect(users[0].lastName).toEqual(testUser.lastName);
        expect(users[0].noteCount).toEqual(testUser.noteCount);
        expect(users[0].id).toEqual(testUser.id);
        done();
      });

      controller.expectOne(UsersDocument).flush({
        data: { users: [testUser] }
      });
      jest.runAllTimers();
    });

    it('notes$ should contain data', done => {
      const testNote = noteFactory.build();
      service.notes$.subscribe(notes => {
        expect(notes.length).toEqual(1);
        expect(notes[0].id).toEqual(testNote.id);
        expect(notes[0].noteTitle).toEqual(testNote.noteTitle);
        expect(notes[0].noteContent).toEqual(testNote.noteContent);
        expect(notes[0].user).toEqual({
          firstName: testNote.user.firstName,
          lastName: testNote.user.lastName
        });
        done();
      });

      controller.expectOne(NotesDocument).flush({
        data: { notes: [testNote] }
      });
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
        .addNote(testNote.noteTitle, testNote.noteContent)
        .subscribe(() => {
          // Expect a refetch of notes and users.
          controller.expectOne(NotesDocument);
          controller.expectOne(UsersDocument);
          done();
        });
      const op = controller.expectOne(AddNoteDocument);
      const variables = <AddNoteMutationVariables>op.operation.variables;

      expect(variables.title).toEqual(testNote.noteTitle);
      expect(variables.content).toEqual(testNote.noteContent);

      op.flush({ data: { addNote: { id: testNote.id } } });
      jest.runAllTimers();
    });
  });

  afterEach(() => {
    controller.verify();
  });
});
