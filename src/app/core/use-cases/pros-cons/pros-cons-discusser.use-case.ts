import { environment } from '../../../../environments/environment.development';
import { ProsConsResponse } from '@interfaces/pros-cons.response';

export const prosConsDiscusserUseCase = async (prompt: string) => {
    try {
        const response = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        })

        if(!response.ok) throw new Error('No se pudo realizar la comparacion')

        const data = await response.json() as ProsConsResponse

        return {
            ok: true,
            ...data,
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            role: "assistant",
            content: 'No se pudo realizar la comparacion'
        }
    }
}