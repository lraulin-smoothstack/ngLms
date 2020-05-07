import { TestBed } from '@angular/core/testing';

import { BranchService } from './branch.service';

describe('LibraryBranchesService', () => {
  let service: BranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
