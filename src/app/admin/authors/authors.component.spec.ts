import { NgbModal, NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from './../admin.service';
import { Author } from 'src/app/common/interfaces/author.interface';
import { Observable, of } from 'rxjs';
import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { AuthorsComponent } from './authors.component';
import { By } from '@angular/platform-browser';

const mockData: Author[] = [
  { id: 1, name: 'JR Tolkein' },
  { id: 2, name: 'Fyodor Dostoevsky' },
  { id: 3, name: 'Leo Tolstoy' },
];

// Mock class for NgbModalRef
export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve('x'));
}

class MockAdminService {
  data: Author[] = mockData;

  getAuthors(): Observable<Author[]> {
    return of(this.data);
  }

  deleteAuthor(id: number): Observable<{}> {
    this.data = this.data.filter((x) => x.id !== id);
    return of({});
  }
}

fdescribe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;
  let modalService: NgbModal;
  const mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsComponent],
      imports: [NgbModule],
      providers: [
        AuthorsComponent,
        { provide: AdminService, useClass: MockAdminService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    modalService = TestBed.get(NgbModal);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load components and call life cycle methods', () => {
    spyOn(component, 'fetchData');
    component.ngOnInit();

    expect(component.fetchData).toHaveBeenCalled();
  });

  describe('compare', () => {
    it('should return -1 when first item comes before second item', () => {
      const actual = component.compare('a', 'z');
      expect(actual).toBe(-1);
    });

    it('should return 1 when first item comes after second item', () => {
      const actual = component.compare('z', 'a');
      expect(actual).toBe(1);
    });

    it('should return 0 when items are the same', () => {
      const actual = component.compare('a', 'a');
      expect(actual).toBe(0);
    });
  });

  describe('fetchData', () => {
    it('should get authors', () => {
      component.fetchData();
      expect(component.authors).toEqual(mockData);
    });
  });

  describe('open', () => {
    it('should set selectedAuthor correctly when opened with no Author', fakeAsync(() => {
      spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
      component.open('editAuthorModal' as any);
      expect(component.selectedAuthor.id).toBeNull();
      expect(component.selectedAuthor.name).toEqual('');
    }));

    it('should set selectedAuthor correctly when opened with an Author', fakeAsync(() => {
      const author: Author = mockData[0];
      spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
      component.open('editAuthorModal' as any, author);
      expect(component.selectedAuthor.id).toEqual(author.id);
      expect(component.selectedAuthor.name).toEqual(author.name);
    }));

    it('should close a modal window', fakeAsync(() => {
      spyOn(modalService, 'open').and.returnValue(mockModalRef as any);
      mockModalRef.result = new Promise((resolve, reject) =>
        reject('someerror')
      );
      component.open('editAuthorModal' as any);
      tick();
      expect(component.closeResult).toBe('Dismissed');
    }));
  });
});
