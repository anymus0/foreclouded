import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeoLocation } from './models/geoLocation';
import { HttpWeatherService } from './http-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  locations: Array<GeoLocation> = [];
  locationForm = this.fb.group({
    locationQuery: ''
  });

  addLocation(): void {
    // get the coordinates from the input query
    this.weatherService.getCoords(this.locationForm.value.locationQuery).subscribe((location: any) => {
      // create a new GeoLocation obj
      const newGeoLocation: GeoLocation = {
        name: location.features[0].properties.label,
        latitude: location.features[0].geometry.coordinates[0],
        longitude: location.features[0].geometry.coordinates[1]
      };
      // add the 'newGeoLocation' to the 'locations' arr
      this.locations.push(newGeoLocation);
      // save 'locations' to localStorage
      // localStorage only supports strings
      localStorage.setItem('locations', JSON.stringify(this.locations));
    });

    // reset the input form
    this.locationForm.value.locationQuery = '';
    this.locationForm.reset();
  }

  constructor(public fb: FormBuilder, public weatherService: HttpWeatherService) {}

  ngOnInit(): void {
    this.locations = JSON.parse(localStorage.getItem('locations'));
    console.log(this.locations);
  }
}
