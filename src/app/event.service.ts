import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private addNewLocationEvent = new BehaviorSubject<string>('');

  emitNewLocationEvent(location: string): void {
    this.addNewLocationEvent.next(location);
  }

  newLocationEventListener(): Observable<string> {
    return this.addNewLocationEvent.asObservable();
  }

  constructor() { }
}
