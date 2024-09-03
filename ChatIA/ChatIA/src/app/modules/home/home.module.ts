import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './page/main/main.component';
import { HomeRoutingModule } from './home-routing.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    ChatComponent,
    MainComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MatDialogModule,
    FormsModule,
    MatProgressBarModule
  ]
})
export class HomeModule { }
