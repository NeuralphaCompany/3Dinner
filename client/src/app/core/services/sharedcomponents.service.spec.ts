import { TestBed } from '@angular/core/testing';

import { SharedcomponentsService } from './sharedcomponents.service';

describe('SharedcomponentsService', () => {
  let service: SharedcomponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedcomponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
