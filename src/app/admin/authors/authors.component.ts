import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit {
  authors: any[];
  testVal: boolean;
  constructor() {
    this.testVal = true;
  }

  ngOnInit(): void {
    this.authors = [
      { id: 1, name: 'Douglas Murray' },
      { id: 2, name: 'Steven Pinker' },
    ];
  }
}
