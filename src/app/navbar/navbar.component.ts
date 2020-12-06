import { Component, OnInit } from '@angular/core';
import { faSun, faMoon, faCogs } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDarkTheme = false;
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

  constructor() { }

  ngOnInit(): void {
    // set theme
    this.isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme'));
    this.changeTheme();
  }

}
