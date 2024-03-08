import { environment } from '../../../../environments/environment.development';
import { TranslateResponse } from '@interfaces/translate.response';

export const translateTextUseCase = async (prompt: string, lang: string) => {
    try {
        const response = await fetch(`${environment.backendApi}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt, lang})
        })

        if(!response.ok) throw new Error('No se pudo realizar la traduccion')

        const {message} = await response.json() as TranslateResponse

        return {
            ok: true,
            message: message,
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo realizar la traduccion'
        }
    }
}