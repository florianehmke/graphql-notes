import gql from 'graphql-tag';
import { Note } from '../notes.models';

export interface NotesQueryResponse {
  notesByAuthorId: Note[];
}

export interface NotesQueryVariables {
  authorId: number;
}

export const notesByAuthorIdQueryKey = 'notesByAuthorId';
export const notesByAuthorIdQuery = gql`
  query ${notesByAuthorIdQueryKey} ($authorId: Long) {
    ${notesByAuthorIdQueryKey}(authorId: $authorId) {
      id
      noteTitle
      noteContent
      author {
        firstName
        lastName
      }
    }
  }
`;
