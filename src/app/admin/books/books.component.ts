import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

interface Book {
  id: number;
  author: string;
  title: string;
  publisher: string;
  genre: string;
}

const BOOKS: Book[] = [
  {
    id: 1,
    author: 'Douglas Crockford',
    title: 'How JavaScript Works',
    publisher: 'Virgule-Solidus LLC',
    genre: 'Nonfiction',
  },
  {
    id: 2,
    author: 'Eric Elliot',
    title: 'Composing Software',
    publisher: 'Virgule-Solidus LLC',
    genre: 'Nonfiction',
  },
];

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  displayedColumns: string[] = ['id', 'author', 'title', 'publisher', 'genre'];
  dataSource = BOOKS;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
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

  addRowData(rowObj) {
    const d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      author: rowObj.author,
      title: rowObj.title,
      publisher: rowObj.publisher,
      genre: rowObj.genre,
    });
    this.table.renderRows();
  }
  updateRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.author = rowObj.author;
        value.title = rowObj.title;
        value.publisher = rowObj.publisher;
        value.genre = rowObj.genre;
      }
      return true;
    });
  }
  deleteRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== rowObj.id;
    });
  }
}
