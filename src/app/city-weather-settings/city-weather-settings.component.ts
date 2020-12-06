import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventService } from '../event.service';
import { faTrash, faImage, faPlus, faWindowClose, faUndo } from '@fortawesome/free-solid-svg-icons';
import { GeoLocation, Option } from './../models/geoLocation';

@Component({
  selector: 'app-city-weather-settings',
  templateUrl: './city-weather-settings.component.html',
  styleUrls: ['./city-weather-settings.component.scss']
})
export class CityWeatherSettingsComponent implements OnInit {
  @Input() currentLocationIndex: number;
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() locationSettingChangeEvent: EventEmitter<Option> = new EventEmitter<Option>();
  bgURLForm = this.fb.group({
    bgURLInput: null
  });
  locations: Array<GeoLocation>;
  faTrash = faTrash;
  faImage = faImage;
  faPlus = faPlus;
  faUndo = faUndo;
  faWindowClose = faWindowClose;

  private saveOptions(): void {
    // save the changed 'locations' arr to localStorage
    localStorage.setItem('locations', JSON.stringify(this.locations));
    // update current geoLocation options
    this.locationSettingChangeEvent.emit(
      this.locations[this.currentLocationIndex].options
    );
  }

  public setBackground(bgUrl: string): void {
    if (bgUrl === '') {
      // set to null on empty string
      bgUrl = null;
    }
    // set background URL for current city & save it back to localStorage
    this.locations[this.currentLocationIndex].options.background = bgUrl;
    this.saveOptions();
    // reset bgURLForm
    this.bgURLForm.reset();
  }

  onRemoveClick(): void {
    this.eventService.emitRemoveLocationEvent(this.locations[this.currentLocationIndex]);
  }

  public onClose(): void {
    this.closeEvent.emit(false);
  }

  constructor(public eventService: EventService, public fb: FormBuilder) { }

  ngOnInit(): void {
    // get locations from localStorage
    this.locations = JSON.parse(localStorage.getItem('locations'));
  }

}
