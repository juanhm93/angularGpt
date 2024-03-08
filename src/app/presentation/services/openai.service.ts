import { Injectable } from '@angular/core';
import { audioToTextUseCase } from '@use-cases/audios/audio-to-text.use-case';
import { textToAudioUseCase } from '@use-cases/audios/text-to-audio.use-case';
import { orthographyUseCase } from '@use-cases/orthography/orthography.use-case';
import { prosConsDiscusserUseCase } from '@use-cases/pros-cons/pros-cons-discusser.use-case';
import { prosConsStreamUseCase } from '@use-cases/pros-cons/pros-cons-stream.use-case';
import { translateTextUseCase } from '@use-cases/translate/translate.use-case';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    
    checkOrthography(prompt: string) {
        return from(orthographyUseCase(prompt))
    }
    prosConsDiscusser(prompt: string) {
        return from(prosConsDiscusserUseCase(prompt))
    }
    prosConsDiscusserStream(prompt: string, abortSignal: AbortSignal) {
        return prosConsStreamUseCase(prompt, abortSignal)
    }
    translateText(prompt: string, lang: string) {
        return from(translateTextUseCase(prompt, lang))
    }
    textToAudio(prompt: string, voice: string) {
        return from(textToAudioUseCase(prompt, voice))
    }
    audioToText(file: File, prompt?: string) {
        return from(audioToTextUseCase(file, prompt))
    }
    
}