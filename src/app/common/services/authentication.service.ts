﻿import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  #currentUser: User;

  constructor(
    private http: HttpClient,
    @Inject('domain') private domain: string
  ) {}

  public get currentUser(): User {
    if (!this.#currentUser) {
      const storageUser = window.sessionStorage.getItem('currentUser');

      if (storageUser) {
        try {
          this.#currentUser = JSON.parse(storageUser);
        } catch (e) {
          window.sessionStorage.removeItem('currentUser');
        }
      }
    }

    return this.#currentUser;
  }

  login(credentials: object): Observable<User> {
    return this.http
      .post<User>(`${this.domain}/lms/users/authenticate`, credentials)
      .pipe(
        tap((user: User) => {
          window.sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.#currentUser = user;
        })
      );
  }

  logout(): void {
    window.sessionStorage.removeItem('currentUser');
    this.#currentUser = null;
  }
}
