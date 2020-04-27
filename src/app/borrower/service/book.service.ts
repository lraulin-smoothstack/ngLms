import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Book } from '../entity/book';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class BookService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }
}
