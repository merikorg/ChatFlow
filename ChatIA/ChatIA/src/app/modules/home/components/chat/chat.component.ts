import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat-services/chat.service';
import { ThemeService } from 'src/app/core/services/theme/theme.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  userMessage: string = '';
  messages: Array<{ who: string; text: string }> = [];
  disabledInput: boolean = true;
  progressSubscription!: Subscription;
  isDarkMode: boolean = false;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;


  constructor(private chatService: ChatService, private themeService: ThemeService) {
    this.progressSubscription = this.chatService.loadProgress.subscribe(
      (progress) => {
        const arrayMessage = this.splitStringByPercentage(progress);
        let progressNumber = Number(arrayMessage?.number);
        if (progressNumber === 100) {
          this.disabledInput = false;
        }
      }
    );

    this.themeService.currentTheme.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    });
  }

  async sendMessage() {
    if (this.userMessage.trim() !== '') {
      this.messages.push({ who: 'Tú', text: this.userMessage });
  
      this.messageInput.nativeElement.value = '';
  
      const iaMessage = { who: 'IA', text: '' };
      this.messages.push(iaMessage);
  
      this.chatService.getBotResponse(this.userMessage).subscribe({
        next: (fragment) => {
          iaMessage.text += fragment;
        },
        complete: () => {
          this.userMessage = '';
          this.resetTextareaHeight();
        },
        error: (error) => {
          console.error('Error recibiendo respuesta del bot:', error);
        }
      });
    }
  }
  

  handleEnterKey(event: any): void {
    if (!event.shiftKey && !event.ctrlKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  adjustTextareaHeight(): void {
    const textarea = this.messageInput.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.overflowY = 'hidden';
    const newHeight = textarea.scrollHeight;

    if (newHeight <= 150) {
      textarea.style.height = `${newHeight}px`;
    } else {
      textarea.style.height = '150px';
      textarea.style.overflowY = 'auto';
    }
  }

  resetTextareaHeight(): void {
    const textarea = this.messageInput.nativeElement;
    textarea.style.height = 'auto';
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
