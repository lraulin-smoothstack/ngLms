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

  registerAdmin(user: User) {
    return this.http.post(`${this.domain}/users/register/admin`, user);
  }

  registerLibrarian(user: User) {
    return this.http.post(`${this.domain}/users/register/librarian`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.domain}/users/${id}`);
  }
}
