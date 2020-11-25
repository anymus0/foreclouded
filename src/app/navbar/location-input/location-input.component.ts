import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})
export class LocationInputComponent implements OnInit {
  locationForm = this.fb.group({
    locationQuery: ''
  });

  onAddLocationClick(): void {
    this.eventService.emitNewLocationEvent(this.locationForm.value.locationQuery);
    // reset the input form
    this.locationForm.value.locationQuery = '';
    this.locationForm.reset();
  }

  constructor(public fb: FormBuilder, private eventService: EventService) { }

  ngOnInit(): void {
  }

}
