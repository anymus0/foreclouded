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
  locations: Array<GeoLocation> = [this.getCurrentLocation()];

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

  // set 'locations' arr from localStorage if it exists
  private setLocations(): void {
    const localStorageLocations = JSON.parse(localStorage.getItem('locations'));
    if (localStorageLocations !== null) {
      this.locations = localStorageLocations;
      this.locations[0] = this.getCurrentLocation();
    }
  }

  private getCurrentLocation(): GeoLocation {
    // current geoIP
    const currentGeoLocation: GeoLocation = {
      name: 'Erd',
      latitude: 47,
      longitude: 19
    };
    return currentGeoLocation;
  }

  constructor(public weatherService: HttpWeatherService, private eventService: EventService) {}

  ngOnInit(): void {
    this.setLocations();
    // sub to addNewLocation event in case user adds a new location
    this.eventService.newLocationEventListener().subscribe(newLocationQuery => {
      // don't send request with empty string
      if (newLocationQuery !== '') {
        this.addLocation(newLocationQuery);
      }
    });
  }
}
