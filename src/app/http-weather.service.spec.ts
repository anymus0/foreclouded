import { TestBed } from '@angular/core/testing';

import { HttpWeatherService } from './http-weather.service';

describe('HttpWeatherService', () => {
  let service: HttpWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
