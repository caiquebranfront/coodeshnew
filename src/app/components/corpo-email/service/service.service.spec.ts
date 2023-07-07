import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CorpoEmailService } from './service.service';

describe('CorpoEmailService', () => {
  let service: CorpoEmailService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CorpoEmailService]
    });
    service = TestBed.inject(CorpoEmailService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setEmailSessionId', () => {
    it('should set the session ID', () => {
      const sessionId = '12345';

      service.setEmailSessionId(sessionId);

      expect(service.sessionId).toEqual(sessionId);
    });
  });

  describe('getEmails', () => {
    it('should retrieve emails', () => {
      const sessionId = '12345';
      const expectedUrl = `https://dropmail.me/api/graphql/?query=query%20%7Bsession(id%3A%20%22${sessionId}%22)%20%7Bmails%20%7BrawSize%20fromAddr%20toAddr%20downloadUrl%20text%20headerSubject%7D%7D%7D`;
      const expectedResponse = {
        data: {
          session: {
            mails: [
              {
                rawSize: 100,
                fromAddr: 'sender@example.com',
                toAddr: 'receiver@example.com',
                downloadUrl: 'https://dropmail.me/download',
                text: 'Hello, this is the email content',
                headerSubject: 'Sample Email'
              }
            ]
          }
        }
      };

      service.sessionId = sessionId;
      service.getEmails().subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(expectedResponse);
    });
  });
});
