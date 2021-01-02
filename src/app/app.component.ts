import { Component, OnInit, OnDestroy } from '@angular/core';
import { Network } from '@ngx-pwa/offline';
import { GeoLocation, Option } from './models/geoLocation';
import { HttpWeatherService } from './http-weather.service';
import { EventService } from './event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  public online: boolean;
  public locations: Array<GeoLocation> = [];
  private defaultOption: Option;
  public isCurrentLocationHidden: boolean;

  private addLocation(locationQuery: string): void {
    // add subscription to 'subscriptions' arr
    this.subscriptions.push(
      // get the coordinates from the input query
      this.weatherService.getCoords(locationQuery).subscribe((location: any) => {
        // create a new GeoLocation obj
        const newGeoLocation: GeoLocation = {
          name: location.features[0].properties.label,
          latitude: location.features[0].geometry.coordinates[1],
          longitude: location.features[0].geometry.coordinates[0],
          options: this.defaultOption
        };
        // add the 'newGeoLocation' to the 'locations' arr
        this.locations.push(newGeoLocation);
        // save 'locations' to localStorage
        // localStorage only supports strings
        localStorage.setItem('locations', JSON.stringify(this.locations));
      })
    );
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
      navigator.geolocation.getCurrentPosition((currentPosition) => {
        const currentLat = currentPosition.coords.latitude;
        const currentLon = currentPosition.coords.longitude;
        this.subscriptions.push(
          this.weatherService.getLocationByCoords(currentLat, currentLon).subscribe((geoLocation: any) => {
            // create 'currentLocation' obj
            const currentLocation: GeoLocation = {
              name: `${geoLocation.features[0].properties.locality}, ${geoLocation.features[0].properties.country}`,
              latitude: currentLat,
              longitude: currentLon,
              options: this.defaultOption
            };
            // set previous options if it exists
            if (this.locations[0]) {
              currentLocation.options = this.locations[0].options;
            }
            // save the refreshed 'currentLocation' to the 'locations' arr
            this.locations[0] = currentLocation;
            // save 'locations' arr to localStorage with the new 'currentLocation'
            localStorage.setItem('locations', JSON.stringify(this.locations));
          })
        );
      },
      (err => { console.log(err); }),
      { enableHighAccuracy: true });
    } else {
      console.log('Couldn\'t get the current position!');
    }
  }

  private removeCity(geoLocation: GeoLocation): void {
    // remove the specified geoLocation by its name from 'locations' arr
    this.locations = this.locations.filter((location) => {
      return location.name !== geoLocation.name;
    });
    // save the refreshed arr to localStorage
    localStorage.setItem('locations', JSON.stringify(this.locations));
  }

  constructor(
    protected network: Network,
    public weatherService: HttpWeatherService, private eventService: EventService
  ) {
    // set default property values
    this.defaultOption = {
      allowTextOverlay: false,
      background: null,
      fontColor: '#000'
    };
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.network.onlineChanges.subscribe(onlineStatus => {
        // set current online/offline status (bool)
        this.online = onlineStatus;
      })
    );
    this.setLocations();
    this.subscriptions.push(
      // sub to addNewLocation event
      this.eventService.newLocationEventListener().subscribe(newLocationQuery => {
        // don't send request with empty string
        if (newLocationQuery !== null && newLocationQuery !== '') {
          this.addLocation(newLocationQuery);
        }
      })
    );
    this.subscriptions.push(
      // sub to removeLocationEvent
      this.eventService.removeLocationEventListener().subscribe(geoLocationToRemove => {
        if (geoLocationToRemove !== null) {
          this.removeCity(geoLocationToRemove);
        }
      })
    );
    this.subscriptions.push(
      this.eventService.hideCurrentLocationEventListener().subscribe(isHidden => {
        this.isCurrentLocationHidden = isHidden;
      })
    )
  }

  ngOnDestroy(): void {
    // unsubscribe from subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
