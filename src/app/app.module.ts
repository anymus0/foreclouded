import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { HourlyWeatherComponent } from './city-weather/hourly-weather/hourly-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    CityWeatherComponent,
    HourlyWeatherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
