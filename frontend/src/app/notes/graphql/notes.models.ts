export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  noteCount: number;
}

export interface Note {
  id: number;
  noteTitle: string;
  noteContent: string;
  author: Author;
}