export interface Author {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  author: string;
  title: string;
  publisher: string;
  genre: string;
}
