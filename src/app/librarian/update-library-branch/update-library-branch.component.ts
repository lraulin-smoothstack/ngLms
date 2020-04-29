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
    public branchService: LibraryBranchesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    this.branchService.updateBranch(this.branch.id, form.value, (data) =>
      this.router.navigateByUrl('/librarian')
    );
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      const tempId: string = this.activatedRoute.snapshot.paramMap.get('id');
      const id = parseInt(tempId, 10);

      if (id) {
        if (
          id &&
          (this.branchService.branches.length == 0 ||
            id != this.branchService.branches[0].id)
        ) {
          this.branchService.getBranches(
            (data: LibraryBranch[]) =>
              (this.branch = data.find((b) => id == b.id))
          );
        } else {
          this.branch = this.branchService.branches.find((b) => id == b.id);
        }
      }
    }
  }
}
