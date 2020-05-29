import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { of, BehaviorSubject, Subject } from 'rxjs';

import { LibrarianRoutingModule } from '../librarian-routing.module';
import { PagerService } from '../../common/services/pager.service';
import { BookCopiesComponent } from './book-copies.component';
import { BookCopyService } from '../services/book-copy.service';
import { BranchService } from '../services/branch.service';
import { BookCopy } from '../../common/interfaces/book-copy.interface';
import { Branch } from '../../common/interfaces/branch.interface';
import { ActivatedRoute } from '@angular/router';
import { keyframes } from '@angular/animations';

export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve('x'));
}

export class ParamMap {
  has(name): boolean {
    return true;
  }

  get(name): string {
    return '';
  }
}

export class MockActivatedRoute extends ActivatedRoute {
  snapshot: any;

  constructor() {
    super();
    this.snapshot = {
      paramMap: new ParamMap(),
    };
  }
}

fdescribe('BookCopiesComponent', () => {
  let component: BookCopiesComponent;
  let bookCopyService: BookCopyService;
  let branchService: BranchService;
  let pagerService: PagerService;
  let modalService: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let mockActivatedRoute: MockActivatedRoute = new MockActivatedRoute();
  let fixture: ComponentFixture<BookCopiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCopiesComponent],
      imports: [
        CommonModule,
        LibrarianRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
      ],
      providers: [
        BookCopyService,
        BranchService,
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: 'domain', useValue: 'http://localhost:8080' },
      ],
    }).compileComponents();

    bookCopyService = new BookCopyService(null, '');
    branchService = new BranchService(null, '');
    pagerService = new PagerService();
    modalService = TestBed.get(NgbModal);

    component = new BookCopiesComponent(
      bookCopyService,
      branchService,
      mockActivatedRoute,
      modalService,
      pagerService
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCopiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(mockActivatedRoute.snapshot.paramMap, 'has').and.returnValue(true);
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue('1');
    expect(component).toBeTruthy();
  });

  it('Should call life cycle method ngOninit', () => {
    spyOn(component, 'loadBookCopies');
    spyOn(bookCopyService, 'getBookCopies').and.returnValue(of([]));
    spyOn(mockActivatedRoute.snapshot.paramMap, 'has').and.returnValue(true);
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue('1');
    spyOn(component, 'loadBranch');
    spyOn(branchService, 'getBranch').and.returnValue(of({} as Branch));
    component.ngOnInit();
    expect(component.loadBookCopies).toHaveBeenCalled();
    expect(component.loadBranch).toHaveBeenCalled();
  });

  it('should load book copies from service using mock data', () => {
    const mockBookCopies: BookCopy[] = [
      {
        id: {
          branch: { id: 1, name: 'branch1', address: 'address1' },
          book: {
            id: 1,
            title: 'title1',
            genres: [{ id: 1, name: 'genre1' }],
            authors: [{ id: 1, name: 'author1' }],
            publisher: {
              id: 1,
              name: 'publisher1',
              address: 'address1',
              phoneNumber: '123',
            },
          },
        },
        amount: 1,
      },
      {
        id: {
          branch: { id: 1, name: 'branch1', address: 'address1' },
          book: {
            id: 2,
            title: 'title2',
            genres: [{ id: 2, name: 'genre2' }],
            authors: [{ id: 2, name: 'author2' }],
            publisher: {
              id: 2,
              name: 'publisher2',
              address: 'address2',
              phoneNumber: '45678',
            },
          },
        },
        amount: 2,
      },
    ];

    spyOn(bookCopyService, 'getBookCopies').and.returnValue(of(mockBookCopies));
    component.ngOnInit();
    expect(bookCopyService).toBeTruthy();
    expect(component.bookCopies.length).toEqual(2);
    expect(component.bookCopies).toEqual(mockBookCopies);
  });

  it('Should load library branch from service using  mock data', () => {
    const mockBranch: Branch = {
      id: 1,
      name: 'branch1',
      address: 'address1',
    };
    spyOn(mockActivatedRoute.snapshot.paramMap, 'has').and.returnValue(true);
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue('1');
    spyOn(branchService, 'getBranch').and.returnValue(of(mockBranch));
    component.ngOnInit();
    expect(branchService).toBeTruthy();
    expect(component.branch).toEqual(mockBranch);
  });

  it('Should open a modal window', () => {
    const mockBookCopy: BookCopy = {
      id: {
        branch: { id: 1, name: 'branch1', address: 'address1' },
        book: {
          id: 2,
          title: 'title2',
          genres: [{ id: 2, name: 'genre2' }],
          authors: [{ id: 2, name: 'author2' }],
          publisher: {
            id: 2,
            name: 'publisher2',
            address: 'address2',
            phoneNumber: '45678',
          },
        },
      },
      amount: 2,
    };

    spyOn(mockActivatedRoute.snapshot.paramMap, 'has').and.returnValue(true);
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue('1');
    spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
    component.open('editBookCopyModal', mockBookCopy);
  });

  it('Should close a modal', () => {
    const mockBookCopy: BookCopy = {
      id: {
        branch: { id: 1, name: 'branch1', address: 'address1' },
        book: {
          id: 2,
          title: 'title2',
          genres: [{ id: 2, name: 'genre2' }],
          authors: [{ id: 2, name: 'author2' }],
          publisher: {
            id: 2,
            name: 'publisher2',
            address: 'address2',
            phoneNumber: '45678',
          },
        },
      },
      amount: 2,
    };

    spyOn(mockActivatedRoute.snapshot.paramMap, 'has').and.returnValue(true);
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue('1');
    spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
    component.open('editBookCopyModal', mockBookCopy);
    expect(component.closeResult).toBe('Dismissed');
    tick();
    expect(component.closeResult).toBe('Dismissed');
  });
});
