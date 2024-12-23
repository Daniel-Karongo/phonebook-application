import { TestBed } from '@angular/core/testing';

import { ContactNavigationService } from './contact-navigation.service';

describe('ContactNavigationService', () => {
  let service: ContactNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
