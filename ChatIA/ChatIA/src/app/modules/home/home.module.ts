import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './page/main/main.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    ChatComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
