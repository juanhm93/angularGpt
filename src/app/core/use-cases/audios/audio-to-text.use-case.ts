import { AudioToTextResponse } from "@interfaces/audio-text.response";
import { environment } from "environments/environment.development";


export const audioToTextUseCase = async (audioFile: File, propmt?: string) => {

    try {
        const formData = new FormData();
        formData.append('file', audioFile);

        if(propmt) {
            formData.append('prompt', propmt)
        }

        const resp = await fetch(`${environment.backendApi}/audio-to-text`, {
            method: 'POST',
            body: formData,
        })

        const data = (await resp.json())  as AudioToTextResponse

        return data;
    } catch (error) {
        console.log(error)
        return null
    }
}