import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatFlow';
  toggleMode: boolean = false;

  constructor(private themeService: ThemeService) {
    this.themeService.currentTheme.subscribe(isDarkMode => {
      this.toggleMode = isDarkMode;
    });
  }


  
}
