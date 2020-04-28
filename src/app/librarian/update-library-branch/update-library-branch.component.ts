import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryBranch } from '../models/library-branch.interface';
import { LibraryBranchesService } from '../services/library-branches.service';
import { element } from 'protractor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-library-branch',
  templateUrl: './update-library-branch.component.html',
  styleUrls: ['./update-library-branch.component.css'],
})
export class UpdateLibraryBranchComponent implements OnInit {
  branch: LibraryBranch;

  constructor(
    private branchService: LibraryBranchesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    this.branchService.updateBranch(this.branch.id, form.value, (data) =>
      this.router.navigateByUrl('/librarian')
    );
  }

  _setBranch(id: number) {
    this.branch = this.branchService.branches.find((b) => b.id == id);
  }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.paramMap.has('id')) {
      const tempId: string = this.activeRoute.snapshot.paramMap.get('id');
      const id = parseInt(tempId, 10);

      if (id) {
        if (this.branchService.branches.length == 0) {
          this.branchService.getBranches((data) => this._setBranch(id));
        } else {
          this._setBranch(id);
        }
      }
    }
  }
}
