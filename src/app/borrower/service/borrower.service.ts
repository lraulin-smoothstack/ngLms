import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Loan } from '../entity/loan';
import { Book } from '../entity/book';
import { Branch } from '../entity/branch';
import { Borrower } from '../entity/borrower';


import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BorrowerService {

  borrower: Borrower;
  branch: Branch;

  httpOptions = {
    // headers: new HttpHeaders({ 'Content-Type': 'application/text' })
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  /* PRODUCTION: For login once auth server isup. */
  // getBorrower(id: string): Observable<Borrower> {
  //   return this.http.post<Borrower>(this.borrowersUrl, id, this.httpOptions).pipe(
  //     tap((borrower: Borrower) => this.log(`confirmed borrower w/ id=${borrower.id}`)),
  //     catchError(this.handleError<Borrower>('postBorrower'))
  //   );
  // }

  getBorrower(id: string): any {
    // const url = 'http://localhost:8081/lms/borrower/branches/1/borrowers/1';
    // Temp route just to get return data for login
    const borrower = {
      id: 1,
      address: "1325 S 76TH Ave. Yakima, Washington",
      name: "Joe Smith",
      phone_number: "509-287-4787"
    }
    this.borrower = borrower;
    return borrower;
  }

  getLoans(borrowerId: number): Observable<Loan[]> {
    const url = 'http://localhost:8080/lms/borrower/loans';
    const body = {'id': borrowerId };
    return this.http.post<Loan[]>(url, body, this.httpOptions).pipe(
      tap((loans: Loan[]) => console.log(loans)),
      catchError(this.handleError<Loan[]>('BorrowerSvc::getLoans()'))
    );
  }

  getBranches(): Observable<Branch[]> {
    const url = 'http://localhost:8080/lms/borrower/branches';
    return this.http.get<Branch[]>(url, this.httpOptions).pipe(
      tap((branches: Branch[]) => console.log(branches)),
      catchError(this.handleError<Branch[]>('BorrowerSvc::getBranches()'))
    );
  }

  getAvailableBooks(branchId: string, borrowerId: number): Observable<Book[]> {
    const url = `http://localhost:8080/lms/borrower/branch/${branchId}/available-books/`;
    const body = {'id': borrowerId };
    return this.http.post<Book[]>(url, body, this.httpOptions).pipe(
      tap((books: Book[]) => console.log(books)),
      catchError(this.handleError<Book[]>('BorrowerSvc::getAvailableBooks()'))
    );
  }

  checkinBook(loan: Loan): Observable<any> {
    const url = 'http://localhost:8080/lms/borrower/checkin';
    return this.http.post<any>(url, loan.id, this.httpOptions).pipe(
      tap((res: any) => console.log(res)),
      catchError(this.handleError<any>('BorrowerSvc::checkinBook()'))
    );
  }

  checkoutBook(borrowerId: string, book: Book): Observable<any> {
    const url = 'http://localhost:8080/lms/borrower/book/checkout';
    console.log("BOOK IN CHECKOUTBOOK SERVICE");
    console.log(book);
    const body = {
    	"book": {
    		"id": 1,
    		"title": "Harry Potter and the Goblet of Fire",
    		"publisher": {
    			"id": 1,
    			"name": "Penguin House Inc.",
    			"address": "1234 Arlington Ave. Fairfax Virginia 27363",
    			"phoneNumber": "762-282-8787"
    		},
    		"authors": [{ "id": 1, "name": "J.K. Rolling" }],
    		"genres": [{ "id": 1, "name": "Fiction" } ]
    	},
    	"borrower": {
    		"id": 1,
    		"name": "Joe Smith",
    		"address": "1325 S 76TH Ave. Yakima, Washington",
    		"phoneNumber": "509-287-4787"
    	},
    	"branch": {
    		"id": 2,
    		"name": "Chantilly Regional Library",
    		"address": "17637 Fairlakes Parkway Fairfax, Virginia"
    	}
    }
    console.log(body);

    return this.http.post<any>(url, body, this.httpOptions).pipe(
      tap((res: any) => console.log(res)),
      catchError(this.handleError<any>('BorrowerSvc::checkinBook()'))
    );
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
