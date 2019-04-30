import gql from 'graphql-tag';
import { Note } from '../notes.models';

export interface NotesQueryResponse {
  notes: Note[];
}

export interface NotesQueryVariables {
  searchTerm: string;
  authorId: number;
}

export const notesQueryKey = 'notes';
export const notesQuery = gql`
  query ${notesQueryKey} ($authorId: Long, $searchTerm: String) {
    ${notesQueryKey}(authorId: $authorId, searchTerm: $searchTerm) {
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
