import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faTrash, faImage, faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-city-weather-settings',
  templateUrl: './city-weather-settings.component.html',
  styleUrls: ['./city-weather-settings.component.scss']
})
export class CityWeatherSettingsComponent implements OnInit {
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  faTrash = faTrash;
  faImage = faImage;
  faPlus = faPlus;
  faWindowClose = faWindowClose;


  public onClose(): void {
    this.closeEvent.emit(false);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
