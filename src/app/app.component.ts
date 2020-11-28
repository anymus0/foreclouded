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
  public locations: Array<GeoLocation> = [];
  private currentLocation: GeoLocation = {
    name: '',
    latitude: null,
    longitude: null
  };

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
      // get current location
      navigator.geolocation.getCurrentPosition((currentLocation) => {
        // refresh the current location if it is changed
        if (
          currentLocation.coords.latitude !== this.locations[0].latitude &&
          currentLocation.coords.longitude !== this.locations[0].longitude
        ) {
          this.setCurrentLocation();
        }
      });
    }
    else {
      // set current location on 1st run & save it to localStorage
      this.setCurrentLocation();
    }
  }

  private setCurrentLocation(): void {
    if (navigator.geolocation) {
      // success callback
      navigator.geolocation.getCurrentPosition((currentLocation) => {
        const currentLat = currentLocation.coords.latitude;
        const currentLon = currentLocation.coords.longitude;
        this.weatherService.getLocationByCoords(currentLat, currentLon).subscribe((geoLocation: any) => {
          // refresh 'currentLocation' with the new values
          this.currentLocation.name = `${geoLocation.features[0].properties.locality}, ${geoLocation.features[0].properties.country}`;
          this.currentLocation.latitude = currentLat;
          this.currentLocation.longitude = currentLon;
          // save the refreshed 'currentLocation' to the 'locations' arr
          this.locations[0] = this.currentLocation;
          // save 'locations' arr to localStorage with the new 'currentLocation'
          localStorage.setItem('locations', JSON.stringify(this.locations));
        });
      });
    } else {
      console.log('Couldn\'t get the current position!');
    }
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
