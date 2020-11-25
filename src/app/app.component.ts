import { Component, OnInit } from '@angular/core';
import { GeoLocation } from './models/geoLocation';
import { HttpWeatherService } from './http-weather.service';
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  locations: Array<GeoLocation> = [];

  private addLocation(locationQuery: string): void {
    // get the coordinates from the input query
    this.weatherService.getCoords(locationQuery).subscribe((location: any) => {
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
  }

  constructor(public weatherService: HttpWeatherService, private eventService: EventService) {}

  ngOnInit(): void {
    // get 'locations' arr from localStorage
    this.locations = JSON.parse(localStorage.getItem('locations'));
    // sub to addNewLocation event in case user adds a new location
    this.eventService.newLocationEventListener().subscribe(newLocationQuery => {
      this.addLocation(newLocationQuery);
    });
  }
}
