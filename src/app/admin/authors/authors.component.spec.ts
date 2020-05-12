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
  getAuthors(): Observable<Author[]> {
    return of(MOCK_DATA);
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

  describe('fetchData', () => {
    it('should get authors', () => {
      component.fetchData();
      expect(component.authors.length).toBe(MOCK_DATA.length);
    });
  });
});
