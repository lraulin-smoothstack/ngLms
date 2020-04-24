import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { BookDialogBoxComponent } from '../book-dialog-box/book-dialog-box.component';

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
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = BOOKS_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(BookDialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(book: Book) {
    this.dataSource.push(book);
    this.table.renderRows();
  }

  updateRowData(book) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === book.id) {
        value.author = book.author;
        value.title = book.title;
        value.publisher = book.publisher;
        value.genre = book.genre;
      }
      return true;
    });
  }

  deleteRowData(book) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== book.id;
    });
  }
}
