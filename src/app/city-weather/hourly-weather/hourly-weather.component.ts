import { Component, OnInit, Input } from '@angular/core';
import { HourlyReport } from './../../models/weatherData';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.scss']
})
export class HourlyWeatherComponent implements OnInit {
  @Input() hourReports: Array<HourlyReport>;

  constructor() {}

  ngOnInit(): void {
  }

}
