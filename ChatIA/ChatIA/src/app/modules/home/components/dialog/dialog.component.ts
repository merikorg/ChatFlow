import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat-services/chat.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
  isOpen: boolean = false;
  progress  : number = 0;
  private progressSubscription!: Subscription;
  loadingMessage: string = '';
  viewProgressBar: boolean = false;

  constructor(private chatService: ChatService) {
    this.progressSubscription = this.chatService.loadProgress.subscribe(
      (progress) => {
        const arrayMessage = this.splitStringByPercentage(progress);
        this.loadingMessage = arrayMessage?.before as string;
        this.progress = Number(arrayMessage?.number);
        this.viewProgressBar = this.progress > 0 ? true : false;
        if (this.progress === 100) {
          this.closeModal();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.progressSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  splitStringByPercentage(inputString: string) {
    const regex = /(\d+)%/;

    const result = regex.exec(inputString);

    if (result) {
      const percentageIndex = result.index;
      const beforePercentage = inputString.slice(0, percentageIndex).trim();
      const number = result[1];

      return {
        before: beforePercentage,
        number: number
      };
    }

    return null;
  }

}


