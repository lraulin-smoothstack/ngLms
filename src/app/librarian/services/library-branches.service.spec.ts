import { TestBed } from '@angular/core/testing';

import { LibraryBranchesService } from './library-branches.service';

describe('LibraryBranchesService', () => {
  let service: LibraryBranchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryBranchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
