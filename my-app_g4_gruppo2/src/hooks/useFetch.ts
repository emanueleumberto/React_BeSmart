// Custom Hook: useFetch con Typescript
// Gestire e tipizzare chiamate ajax
// Caricamento, dati, errore, AbortController, Ricarica

import { useEffect, useState } from "react"

interface StatoFetch<T> {
    dati: T | null
    caricamento: boolean
    error: string | null
}

export default function useFetch<T>(url: string) : StatoFetch<T> {

    const [state, setStato] = useState<StatoFetch<T>>({dati: null, caricamento: true, error: null});

    useEffect(()=> {

        // Reset immediato dello stato
        setStato({dati: null, caricamento: true, error: null})

        // Oggetto che annulla la fetch se il componente viene smontato 
        // o se l'url cambia prima che la risposta arrivi
        const controller = new AbortController();


            // La proprietà di sola lettura signal dell'interfaccia AbortController 
            // restituisce un'istanza dell'oggetto AbortSignal, 
            // che può essere utilizzata per comunicare e/o interrompere 
            // un'operazione asincrona a seconda delle necessità.
        fetch(url, {signal: controller.signal})
            .then(response => {
                if(!response.ok) throw new Error('Error HTTP')
                return response.json() as Promise<T>
            })
            .then(dati => setStato({dati: dati, caricamento: false, error: null}))
            .catch(error => {
                if(error.name === 'AbortError') return 
                setStato({dati: null, caricamento: false, error: error.message})
            })

        // Cleanup: annulla la fetch precedente
        return () => controller.abort()

    }, [url])


  return state
}
