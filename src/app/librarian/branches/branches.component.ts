import { Component, OnInit } from '@angular/core';
import { LibraryBranch } from '../models/library-branch.model';
import { LibraryBranchesService } from '../services/library-branches.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent implements OnInit {
  constructor(public branchService: LibraryBranchesService) {
    if (branchService.branches.length == 0) {
      branchService.getBranches();
    }
  }

  ngOnInit(): void {}
}
