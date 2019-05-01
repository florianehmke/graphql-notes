import gql from 'graphql-tag';

export interface AddNoteMutationVariables {
  title: string;
  content: string;
  authorId: number;
}

export interface AddNoteMutationResponse {
  id: number;
}

export const addNoteMutation = gql`
  mutation addNote($title: String!, $content: String!, $authorId: Long) {
    addNote(title: $title, content: $content, authorId: $authorId) {
      id
    }
  }
`;
