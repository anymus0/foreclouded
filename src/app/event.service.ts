import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeoLocation } from './models/geoLocation';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private addNewLocationEvent = new BehaviorSubject<string>(null);
  private removeLocationEvent = new BehaviorSubject<GeoLocation>(null);

  emitNewLocationEvent(location: string): void {
    // validate 'location' string
    if (location !== null && location !== '') {
      this.addNewLocationEvent.next(location);
    }
  }

  emitRemoveLocationEvent(geoLocation: GeoLocation): void {
    if (geoLocation !== null) {
      this.removeLocationEvent.next(geoLocation);
    }
  }

  newLocationEventListener(): Observable<string> {
    return this.addNewLocationEvent.asObservable();
  }

  removeLocationEventListener(): Observable<GeoLocation> {
    return this.removeLocationEvent.asObservable();
  }

  constructor() { }
}
