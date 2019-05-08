export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Long type */
  Long: any;
  /** Unrepresentable type */
  UNREPRESENTABLE: any;
};

/** Mutation root */
export type Mutation = {
  addNote?: Maybe<Note>;
  deleteNote: Scalars['Boolean'];
};

/** Mutation root */
export type MutationAddNoteArgs = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

/** Mutation root */
export type MutationDeleteNoteArgs = {
  noteId?: Maybe<Scalars['Long']>;
};

export type Note = {
  id?: Maybe<Scalars['Long']>;
  noteContent?: Maybe<Scalars['String']>;
  noteTitle?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

/** Query root */
export type Query = {
  currentUser?: Maybe<User>;
  notes?: Maybe<Array<Maybe<Note>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

/** Query root */
export type QueryNotesArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Long']>;
};

export type User = {
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Long']>;
  lastName?: Maybe<Scalars['String']>;
  noteCount?: Maybe<Scalars['Long']>;
  userId?: Maybe<Scalars['String']>;
};
export type AddNoteMutationVariables = {
  title: Scalars['String'];
  content: Scalars['String'];
};

export type AddNoteMutation = { __typename?: 'Mutation' } & {
  addNote: Maybe<{ __typename?: 'Note' } & Pick<Note, 'id'>>;
};

export type DeleteNoteMutationVariables = {
  noteId: Scalars['Long'];
};

export type DeleteNoteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteNote'
>;

export type CurrentUserQueryVariables = {};

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser: Maybe<
    { __typename?: 'User' } & Pick<User, 'firstName' | 'lastName'>
  >;
};

export type NotesQueryVariables = {
  userId?: Maybe<Scalars['Long']>;
  searchTerm?: Maybe<Scalars['String']>;
};

export type NotesQuery = { __typename?: 'Query' } & {
  notes: Maybe<
    Array<
      Maybe<
        { __typename?: 'Note' } & Pick<
          Note,
          'id' | 'noteTitle' | 'noteContent'
        > & {
            user: Maybe<
              { __typename?: 'User' } & Pick<User, 'firstName' | 'lastName'>
            >;
          }
      >
    >
  >;
};

export type UsersQueryVariables = {};

export type UsersQuery = { __typename?: 'Query' } & {
  users: Maybe<
    Array<
      Maybe<
        { __typename?: 'User' } & Pick<
          User,
          'id' | 'firstName' | 'lastName' | 'noteCount'
        >
      >
    >
  >;
};

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

export const AddNoteDocument = gql`
  mutation addNote($title: String!, $content: String!) {
    addNote(title: $title, content: $content) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AddNoteGQL extends Apollo.Mutation<
  AddNoteMutation,
  AddNoteMutationVariables
> {
  document = AddNoteDocument;
}
export const DeleteNoteDocument = gql`
  mutation deleteNote($noteId: Long!) {
    deleteNote(noteId: $noteId)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DeleteNoteGQL extends Apollo.Mutation<
  DeleteNoteMutation,
  DeleteNoteMutationVariables
> {
  document = DeleteNoteDocument;
}
export const CurrentUserDocument = gql`
  query currentUser {
    currentUser {
      firstName
      lastName
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CurrentUserGQL extends Apollo.Query<
  CurrentUserQuery,
  CurrentUserQueryVariables
> {
  document = CurrentUserDocument;
}
export const NotesDocument = gql`
  query notes($userId: Long, $searchTerm: String) {
    notes(userId: $userId, searchTerm: $searchTerm) {
      id
      noteTitle
      noteContent
      user {
        firstName
        lastName
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class NotesGQL extends Apollo.Query<NotesQuery, NotesQueryVariables> {
  document = NotesDocument;
}
export const UsersDocument = gql`
  query users {
    users {
      id
      firstName
      lastName
      noteCount
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
  document = UsersDocument;
}
