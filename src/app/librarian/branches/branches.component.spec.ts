import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { BranchesComponent } from './branches.component';
import { LibrarianRoutingModule } from '../librarian-routing.module';
import { BranchService } from '../services/branch.service';
import { PagerService } from 'src/app/common/services/pager.service';
import { Branch } from '../../common/interfaces/branch.interface';

//Mock Modal
export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve('x'));
}

describe('BranchesComponent', () => {
  let component: BranchesComponent;
  let branchService: BranchService;
  let pagerService: PagerService;
  let modalService: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let fixture: ComponentFixture<BranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BranchesComponent],
      imports: [
        CommonModule,
        LibrarianRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
      ],
      providers: [
        BranchService,
        { provide: 'domain', useValue: 'http://localhost:8080' },
      ],
    }).compileComponents();

    branchService = new BranchService(null, '');
    pagerService = new PagerService();
    modalService = TestBed.get(NgbModal);
    component = new BranchesComponent(
      branchService,
      modalService,
      pagerService
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call life cycle method ngOninit', () => {
    spyOn(component, 'loadLibraryBranches');
    component.ngOnInit();
    expect(component.loadLibraryBranches).toHaveBeenCalled();
  });

  it('Should load all library branches from service using  mock data', () => {
    const mockBranches: Branch[] = [
      { id: 1, name: 'branch1', address: 'address1' },
      { id: 2, name: 'branch2', address: 'address2' },
    ];
    spyOn(branchService, 'getBranches').and.returnValue(of(mockBranches));
    component.ngOnInit();
    expect(branchService).toBeTruthy();
    expect(component.branches.length).toEqual(2);
    expect(component.branches).toEqual(mockBranches);
  });

  it('Should open a modal window', () => {
    const mockBranch: Branch = { id: 1, name: 'name1', address: 'address1' };
    spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
    component.open('editLibraryBranchModal', mockBranch);
  });
});
