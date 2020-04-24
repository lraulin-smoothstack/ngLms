import { Component, OnInit } from '@angular/core';

interface Author {
  id: number;
  name: string;
}

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit {
  authors: Author[];
  constructor() {}

  ngOnInit(): void {
    this.authors = [
      { id: 1, name: 'Douglas Murray' },
      { id: 2, name: 'Steven Pinker' },
    ];
  }
}
