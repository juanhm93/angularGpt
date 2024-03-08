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
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([ {text: 'hola mundo', isGpt: false} ]);
  public isLoading = signal(false);
  public OpenAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    console.log({prompt})

    this.isLoading.set(true)

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      }
    ])

    this.OpenAiService.prosConsDiscusser(prompt)
    .subscribe(resp => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp.content,
        }
      ])
     
    })
  }
  // handleMessageWithFile({prompt, file}: TextMessageEvent) {
  //   console.log({prompt, file})
  // }
  // handleMessageWithSelect(event: TextMessageBoxEvent) {
  //   console.log({event})
  // }

 }
