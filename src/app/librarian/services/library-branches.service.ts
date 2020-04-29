import { Injectable, Inject } from '@angular/core';
import { LibraryBranch } from '../models/library-branch.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LibraryBranchesService {
  branches: LibraryBranch[];
  isLoading: boolean;

  constructor(
    private http: HttpClient,
    @Inject('domain') private domain: string
  ) {
    this.branches = [];
  }

  getBranches(callback?: any): void {
    this.isLoading = true;
    this.http
      .get(`${this.domain}/lms/librarian/branches`)
      .subscribe((data: LibraryBranch[]) => {
        this.branches = data;
        this.isLoading = false;

        if (callback) {
          callback(data);
        }
      });
  }

  getBranch(id: number, callback: any): void {
    this.isLoading = true;
    this.http
      .get(`${this.domain}/lms/librarian/branches/${id}`)
      .subscribe((data: LibraryBranch) => {
        this.isLoading = false;
        callback(data);
      });
  }

  updateBranch(id: number, branch: LibraryBranch, callback?: any): void {
    this.isLoading = true;

    this.http
      .put(`${this.domain}/lms/librarian/branches/${id}`, branch)
      .subscribe((data: any) => {
        const branchToUpdate = this.branches.find((b) => b.id == id);
        branchToUpdate.name = branch.name;
        branchToUpdate.address = branch.address;
        this.isLoading = false;

        if (callback) {
          callback(data);
        }
      });
  }
}
