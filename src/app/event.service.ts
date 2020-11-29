import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private addNewLocationEvent = new BehaviorSubject<string>(null);

  emitNewLocationEvent(location: string): void {
    // validate 'location' string
    if (location !== null && location !== '') {
      this.addNewLocationEvent.next(location);
    }
  }

  newLocationEventListener(): Observable<string> {
    return this.addNewLocationEvent.asObservable();
  }

  constructor() { }
}
