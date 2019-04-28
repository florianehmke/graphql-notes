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