import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GptMessageComponent } from '@components/chat-bubbles/gptMessage/gptMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { AudioToTextResponse } from '../../../interfaces/audio-text.response';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GptMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent { 

  public messages = signal<Message[]>([ {text: 'hola mundo', isGpt: false} ]);
  public isLoading = signal(false);
  public OpenAiService = inject(OpenAiService);

 
  handleMessageWithFile({prompt, file}: TextMessageEvent) {
    console.log({prompt, file})

    const text = prompt ?? file.name ?? 'traduce el audio'
    this.isLoading.set(true);
    
    this.messages.update(prev => [...prev, {isGpt: false, text: text}])

    this.OpenAiService.audioToText(file,text)
    .subscribe(resp => this.handleResponse(resp))

  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading.set(false)

    if(!resp ) return;

    const text = `## Transcripcion: 
   __Duracion:__${Math.round(resp.duration)} segundos.
  
   ## El texto es:
    ${resp.text}
    `;
    this.messages.update(prev => [...prev, {isGpt: true, text: text}]);
    
    for(const segment of resp.segments){
      const segmentMessage = `
      __De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos.__
      ${segment.text}
      `
      this.messages.update(prev => [...prev, {isGpt: true, text: segmentMessage}]);
    }
    

  }
 
}
