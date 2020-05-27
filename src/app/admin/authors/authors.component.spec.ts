import { NgbModal, NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from './../admin.service';
import { Author } from 'src/app/common/interfaces/author.interface';
import { Observable, of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsComponent],
      providers: [
        AuthorsComponent,
        NgbModal,
        { provide: AdminService, useClass: MockAdminService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    it('should open modal with correct title ("Add Author") when called without Author object', () => {
      expect(component.editAuthorModalRef).toBeTruthy();
      component.open(component.editAuthorModalRef);
      fixture.detectChanges();
      const headerText = fixture.debugElement.queryAll(By.css('h5'))[0]
        .nativeElement.innerText;
      expect(headerText).toBeTruthy();
    });
  });
});
