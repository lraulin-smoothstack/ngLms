import { PagerService, Pager } from './../../common/services/pager.service';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Author } from '../types';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit {
  private modalRef: NgbModalRef;
  authors: Author[] = [];
  selectedAuthor: Author;
  errorMessage: string;
  closeResult: string;
  searchString = '';
  pager: Pager;
  pagedItems: Author[];
  itemsPerPage = 5;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private pagerService: PagerService
  ) {}

  open(content, author?: Author) {
    this.selectedAuthor = author ? author : { id: null, name: '' };
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errorMessage = '';
        this.closeResult = `Closed with ${result}`;
      },
      (reason) => {
        this.errorMessage = `${reason}`;
        this.closeResult = `Dismissed`;
      }
    );
  }

  fetchData(): void {
    this.adminService.getAuthors().subscribe({
      next: (authors) => {
        this.authors = authors;
        this.setPage(1);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  submit() {
    if (this.selectedAuthor.id) {
      this.adminService.editAuthor(this.selectedAuthor).subscribe({
        next: (_) => this.fetchData(),
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this.adminService.addAuthor(this.selectedAuthor).subscribe({
        next: (_) => this.fetchData(),
        error: (err) => (this.errorMessage = err),
      });
    }

    this.modalRef.close();
  }

  deleteAuthor(id: number) {
    this.adminService.deleteAuthor(id).subscribe({
      next: (_) => this.fetchData(),
      error: (err) => (this.errorMessage = err),
    });
  }

  setPage(page: number): void {
    this.pager = this.pagerService.getPager(
      this.authors.length,
      page,
      this.itemsPerPage
    );
    console.log('PAGER:');
    console.log(`totalItems: ${this.authors.length}`);
    console.log(`page: ${page}`);
    console.log(`itemsPerPage: ${this.itemsPerPage}`);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pagedItems = this.authors.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
