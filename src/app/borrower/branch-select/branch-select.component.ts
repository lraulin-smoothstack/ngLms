import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, of } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { BorrowerService } from '../service/borrower.service';

import { Branch } from '../entity/branch';

@Component({
  selector: 'app-branch-select',
  templateUrl: './branch-select.component.html',
  styleUrls: ['./branch-select.component.css']
})
export class BranchSelectComponent implements OnInit {

  branches: Branch[];
  searchBranches$: Observable<Branch[]>;
  searchTerms = new Subject<string>();

  constructor(
    public router: Router,
    private borrowerService: BorrowerService
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchBranches(term: string): Observable<Branch[]> {
    if (!term.trim()) {
      return of(this.branches);
    }
    return of(this.branches.filter( branch =>
      branch.name.includes(term) || branch.address.includes(term)));
  }

  ngOnInit(): void {
    this.borrowerService.getBranches()
       .subscribe( (branches) => {
         this.branches = branches;
         this.search('');
       });

   this.searchBranches$ = this.searchTerms.pipe(
     debounceTime(300),
     distinctUntilChanged(),
     switchMap((term: string) => this.searchBranches(term))
   );
  }

  selectBranch(branch: Branch) {
    this.borrowerService.branch = branch;
    this.router.navigate([`borrower/home/branch/${branch.id}/books`])
  }
}
