import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpWeatherService } from './../http-weather.service';
import { GeoLocation } from './../models/geoLocation';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {
  @Input() geoLocation: GeoLocation;
  @Output() geoLocationToRemove = new EventEmitter<GeoLocation>();
  @Input() isCurrentLocation: boolean;
  weatherData: any;
  faTrash = faTrash;

  constructor(public weatherService: HttpWeatherService) {}

  private getWeatherData(): void {
    this.weatherService.getOpenWeatherOneCall(this.geoLocation.latitude, this.geoLocation.longitude).subscribe(
      (weatherData: any) => {
        this.weatherData = weatherData;
      }
    );
  }

  onRemoveClick(geoLocation: GeoLocation): void {
    this.geoLocationToRemove.emit(geoLocation);
  }

  ngOnInit(): void {
    this.getWeatherData();
  }

}
