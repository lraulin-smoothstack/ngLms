import { Component, OnInit } from '@angular/core';
import { LibraryBranch } from '../models/library-branch.interface';
import { LibraryBranchesService } from '../services/library-branches.service';
import { PagerService } from 'src/app/common/services/pager.service';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent implements OnInit {
  selectedBranch: LibraryBranch;
  private modalRef: NgbModalRef;
  errMsg: any;
  closeResult: any;
  totalItems: number;
  pager: any = {};
  pagedItems: any[];
  itemsPerPage = 5;

  constructor(
    public branchService: LibraryBranchesService,
    private modalService: NgbModal,
    private pagerService: PagerService
  ) {}

  ngOnInit(): void {
    this.loadLibraryBranches();
  }

  loadLibraryBranches(): void {
    this.branchService.getBranches((data) => {
      this.totalItems = data.length;
      this.setPage(1);
    });
  }

  updateLibraryBranch(form: NgForm): void {
    this.branchService.updateBranch(
      this.selectedBranch.id,
      form.value,
      (data) => this.modalRef.close()
    );
  }

  open(content, branch: LibraryBranch) {
    this.selectedBranch = branch;
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      (result) => {
        this.errMsg = '';
        this.closeResult = `Closed with ${result}`;
      },
      (reason) => {
        this.errMsg = '';
        this.closeResult = `Dismissed`;
      }
    );
  }

  setPage(page: number): void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    const data = this.branchService.branches;
    this.pager = this.pagerService.getPager(
      data.length,
      page,
      this.itemsPerPage
    );
    this.pagedItems = data.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
}
