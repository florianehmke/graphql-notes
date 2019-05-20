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

export type AddNoteInput = {
  noteTitle?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  bookTitle?: Maybe<Scalars['String']>;
};

export type Book = {
  bookTitle?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  id?: Maybe<Scalars['Long']>;
};

/** Mutation root */
export type Mutation = {
  addNote?: Maybe<Note>;
  deleteNote: Scalars['Boolean'];
};

/** Mutation root */
export type MutationAddNoteArgs = {
  param?: Maybe<AddNoteInput>;
};

/** Mutation root */
export type MutationDeleteNoteArgs = {
  noteId?: Maybe<Scalars['Long']>;
};

export type Note = {
  book?: Maybe<Book>;
  createdBy?: Maybe<User>;
  id?: Maybe<Scalars['Long']>;
  noteContent?: Maybe<Scalars['String']>;
  noteTitle?: Maybe<Scalars['String']>;
};

export type Notification = {
  content?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** Query root */
export type Query = {
  currentUser?: Maybe<User>;
  notes?: Maybe<Array<Maybe<Note>>>;
  books?: Maybe<Array<Maybe<Book>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

/** Query root */
export type QueryNotesArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Long']>;
  bookId?: Maybe<Scalars['Long']>;
};

/** Subscription root */
export type Subscription = {
  notifications?: Maybe<Notification>;
};

export type User = {
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Long']>;
  lastName?: Maybe<Scalars['String']>;
  noteCount?: Maybe<Scalars['Long']>;
  userId?: Maybe<Scalars['String']>;
};
export type AddNoteMutationVariables = {
  param: AddNoteInput;
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

export type BooksQueryVariables = {};

export type BooksQuery = { __typename?: 'Query' } & {
  books: Maybe<
    Array<Maybe<{ __typename?: 'Book' } & Pick<Book, 'id' | 'bookTitle'>>>
  >;
};

export type CurrentUserQueryVariables = {};

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser: Maybe<
    { __typename?: 'User' } & Pick<User, 'firstName' | 'lastName'>
  >;
};

export type NotesQueryVariables = {
  bookId?: Maybe<Scalars['Long']>;
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
            createdBy: Maybe<
              { __typename?: 'User' } & Pick<User, 'firstName' | 'lastName'>
            >;
            book: Maybe<{ __typename?: 'Book' } & Pick<Book, 'bookTitle'>>;
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

export type NotificationsSubscriptionVariables = {};

export type NotificationsSubscription = { __typename?: 'Subscription' } & {
  notifications: Maybe<
    { __typename?: 'Notification' } & Pick<Notification, 'title' | 'content'>
  >;
};

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

export const AddNoteDocument = gql`
  mutation addNote($param: AddNoteInput!) {
    addNote(param: $param) {
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
export const BooksDocument = gql`
  query books {
    books {
      id
      bookTitle
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class BooksGQL extends Apollo.Query<BooksQuery, BooksQueryVariables> {
  document = BooksDocument;
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
  query notes($bookId: Long, $userId: Long, $searchTerm: String) {
    notes(bookId: $bookId, userId: $userId, searchTerm: $searchTerm) {
      id
      noteTitle
      noteContent
      createdBy {
        firstName
        lastName
      }
      book {
        bookTitle
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
export const NotificationsDocument = gql`
  subscription notifications {
    notifications {
      title
      content
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class NotificationsGQL extends Apollo.Subscription<
  NotificationsSubscription,
  NotificationsSubscriptionVariables
> {
  document = NotificationsDocument;
}
