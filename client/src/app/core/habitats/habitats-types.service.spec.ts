import { TestBed } from '@angular/core/testing';

import { HabitatsTypesService } from './habitats-types.service';

describe('HabitatsTypesService', () => {
  let service: HabitatsTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitatsTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
