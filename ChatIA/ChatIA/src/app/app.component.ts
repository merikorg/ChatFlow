import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatFlow';

  toggleMode: boolean = false;

  toggleTheme() {
    this.toggleMode = !this.toggleMode; 
  }
}
