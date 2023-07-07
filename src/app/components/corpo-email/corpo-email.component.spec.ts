import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CorpoEmailComponent } from './corpo-email.component';
import { CorpoEmailService } from './service/service.service';
import { of } from 'rxjs';

describe('CorpoEmailComponent', () => {
  let component: CorpoEmailComponent;
  let fixture: ComponentFixture<CorpoEmailComponent>;
  let corpoEmailService: jasmine.SpyObj<CorpoEmailService>;

  beforeEach(() => {
    const corpoEmailServiceSpy = jasmine.createSpyObj('CorpoEmailService', ['getEmails']);

    TestBed.configureTestingModule({
      declarations: [CorpoEmailComponent],
      providers: [{ provide: CorpoEmailService, useValue: corpoEmailServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(CorpoEmailComponent);
    component = fixture.componentInstance;
    corpoEmailService = TestBed.inject(CorpoEmailService) as jasmine.SpyObj<CorpoEmailService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch emails on initialization', () => {
    const mockResponse = {
      data: {
        session: {
          mails: [
            { id: 1, subject: 'Email 1' },
            { id: 2, subject: 'Email 2' },
          ]
        }
      }
    };

    corpoEmailService.getEmails.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(corpoEmailService.getEmails).toHaveBeenCalled();
    expect(component.latestEmails).toEqual(mockResponse.data.session.mails);
  });

  

it('should toggle notifications and remove existing subscription when disabled', () => {
    spyOn(Notification, 'requestPermission').and.returnValue(Promise.resolve('denied'));

    component.notificationsEnabled = true;
    component.toggleNotifications();

    expect(Notification.requestPermission).toHaveBeenCalled();
    expect(component.notificationsEnabled).toBeFalse();
  });
});
