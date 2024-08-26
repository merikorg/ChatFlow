import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ModeButtonComponent } from './components/mode-button/mode-button.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ModeButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ModeButtonComponent
  ]
})
export class SharedModule { }
