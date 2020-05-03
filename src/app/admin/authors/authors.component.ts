import { SortableDirective, SortEvent } from './../sortable.directive';
import { PagerService, Pager } from './../../common/services/pager.service';
import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
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
  arrows = { name: '' };

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private pagerService: PagerService
  ) {}

  onSort({ column, direction }: SortEvent) {
    console.log('Sorting...');
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.authors = this.sort(this.authors, column, direction);
    this.arrows[column] =
      direction === 'asc' ? '△' : direction === 'desc' ? '▽' : '';
    this.setPage(this.pager.currentPage);
  }

  compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  sort(items: Author[], column: string, direction: string): Author[] {
    if (direction === '') {
      return items;
    } else {
      return [...items].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

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
        console.log(this.authors);
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
