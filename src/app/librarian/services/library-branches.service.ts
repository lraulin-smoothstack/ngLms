import { Injectable } from '@angular/core';
import { LibraryBranch } from '../models/library-branch.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LibraryBranchesService {
  branches: LibraryBranch[];

  constructor(private http: HttpClient) {
    this.branches = [
      new LibraryBranch(1, '1284 5th, Ave', 'Seattle Library'),
      new LibraryBranch(2, '3938 Arlington St.', 'Cheney Local Library'),
    ];
  }

  getBranches(callback?: any) {}
}
