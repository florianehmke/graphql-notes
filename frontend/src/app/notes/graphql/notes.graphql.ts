import gql from 'graphql-tag';

export const addNoteMutation = gql`
  mutation addNote($title: String!, $content: String!, $authorId: Long) {
    addNote(title: $title, content: $content, authorId: $authorId) {
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

export const notesByAuthorQueryKey = 'notesByAuthorId';
export const notesByAuthorQuery = gql`
  query ${notesByAuthorQueryKey}($authorId: Long) {
    ${notesByAuthorQueryKey}(authorId: $authorId) {
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

export const authorsQueryKey = 'authors';
export const authorsQuery = gql`
  {
    ${authorsQueryKey} {
      id
      firstName
      lastName
      noteCount
    }
  }
`;
