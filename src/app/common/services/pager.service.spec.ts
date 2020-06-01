import { TestBed } from '@angular/core/testing';

import { PagerService } from './pager.service';

describe('PagerService', () => {
  let service: PagerService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(PagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPager', () => {
    it('should have the correct number of pages', () => {
      const pager = service.getPager(12, 1, 5);
      expect(pager.totalPages).toBe(3);
    });
  });
});
