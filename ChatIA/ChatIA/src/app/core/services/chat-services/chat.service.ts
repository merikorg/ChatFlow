import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateWebWorkerMLCEngine } from '@mlc-ai/web-llm';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private engine: any;
  private messages: Array<{ role: string; content: string }> = [];
  private readonly SELECTED_MODEL = 'Llama-3.1-8B-Instruct-q4f32_1-MLC';

  public loadProgress = new BehaviorSubject<string>('Cargando...');

  constructor() {
    this.initializeEngine();
  }

  async initializeEngine() {
    try {
      const worker = new Worker(new URL('../worker/worker.worker', import.meta.url), { type: 'module' });

      this.engine = await CreateWebWorkerMLCEngine(worker, this.SELECTED_MODEL, {
        initProgressCallback: (info: any) => {
          const progressText = `${info.text}%`;
          this.loadProgress.next(progressText);
          if (info.progress === 1) {
            this.loadProgress.next('Modelo cargado');
          }
        },
      });
    } catch (error) {
      console.error('Error inicializando el motor:', error);
      this.loadProgress.next('Error al cargar el modelo');
    }
  }

  getBotResponse(userMessage: string): Observable<string> {
    return new Observable<string>((observer) => {
      if (!this.engine) {
        observer.error('El motor no está inicializado.');
        return;
      }

      this.messages.push({ role: 'user', content: userMessage });

      this.engine.chat.completions.create({
        messages: this.messages,
        stream: true, // Stream para recibir fragmentos de la respuesta
      }).then(async (chunks: any) => {
        let reply = '';

        try {
          // Procesar cada fragmento de la respuesta
          for await (const chunk of chunks) {
            const choice = chunk.choices[0];
            const content = choice?.delta?.content ?? '';
            reply += content;

            // Emitir el fragmento actual a los observadores
            observer.next(content);
          }

          // Una vez completada la respuesta, agregarla al historial de mensajes
          this.messages.push({
            role: 'assistant',
            content: reply,
          });

          // Completar el observable
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }
}
