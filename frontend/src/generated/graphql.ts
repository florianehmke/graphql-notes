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

export type Author = {
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Long']>;
  lastName?: Maybe<Scalars['String']>;
  noteCount?: Maybe<Scalars['Long']>;
  transient: Scalars['Boolean'];
};

/** Mutation root */
export type Mutation = {
  addNote?: Maybe<Note>;
  deleteNote: Scalars['Boolean'];
};

/** Mutation root */
export type MutationAddNoteArgs = {
  title?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['Long']>;
  content?: Maybe<Scalars['String']>;
};

/** Mutation root */
export type MutationDeleteNoteArgs = {
  noteId?: Maybe<Scalars['Long']>;
};

export type Note = {
  author?: Maybe<Author>;
  id?: Maybe<Scalars['Long']>;
  noteContent?: Maybe<Scalars['String']>;
  noteTitle?: Maybe<Scalars['String']>;
  transient: Scalars['Boolean'];
};

/** Query root */
export type Query = {
  notes?: Maybe<Array<Maybe<Note>>>;
  authors?: Maybe<Array<Maybe<Author>>>;
};

/** Query root */
export type QueryNotesArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['Long']>;
};

export type AddNoteMutationVariables = {
  title: Scalars['String'];
  content: Scalars['String'];
  authorId?: Maybe<Scalars['Long']>;
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

export type AuthorsQueryVariables = {};

export type AuthorsQuery = { __typename?: 'Query' } & {
  authors: Maybe<
    Array<
      Maybe<
        { __typename?: 'Author' } & Pick<
          Author,
          'id' | 'firstName' | 'lastName' | 'noteCount'
        >
      >
    >
  >;
};

export type NotesQueryVariables = {
  authorId?: Maybe<Scalars['Long']>;
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
            author: Maybe<
              { __typename?: 'Author' } & Pick<Author, 'firstName' | 'lastName'>
            >;
          }
      >
    >
  >;
};

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

export const AddNoteDocument = gql`
  mutation addNote($title: String!, $content: String!, $authorId: Long) {
    addNote(title: $title, content: $content, authorId: $authorId) {
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
export const AuthorsDocument = gql`
  query authors {
    authors {
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
export class AuthorsGQL extends Apollo.Query<
  AuthorsQuery,
  AuthorsQueryVariables
> {
  document = AuthorsDocument;
}
export const NotesDocument = gql`
  query notes($authorId: Long, $searchTerm: String) {
    notes(authorId: $authorId, searchTerm: $searchTerm) {
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

@Injectable({
  providedIn: 'root'
})
export class NotesGQL extends Apollo.Query<NotesQuery, NotesQueryVariables> {
  document = NotesDocument;
}
