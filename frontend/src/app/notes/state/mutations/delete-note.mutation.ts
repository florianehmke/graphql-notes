import gql from 'graphql-tag';

export interface DeleteNoteMutationVariables {
  noteId: number;
}

export interface DeleteNoteMutationResponse {
  deleteNote: boolean;
}

export const deleteNoteMutation = gql`
  mutation deleteNote($noteId: Long!) {
    deleteNote(noteId: $noteId)
  }
`;
