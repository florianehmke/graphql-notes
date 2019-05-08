import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';
import { NotesStateService } from './notes-state.service';
import { UsersDocument, NotesDocument } from '../../../generated/graphql';
import { userFactory } from '../../../testing/mocks/user';
import { noteFactory } from '../../../testing/mocks/note';

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

  afterEach(() => {
    controller.verify();
  });
});
