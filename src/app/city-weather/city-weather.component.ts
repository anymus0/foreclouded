import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpWeatherService } from './../http-weather.service';
import { OpenWeatherOneCall, Hourly } from './../models/openWeatherOneCall';
import { GeoLocation } from './../models/geoLocation';
import { WeatherData, HourlyReport } from './../models/weatherData';
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
  weatherData: WeatherData;
  faTrash = faTrash;

  constructor(public weatherService: HttpWeatherService) {}

  private getWeatherData(): void {
    this.weatherService.getOpenWeatherOneCall(this.geoLocation.latitude, this.geoLocation.longitude).subscribe(
      (weatherData: OpenWeatherOneCall) => {
        // construct the hourReports arr & fill it with hourly objs
        const hourReports: Array<HourlyReport> = [];
        weatherData.hourly.forEach((hourReport: Hourly) => {
          const newHourReport: HourlyReport = {
            time: this.getCityDate(hourReport.dt, weatherData.timezone),
            temp: hourReport.temp,
            weather: hourReport.weather[0]
          };
          hourReports.push(newHourReport);
        });
        // construct the weatherData & set it to 'weatherData' property
        const newWeatherData: WeatherData = {
          lastUpdated: this.getCityDate(weatherData.current.dt, weatherData.timezone),
          temp: weatherData.current.temp,
          weather: weatherData.current.weather[0],
          hourly: hourReports
        };
        this.weatherData = newWeatherData;
      }
    );
  }

  private getCityDate(unixTime: number, cityTimeZone: string): Date {
    // get a city's date converted to localString
    const cityDateString = new Date(unixTime * 1000).toLocaleString(
      'en-US',
      { timeZone: cityTimeZone }
    );
    return new Date(cityDateString);
  }

  onRemoveClick(geoLocation: GeoLocation): void {
    this.geoLocationToRemove.emit(geoLocation);
  }

  ngOnInit(): void {
    this.getWeatherData();
  }

}
