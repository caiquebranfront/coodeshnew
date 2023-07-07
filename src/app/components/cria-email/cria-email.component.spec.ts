import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CriaEmailComponent } from './cria-email.component';
import { CriaEmailService } from './service/cria-email.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { of } from 'rxjs';

describe('CriaEmailComponent', () => {
  let component: CriaEmailComponent;
  let fixture: ComponentFixture<CriaEmailComponent>;
  let criaEmailService: CriaEmailService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriaEmailComponent],
      providers: [CriaEmailService, LocalStorageService]
    });
    fixture = TestBed.createComponent(CriaEmailComponent);
    component = fixture.componentInstance;
    criaEmailService = TestBed.inject(CriaEmailService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should retrieve the email from localStorage and check validity', () => {
      const storedEmail = 'test@example.com';
      spyOn(localStorageService, 'get').and.returnValue(storedEmail);
      spyOn(criaEmailService, 'checkEmailValidity').and.returnValue(of({ data: { isValid: true, config: { notifyOptions: {} } } }));

      component.ngOnInit();

      expect(component.address).toEqual(storedEmail);
      expect(localStorageService.get).toHaveBeenCalledWith('email');
      expect(criaEmailService.checkEmailValidity).toHaveBeenCalledWith(storedEmail);
      expect(component.notifyOptions).toEqual({});
    });

    it('should remove the email from localStorage if it is invalid', () => {
      const storedEmail = 'test@example.com';
      spyOn(localStorageService, 'get').and.returnValue(storedEmail);
      spyOn(criaEmailService, 'checkEmailValidity').and.returnValue(of({ data: { isValid: false } }));
      spyOn(localStorageService, 'remove');

      component.ngOnInit();

      expect(component.address).toBeUndefined();
      expect(localStorageService.get).toHaveBeenCalledWith('email');
      expect(criaEmailService.checkEmailValidity).toHaveBeenCalledWith(storedEmail);
      expect(localStorageService.remove).toHaveBeenCalledWith('email');
    });
  });

  describe('copyToClipboard', () => {
    it('should copy the email to clipboard', () => {
      spyOn(document, 'execCommand');
      component.emailInput = { nativeElement: { select: jasmine.createSpy(), value: 'test@example.com' } as any };

      component.copyToClipboard();

      expect(component.isCopied).toBeTrue();
      expect(component.emailInput.nativeElement.select).toHaveBeenCalled();
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });
  });

  describe('createTemporaryLink', () => {
    it('should create a temporary address and store it in localStorage', () => {
      const email = 'test@example.com';
      spyOn(criaEmailService, 'createTemporaryAddress').and.returnValue(of({ data: { introduceSession: { addresses: [{ address: email }], expiresAt: new Date() } } }));
      spyOn(localStorageService, 'set');

      component.createTemporaryLink();

      expect(criaEmailService.createTemporaryAddress).toHaveBeenCalled();
      expect(localStorageService.set).toHaveBeenCalledWith('email', email);
      expect(component.address).toEqual(email);
    });

    it('should handle expired session', () => {
      spyOn(criaEmailService, 'createTemporaryAddress').and.returnValue(of({ data: { introduceSession: { expiresAt: new Date() } } }));
      spyOn(console, 'log');

      component.createTemporaryLink();

      expect(criaEmailService.createTemporaryAddress).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('A sessão expirou.');
      expect(component.address).toBeUndefined();
    });
  });
});
