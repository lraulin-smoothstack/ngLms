import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Borrower } from '../entity/borrower';
import { Loan } from '../entity/loan';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class BorrowerService {

  // Mock API route
  // private borrowersUrl = 'https://5ea4bd242d86f00016b45419.mockapi.io/api/v1/borrowers';

  // Temp route just to get return data for login
  private borrowersUrl = 'http://localhost:8081/lms/borrower/branches/1/borrowers/1';
  private loansUrl = 'http://localhost:8081/lms/borrower/loans';

  httpOptions = {
    // headers: new HttpHeaders({ 'Content-Type': 'application/text' })
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /* PRODUCTION: For login once auth server isup. */
  // getBorrower(id: string): Observable<Borrower> {
  //   return this.http.post<Borrower>(this.borrowersUrl, id, this.httpOptions).pipe(
  //     tap((borrower: Borrower) => this.log(`confirmed borrower w/ id=${borrower.id}`)),
  //     catchError(this.handleError<Borrower>('postBorrower'))
  //   );
  // }

  getBorrower(id: string): any {
    const borrower = {
      id: "1",
      address: "1325 S 76TH Ave. Yakima, Washington",
      name: "Joe Smith",
      phone_number: "509-287-4787"
    }
    return borrower;
  }

  getLoans(id: string): Observable<Array<Loan>> {
    const body = {'id': id };
    return this.http.post<Array<Loan>>(this.loansUrl, body, this.httpOptions).pipe(
      tap((loans: Array<Loan>) => console.log(loans)),
      catchError(this.handleError<Array<Loan>>('postBorrower'))
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

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BorrowerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BorrowerService: ${message}`);
  }
}
