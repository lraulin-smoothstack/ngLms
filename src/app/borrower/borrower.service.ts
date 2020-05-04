import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { BorrowerState } from './entity/borrowerState';
import { Borrower } from './entity/borrower';
import { Loan } from './entity/loan';
import { Book } from './entity/book';
import { Branch } from './entity/branch';


@Injectable({ providedIn: 'root' })
export class BorrowerService {

  private store: BorrowerState = {
    books:    new BehaviorSubject<Book[]>([]),
    loans:    new BehaviorSubject<Loan[]>([]),
    branches: new BehaviorSubject<Branch[]>([]),
    borrower: null
  }

  private _state = new BehaviorSubject<BorrowerState>({} as BorrowerState);
  readonly state$ = this._state.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  get state() {
    return this.state$;
  }

  fetchBorrower(cardNum: string): Observable<Borrower> {
    const url = 'http://www.mocky.io/v2/5eab4aad3300005d00760842';
    return this.http.get(url, this.httpOptions).pipe(
      tap( (borrower: Borrower) => {
        this.store.borrower = borrower;
        this._state.next(Object.assign({}, this.store));
      }),
      catchError(this.handleError<any>('BorrowerSvc::fetchBorrower()'))
      )
  }

  fetchLoans() {
    const url = `http://localhost:8080/lms/borrower/borrowers/${this.store.borrower.id}/loans`;
    this.http.get<Loan[]>(url, this.httpOptions).pipe(
      tap( (loans: Loan[]) => {
        console.log("SVC LOANS");
        console.log(loans);
        this.store.loans.next(loans);
        this._state.next(Object.assign({}, this.store));
      }),
      catchError(this.handleError<any>('BorrowerSvc::fetchLoans()'))
    ).subscribe();
  }

  fetchBranches(){
     const url = "http://localhost:8080/lms/borrower/branches";
     this.http.get<Branch[]>(url, this.httpOptions).pipe(
       tap( (branches: Branch[]) => {
         this.store.branches.next(branches);
         this._state.next(Object.assign({}, this.store));
       }),
       catchError(this.handleError<Book[]>('BorrowerSvc::fetchBranches()'))
     ).subscribe();
  }

  fetchAvailableBooks(branch: Branch){
    const branchId = branch.id;
    const url = `http://localhost:8080/lms/borrower/borrowers/${this.store.borrower.id}/branches/${branchId}/available-books/`;
    this.http.get<Book[]>(url, this.httpOptions).pipe(
      tap( (books: Book[]) => {
        this.store.books.next(books);
        this._state.next(Object.assign({}, this.store));
      }),
      catchError(this.handleError<Book[]>('BorrowerSvc::fetchAvailableBooks()'))
    ).subscribe();
  }

  checkinLoan(loan: Loan) {
    console.log("CHECKING IN LOAN");
    console.log(loan);
    const {
      borrowerId,
      branchId,
      bookId
    } = {
      borrowerId: loan.id.borrower.id,
      branchId: loan.id.branch.id,
      bookId: loan.id.book.id
    };

    const url = `http://localhost:8080/lms/borrower/borrowers/${borrowerId}/branches/${branchId}/books/${bookId}:checkin`;

    this.http.post(url, this.httpOptions).pipe(
      tap( res => console.log(res)),
      catchError(this.handleError<any>('BorrowerSvc::checkinBook()'))
    ).subscribe( res => this.fetchLoans() );
  }

  checkoutBook(book: Book, branch: Branch) {
    console.log("CHECKING OUT");
    console.log(book);
    console.log(branch);
    
    const {
      borrowerId,
      branchId,
      bookId
    } = {
      borrowerId: this.store.borrower.id,
      branchId: branch.id,
      bookId: book.id
    };

    const url = `http://localhost:8080/lms/borrower/borrowers/${borrowerId}/branches/${branchId}/books/${bookId}:checkout`;

    this.http.post(url, this.httpOptions).pipe(
      tap( res => console.log(res)),
      catchError(this.handleError<any>('BorrowerSvc::checkinBook()'))
    ).subscribe( res => this.fetchLoans() );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
