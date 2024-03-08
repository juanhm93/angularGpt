import { environment } from "environments/environment.development"



export async function* prosConsStreamUseCase (prompt: string, abortSignal: AbortSignal)  {

    // console.log('prosConsStreamUseCase')
    try {
        const response = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt}),
            signal: abortSignal
        })

        if(!response.ok) throw new Error('No se pudo realizar la comparacion')

        const reader = response.body?.getReader()
        if(!reader){
            console.log("No se pudo generar el Reader")
            throw new Error("No se pudo generar el Reader")
        }


       const decoder = new TextDecoder();
        let text = '';

        while ( true ){
            const {value, done} = await reader.read()
            
            if(done) break;

            const decodedChuck = decoder.decode(value, {stream: true});
            text += decodedChuck;
            // console.log(text)
            yield text;
        }
        
        return null

    } catch (error) {
        console.log(error)
        return null
    }

}