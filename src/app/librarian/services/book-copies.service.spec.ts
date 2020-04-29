import { TestBed } from '@angular/core/testing';

import { BookCopiesService } from './book-copies.service';

describe('BookCopiesService', () => {
  let service: BookCopiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCopiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
