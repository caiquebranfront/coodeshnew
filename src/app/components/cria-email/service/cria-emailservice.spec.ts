 import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CriaEmailService } from './cria-email.service';


 describe('CriaEmailService', () => {
  let service: CriaEmailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CriaEmailService]
    });
    service = TestBed.inject(CriaEmailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('createTemporaryAddress', () => {
    it('should send a POST request to create temporary address', () => {
      const expectedQuery = `mutation {
        introduceSession {
          id
          expiresAt
          addresses {
            address
          }
        }
      }`;

      service.createTemporaryAddress().subscribe();

      const req = httpMock.expectOne(`${service['endpointUrl']}web-test-202307037OCJk`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body.query).toBe(expectedQuery);

      req.flush({});
    });
  });

  describe('checkEmailValidity', () => {
    it('should send a POST request to check email validity', () => {
      const email = 'test@example.com';
      const expectedQuery = `query {
        isValidEmail(email: "${email}")
      }`;

      service.checkEmailValidity(email).subscribe();

      const req = httpMock.expectOne(`${service['endpointUrl']}web-test-202307037OCJk`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body.query).toBe(expectedQuery);

      req.flush({});
    });
  });
});
