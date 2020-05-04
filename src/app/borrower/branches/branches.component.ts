import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Branch } from '../entity/branch';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  @Input() branches;
  @Output("selectBranch") selectBranch: EventEmitter<any> = new EventEmitter();

  searchBranches$: Observable<Branch[]>;
  searchTerms = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
    this.searchBranches$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchBranches(term))
    );
  }

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
}
