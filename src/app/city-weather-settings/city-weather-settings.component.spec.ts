import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityWeatherSettingsComponent } from './city-weather-settings.component';

describe('CityWeatherSettingsComponent', () => {
  let component: CityWeatherSettingsComponent;
  let fixture: ComponentFixture<CityWeatherSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityWeatherSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityWeatherSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
