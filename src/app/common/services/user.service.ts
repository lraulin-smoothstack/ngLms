import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    @Inject('domain') private domain: string
  ) {}

  getAll() {
    return this.http.get<User[]>(`${this.domain}/users`);
  }

  register(user: User) {
    return this.http.post(`${this.domain}/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.domain}/users/${id}`);
  }
}
