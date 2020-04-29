import { Author } from './author';
import { Genre } from './genre';
import { Branch } from './branch';

export interface Book {
  id: number;
  title: string;
  authors: Array<Author>;
  genres: Array<Genre>;
  branch: Branch;
  dueDate: Date;
}
