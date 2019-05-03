import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';
import { NotesStateService } from './notes-state.service';
import { AuthorsDocument, NotesDocument } from '../../../generated/graphql';
import { authorFactory } from '../../../testing/mocks/author';
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
    it('authors$ should contain data', done => {
      const testAuthor = authorFactory.build();
      service.authors$.subscribe(authors => {
        expect(authors.length).toEqual(1);
        expect(authors[0].firstName).toEqual(testAuthor.firstName);
        expect(authors[0].lastName).toEqual(testAuthor.lastName);
        expect(authors[0].noteCount).toEqual(testAuthor.noteCount);
        expect(authors[0].id).toEqual(testAuthor.id);
        done();
      });

      controller.expectOne(AuthorsDocument).flush({
        data: { authors: [testAuthor] }
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
        expect(notes[0].author).toEqual({
          firstName: testNote.author.firstName,
          lastName: testNote.author.lastName
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
