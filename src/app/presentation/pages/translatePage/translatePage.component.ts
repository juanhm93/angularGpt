import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GptMessageComponent } from '@components/chat-bubbles/gptMessage/gptMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './translatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent { 
  public messages = signal<Message[]>([ {text: 'hola mundo', isGpt: false} ]);
  public isLoading = signal(false);
  public OpenAiService = inject(OpenAiService);

  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);
  // handleMessage(prompt: string) {
  //   console.log({prompt})
  // }
  // handleMessageWithFile({prompt, file}: TextMessageEvent) {
  //   console.log({prompt, file})
  // }
  handleMessageWithSelect(event: TextMessageBoxEvent) {
    console.log({event})
    const {prompt, selectedOption} = event
    this.isLoading.set(true)

    this.messages.update(prev => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      }
    ])

    this.OpenAiService.translateText(prompt, selectedOption)
    .subscribe(resp => {
        this.isLoading.set(false)
        this.messages.update(prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
          }
        ])
      });
    
  }

}
