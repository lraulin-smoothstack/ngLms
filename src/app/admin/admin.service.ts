import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  Author,
  Book,
  Borrower,
  Branch,
  Loan,
  Publisher,
  Genre,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/lms/admin';
  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl + '/authors').pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteAuthor(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/author/' + id).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  editAuthor(author: Author): Observable<Author> {
    return this.http
      .put<Author>(this.baseUrl + '/author/' + author.id, author)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.baseUrl + '/author', author).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + '/books').pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteBook(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/book/' + id).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.baseUrl + '/book/' + book.id, book).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl + '/book', book).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getBorrowers(): Observable<Borrower[]> {
    return this.http.get<Borrower[]>(this.baseUrl + '/borrowers').pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteBorrower(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/borrower/' + id).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  editBorrower(borrower: Borrower): Observable<Borrower> {
    return this.http
      .put<Borrower>(this.baseUrl + '/borrower/' + borrower.id, borrower)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addBorrower(borrower: Borrower): Observable<Borrower> {
    return this.http.post<Borrower>(this.baseUrl + '/borrower', borrower).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.baseUrl + '/branches').pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteBranch(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/branch/' + id).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  editBranch(branch: Branch): Observable<Branch> {
    return this.http
      .put<Branch>(this.baseUrl + '/branch/' + branch.id, branch)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addBranch(branch: Branch): Observable<Branch> {
    return this.http.post<Branch>(this.baseUrl + '/branch', branch).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.baseUrl + '/book-loans').pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteLoan(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/book-loan/' + id).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  editLoan(loan: Loan): Observable<Loan> {
    return this.http
      .put<Loan>(this.baseUrl + '/book-loan/' + loan.id, loan)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.baseUrl + '/book-loan', loan).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.baseUrl + '/publishers').pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deletePublisher(id: number): Observable<{}> {
    return this.http.delete(this.baseUrl + '/publisher/' + id).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  editPublisher(publisher: Publisher): Observable<Publisher> {
    return this.http
      .put<Publisher>(this.baseUrl + '/publisher/' + publisher.id, publisher)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addPublisher(publisher: Publisher): Observable<Publisher> {
    return this.http
      .post<Publisher>(this.baseUrl + '/publisher', publisher)
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.baseUrl + '/genres').pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occured.
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
