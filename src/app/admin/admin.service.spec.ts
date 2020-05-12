import { Author } from 'src/app/common/interfaces/author.interface';
import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { asyncData, asyncError } from 'src/testing/async-observable-helpers';

const MOCK_AUTHORS: Author[] = [
  { id: 1, name: 'JR Tolkein' },
  { id: 2, name: 'Fyodor Dostoevsky' },
  { id: 3, name: 'Leo Tolstoy' },
];

fdescribe('AdminService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: AdminService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new AdminService('mock-api-url', httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected authors (HttpClient called once)', () => {
    const expectedAuthors: Author[] = MOCK_AUTHORS;

    httpClientSpy.get.and.returnValue(asyncData(expectedAuthors));

    service
      .getAuthors()
      .subscribe(
        (authors) =>
          expect(authors).toEqual(expectedAuthors, 'expected authors'),
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
