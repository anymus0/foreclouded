import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpWeatherService {

  // use 'geocodeapi.io' to get the coordinates of a given location
  getCoords(location: string): Observable<object> {
    // URL encode the input location
    const encodedLocation = encodeURIComponent(location);
    const url = `${environment.geocodeAPI_URL}/search?apikey=${environment.geocodeAPI_KEY}&text=${encodedLocation}`;
    const geoData$ = this.http.get(url);
    return geoData$;
  }

  getLocationByCoords(lat: number, lon: number): Observable<object> {
    const url = `${environment.geocodeAPI_URL}/reverse?apikey=${environment.geocodeAPI_KEY}&point.lat=${lat}&point.lon=${lon}`;
    const geoData$ = this.http.get(url);
    return geoData$;
  }

  // use the 'openweathermap.org' API to get weather data
  getOpenWeatherOneCall(lat: number, lon: number): Observable<object> {
    const url = `${environment.openweatherAPI_URL}/onecall?lat=${lat}&lon=${lon}&appid=${environment.openweatherAPI_KEY}&units=metric&exclude=minutely`;
    const weatherData$ = this.http.get(url);
    return weatherData$;
  }

  constructor(private http: HttpClient) {}
}
