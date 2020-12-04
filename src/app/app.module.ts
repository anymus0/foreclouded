import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { HourlyWeatherComponent } from './city-weather/hourly-weather/hourly-weather.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LocationInputComponent } from './navbar/location-input/location-input.component';
import { DynamicBackgroundDirective } from './dynamic-background.directive';

@NgModule({
  declarations: [
    AppComponent,
    CityWeatherComponent,
    HourlyWeatherComponent,
    NavbarComponent,
    LocationInputComponent,
    DynamicBackgroundDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
