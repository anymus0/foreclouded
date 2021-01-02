import { Component, OnInit } from '@angular/core';
import { faSun, faMoon, faCogs } from '@fortawesome/free-solid-svg-icons';
import { EventService } from './../event.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDarkTheme = false;
  isCurrentLocationHidden = false;
  faSun = faSun;
  faMoon = faMoon;
  faCogs = faCogs;


  public changeTheme(): void {
    // save 'isDarkTheme' to localStorage
    localStorage.setItem('isDarkTheme', JSON.stringify(this.isDarkTheme));
    // find <body>
    const body = document.querySelector('body');
    if (this.isDarkTheme) {
      body.classList.remove('lightTheme');
      body.classList.add('darkTheme');
    }
    else {
      body.classList.remove('darkTheme');
      body.classList.add('lightTheme');
    }
  }

  public resetAppData(): void {
    localStorage.clear();
    window.location.reload();
  }

  public changeIsCurrentLocationHidden(): void {
    localStorage.setItem('isCurrentLocationHidden', JSON.stringify(this.isCurrentLocationHidden));
    this.eventService.emitHideCurrentLocation(this.isCurrentLocationHidden);
  }

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // set theme
    this.isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme'));
    this.changeTheme();
    // set currentLocation visibility
    this.isCurrentLocationHidden = JSON.parse(localStorage.getItem('isCurrentLocationHidden'));
    this.changeIsCurrentLocationHidden();
  }

}
