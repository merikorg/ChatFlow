import { Component } from '@angular/core';
import { ChatService } from 'src/app/core/services/chat-services/chat.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
  isOpen: boolean = false;
  progress: number = 0;

  constructor(private chatService: ChatService) {
    this.chatService.progress$.subscribe(progress => {
      this.progress = progress;
    });
  }

  ngAfterViewInit() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

}


