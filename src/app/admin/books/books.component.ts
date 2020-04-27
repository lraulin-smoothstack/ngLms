import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

interface Book {
  id: number;
  author: string;
  title: string;
  publisher: string;
  genre: string;
}

const BOOKS_DATA: Book[] = [
  {
    id: 1,
    author: 'Douglas Crockford',
    title: 'How JavaScript Works',
    publisher: 'Pakt',
    genre: 'Nonfiction',
  },
];

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  books = BOOKS_DATA;
}
