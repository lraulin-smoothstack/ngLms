import { Author, Publisher, Genre } from './../types';
import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Book } from '../types';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pager, PagerService } from 'src/app/common/services/pager.service';
import { SortableDirective, SortEvent } from '../sortable.directive';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  private modalRef: NgbModalRef;
  books: Book[] = [];
  selectedBook: Book;
  authors: Author[] = [];
  selectedAuthor: Author | '' = '';
  publishers: Publisher[] = [];
  selectedPublisher: Publisher | '';
  genres: Genre[] = [];
  selectedGenre: Genre | '' = '';
  errorMessage: string;
  closeResult: string;
  searchString = '';
  pager: Pager;
  pagedItems: Book[];
  itemsPerPage = 5;
  arrows = { title: '', author: '', publisher: '', genre: '' };

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

    this.books = this.sort(this.books, column, direction);
    this.arrows[column] =
      direction === 'asc' ? '△' : direction === 'desc' ? '▽' : '';
    this.setPage(this.pager.currentPage);
  }

  compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  sort(items: Book[], column: string, direction: string): Book[] {
    if (direction === '') {
      return items;
    } else {
      return [...items].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  fetchBooks(): void {
    this.adminService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        if (this.pager) {
          this.setPage(this.pager.currentPage);
        } else {
          this.setPage(1);
        }
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  fetchMisc(): void {
    this.adminService.getAuthors().subscribe({
      next: (authors) => (this.authors = authors),
      error: (err) => (this.errorMessage = err),
    });
    this.adminService.getPublishers().subscribe({
      next: (publishers) => (this.publishers = publishers),
      error: (err) => (this.errorMessage = err),
    });
    this.adminService.getGenres().subscribe({
      next: (genres) => (this.genres = genres),
      error: (err) => (this.errorMessage = err),
    });
  }

  open(content, book?: Book) {
    this.selectedPublisher = book ? book.publisher : '';
    this.selectedBook = book
      ? book
      : {
          id: null,
          title: '',
          authors: [],
          publisher: null,
          genres: [],
        };
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

  setPage(page: number): void {
    this.pager = this.pagerService.getPager(
      this.books.length,
      page,
      this.itemsPerPage
    );

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pagedItems = this.books.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  submit() {
    console.log('SUBMIT!');
    if (this.selectedPublisher !== '') {
      console.log(`publisher: ${this.selectedPublisher}`);
      this.selectedBook.publisher = this.selectedPublisher;
    } else {
      console.log('ERROR: No selected publisher!');
    }
    console.log(this.selectedBook);
    if (this.selectedBook.id) {
      this.adminService.editBook(this.selectedBook).subscribe({
        next: (_) => this.fetchBooks(),
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this.adminService.addBook(this.selectedBook).subscribe({
        next: (_) => this.fetchBooks(),
        error: (err) => (this.errorMessage = err),
      });
    }

    this.modalRef.close();
  }

  deleteBook(id: number) {
    this.adminService.deleteBook(id).subscribe({
      next: (_) => this.fetchBooks(),
      error: (err) => (this.errorMessage = err),
    });
  }

  getAuthors(book: Book): string {
    return book.authors ? book.authors.map((x) => x.name).join(', ') : '';
  }

  getAvailableAuthors(): Author[] {
    return this.authors.filter(
      (x) => !this.selectedBook.authors.map((y) => y.id).includes(x.id)
    );
  }

  getAvailableGenres(): Genre[] {
    return this.genres.filter(
      (x) => !this.selectedBook.genres.map((y) => y.id).includes(x.id)
    );
  }

  getGenres(book: Book): string {
    return book.genres ? book.genres.map((x) => x.name).join(', ') : '';
  }

  addAuthor(): void {
    if (this.selectedAuthor !== '') {
      this.selectedBook.authors.push(this.selectedAuthor);
    }
    this.selectedAuthor = '';
  }
  addGenre(): void {
    if (this.selectedGenre !== '') {
      this.selectedBook.genres.push(this.selectedGenre);
    }
    this.selectedGenre = '';
  }

  removeAuthor(author: Author): void {
    this.selectedBook.authors = this.selectedBook.authors.filter(
      (a) => a !== author
    );
    this.selectedAuthor = '';
  }

  removeGenre(genre: Genre): void {
    this.selectedBook.genres = this.selectedBook.genres.filter(
      (a) => a !== genre
    );
    this.selectedGenre = '';
  }

  comparePublishers(p1: Publisher, p2: Publisher): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

  ngOnInit(): void {
    this.fetchBooks();
    this.fetchMisc();
  }
}
