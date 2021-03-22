import { TestBed } from '@angular/core/testing';

import { HabitatsService } from './habitats.service';

describe('HabitatsService', () => {
  let service: HabitatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
