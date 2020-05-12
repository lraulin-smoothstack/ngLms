import { AdminService } from './../admin.service';
import { Author } from 'src/app/common/interfaces/author.interface';
import { Observable, of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsComponent } from './authors.component';

const MOCK_DATA: Author[] = [
  { id: 1, name: 'JR Tolkein' },
  { id: 2, name: 'Fyodor Dostoevsky' },
  { id: 3, name: 'Leo Tolstoy' },
];

class MockAdminService {
  data: Author[] = MOCK_DATA;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsComponent],
      providers: [
        AuthorsComponent,
        { provide: AdminService, useClass: MockAdminService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
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
  });

  describe('compare', () => {
    it('should return 1 when first item comes after second item', () => {
      const actual = component.compare('z', 'a');
      expect(actual).toBe(1);
    });
  });

  describe('compare', () => {
    it('should return 0 when items are the same', () => {
      const actual = component.compare('a', 'a');
      expect(actual).toBe(0);
    });
  });

  describe('fetchData', () => {
    it('should get authors', () => {
      component.fetchData();
      expect(component.authors).toEqual(MOCK_DATA);
    });
  });
});
