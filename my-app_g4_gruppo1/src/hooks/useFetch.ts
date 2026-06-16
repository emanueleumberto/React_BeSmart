// Custom Hook: useFetch con Typescript
// Gestire e tipizzare chiamate ajax
// Caricamento, dati, errore, AbortController, Ricarica

import { useEffect, useState } from "react"

interface StatoFetch<T> {
    dati: T | null
    caricamento: boolean
    errore: string | null
}

export function useFetch<T>(url: string): StatoFetch<T> {

    const [stato, setStato] = useState<StatoFetch<T>>({dati: null, caricamento: true, errore: null});
    //const [contatore, setContatore] = useState(0); // Trigger di ricarica

    

    // La proprietà di sola lettura signal dell'interfaccia AbortController 
    // restituisce un'istanza dell'oggetto AbortSignal, 
    // che può essere utilizzata per comunicare e/o interrompere 
    // un'operazione asincrona a seconda delle necessità.
    useEffect(() => {

        // AbortController: annulla la fetch se il componente viene smontato
        // o se 'url' cambia prima che la risposta arrivi
        const controller = new AbortController()

        // reset immediato
        setStato({ dati: null, caricamento: true, errore: null }); 

        fetch(url, {signal: controller.signal})
        .then(response => {
            if(!response.ok) throw new Error(`Error HTTP: ${response.status}`)
            return response.json() as Promise<T>
        })
        .then(dati => setStato({dati: dati, caricamento: false, errore: null}))
        .catch(error => {
            if(error.name === 'AbortError') return // Fetch annullata: ignora il ritorno
            setStato({dati: null, caricamento: false, errore: error.message})
        })
        
        // Cleanup: annulla la fetch precedente
        return () => controller.abort()

    }, [url])

    //const ricarica = useCallback(() => setContatore(c => c + 1), [])

  return { ...stato}
}
