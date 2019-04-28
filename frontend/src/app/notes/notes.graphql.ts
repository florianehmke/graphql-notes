import gql from 'graphql-tag';

export interface Author {
  firstName: string;
  lastName: string;
}

export interface Note {
  id: number;
  noteTitle: string;
  noteContent: string;
  author: Author;
}

export const addNote = gql`
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

export const notesByAuthorQuery = gql`
  {
    notesByAuthorId(authorId: -10) {
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
