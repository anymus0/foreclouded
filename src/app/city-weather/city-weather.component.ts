import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpWeatherService } from './../http-weather.service';
import { OpenWeatherOneCall, Hourly } from './../models/openWeatherOneCall';
import { GeoLocation } from './../models/geoLocation';
import { WeatherData, HourlyReport } from './../models/weatherData';
import { faTrash, faImage, faPlus, faCogs } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  public isSettings = false;
  @Input() geoLocation: GeoLocation;
  @Input() currentLocationIndex: number;
  weatherData: WeatherData;
  faTrash = faTrash;
  faImage = faImage;
  faPlus = faPlus;
  faCogs = faCogs;

  private getWeatherData(): void {
    this.subscriptions.push(
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
      )
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

  constructor(public weatherService: HttpWeatherService) {}

  ngOnInit(): void {
    this.getWeatherData();
    // refresh weather data every 5 minutes
    setInterval(() => {
      this.getWeatherData();
    }, 300000);
  }

  ngOnDestroy(): void {
    // unsubscribe from subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
