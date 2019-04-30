import gql from 'graphql-tag';
import { Author } from '../notes.models';

export interface AuthorsQueryResponse {
  authors: Author[];
}

export const authorsQueryKey = 'authors';
export const authorsQuery = gql`
  query ${authorsQueryKey} {
    ${authorsQueryKey} {
      id
      firstName
      lastName
      noteCount
    }
  }
`;
