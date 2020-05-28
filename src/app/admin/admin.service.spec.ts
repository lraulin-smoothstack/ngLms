import { HttpClient } from '@angular/common/http';
import { Author } from 'src/app/common/interfaces/author.interface';
import { AdminService } from './admin.service';
import { asyncData } from 'src/testing/async-observable-helpers';

const MOCK_AUTHORS: Author[] = [
  { id: 1, name: 'JR Tolkein' },
  { id: 2, name: 'Fyodor Dostoevsky' },
  { id: 3, name: 'Leo Tolstoy' },
];

describe('AdminService', () => {
  const setup = () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'delete',
      'get',
      'post',
      'put',
    ]);
    const baseUrl = 'mock-base-url';
    const service = new AdminService(baseUrl, httpClientSpy);

    return {
      httpClientSpy,
      baseUrl,
      service,
    };
  };

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  describe('getAuthors', () => {
    it('should return expected authors (HttpClient called once)', () => {
      const { httpClientSpy, baseUrl, service } = setup();
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
      expect(httpClientSpy.get).toHaveBeenCalledWith(baseUrl + '/author');
    });
  });

  describe('deleteAuthor', () => {
    it('should return nothing when successful (HttpClient called once)', () => {
      const { httpClientSpy, baseUrl, service } = setup();
      httpClientSpy.delete.and.returnValue(asyncData(undefined));
      const idToDelete = 1;

      service.deleteAuthor(idToDelete).subscribe((_) => {}, fail);
      expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
      expect(httpClientSpy.delete).toHaveBeenCalledWith(
        baseUrl + '/author/' + idToDelete
      );
    });
  });

  describe('editAuthor', () => {
    it('should return edited author (HttpClient called once)', () => {
      const { httpClientSpy, baseUrl, service } = setup();
      const idToEdit = 1;
      const originalAuthor = MOCK_AUTHORS[idToEdit];
      httpClientSpy.put.and.returnValue(asyncData(undefined));

      service.deleteAuthor(idToEdit).subscribe((_) => {}, fail);
      expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
      expect(httpClientSpy.delete).toHaveBeenCalledWith(
        baseUrl + '/author/' + idToEdit
      );
    });
  });
});
