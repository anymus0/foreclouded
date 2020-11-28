import { Component, OnInit, Input } from '@angular/core';
import { HttpWeatherService } from './../http-weather.service';
import { GeoLocation } from './../models/geoLocation';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {
  @Input() geoLocation: GeoLocation;
  weatherData: any;

  constructor(public weatherService: HttpWeatherService) {}

  private getWeatherData(): void {
    this.weatherService.getOpenWeatherOneCall(this.geoLocation.latitude, this.geoLocation.longitude).subscribe(
      (weatherData: any) => {
        this.weatherData = weatherData;
      }
    );
  }

  ngOnInit(): void {
    this.getWeatherData();
  }

}
