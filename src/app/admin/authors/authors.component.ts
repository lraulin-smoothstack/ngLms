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

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
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
      next: (authors) => (this.authors = authors),
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

  ngOnInit(): void {
    this.fetchData();
  }
}
