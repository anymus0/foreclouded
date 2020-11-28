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

  constructor(public weatherService: HttpWeatherService) {}

  ngOnInit(): void {
    // this.weatherService.getOpenWeatherOneCall().subscribe();
  }

}
