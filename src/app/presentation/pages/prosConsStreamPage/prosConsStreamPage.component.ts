import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GptMessageComponent } from '@components/chat-bubbles/gptMessage/gptMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {

  public messages = signal<Message[]>([ {text: 'hola mundo', isGpt: false} ]);
  public isLoading = signal(false);
  public OpenAiService = inject(OpenAiService);

  public abortSignal = new AbortController()

  async handleMessage(prompt: string) {
    console.log({prompt})

    this.abortSignal.abort()
    this.abortSignal = new AbortController()
    
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      },
      {
        isGpt: true,
        text: prompt,
      }
    ])
    
    this.isLoading.set(true)
   const stream = this.OpenAiService.prosConsDiscusserStream(prompt, this.abortSignal.signal)
     this.isLoading.set(false)
   for await (const text of stream) {
    // console.log(text)
    this.handleStreamResponse(text)
   }
  }


  handleStreamResponse(message: string){
    this.messages().pop();

    const messages = this.messages();

    this.messages.set([...messages, {isGpt: true, text: message }])

  }
 }
