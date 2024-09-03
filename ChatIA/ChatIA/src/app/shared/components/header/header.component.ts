import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  toggleMode: boolean = false;

  constructor(private themeService: ThemeService) {}
  
  toggleTheme() {
    this.toggleMode = !this.toggleMode; 
    this.themeService.toggleDarkMode(this.toggleMode);
  }
}
