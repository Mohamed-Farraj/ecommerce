import { TestBed } from '@angular/core/testing';

import { IOrdersService } from './iorders.service';

describe('IOrdersService', () => {
  let service: IOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
