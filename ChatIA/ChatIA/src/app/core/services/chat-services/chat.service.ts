import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreateWebWorkerMLCEngine } from '@mlc-ai/web-llm';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private progressSubject = new BehaviorSubject<number>(0);
  progress$ = this.progressSubject.asObservable();

  engine: any;
  private SELECTED_MODEL = 'Llama-3.1-8B-Instruct-q4f32_1-MLC';

  constructor() {
    this.initializeEngine();
  }

  async initializeEngine() {
    this.engine = await CreateWebWorkerMLCEngine(
      new Worker('./assets/js/worker.js', { type: 'module' }),
      this.SELECTED_MODEL,
      {
        initProgressCallback: (info) => {
          this.progressSubject.next(info.progress * 100);
        }
      }
    );

    this.progressSubject.next(100);
  }

  async sendMessage(userMessage: string) {
    const messages = this.messagesSubject.getValue();

    messages.push({ role: 'user', content: userMessage });
    this.messagesSubject.next(messages);

    const chunks = await this.engine.chat.completions.create({
      messages,
      stream: true
    });

    let replay = '';
    for await (const chunk of chunks) {
      const choice = chunk.choices[0];
      const content = choice?.delta?.content ?? '';
      replay += content;

      messages.push({
        role: 'assistant',
        content: replay
      });
      this.messagesSubject.next([...messages]);
    }
  }
}
