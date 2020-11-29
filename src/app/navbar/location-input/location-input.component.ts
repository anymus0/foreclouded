import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventService } from '../../event.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})
export class LocationInputComponent implements OnInit {
  faPlus = faPlus;
  locationForm = this.fb.group({
    locationQuery: null
  });

  onAddLocationClick(): void {
    // validate input string here
    if (this.locationForm.value.locationQuery !== null && this.locationForm.value.locationQuery !== '') {
      this.eventService.emitNewLocationEvent(this.locationForm.value.locationQuery);
    }
    // reset the input form
    this.locationForm.value.locationQuery = null;
    this.locationForm.reset();
  }

  constructor(public fb: FormBuilder, private eventService: EventService) { }

  ngOnInit(): void {
  }

}
