import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = new BehaviorSubject<boolean>(false);
  currentTheme = this.darkMode.asObservable();

  toggleDarkMode(isDarkMode: boolean) {
    this.darkMode.next(isDarkMode);
  }

}
