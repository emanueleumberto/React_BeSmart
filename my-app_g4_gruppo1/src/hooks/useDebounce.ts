// Custom Hook: useDebounce con Typescript
// Aspetta che l'utente smetta di scrivere prima di aggiornare il valore
// Utile per tutti gli input utilizzati di frequente

import { useEffect, useState } from "react"

export default function useDebounce<T>(valore: T, ritardo: number = 500): T {

    const [valoreDebounce, setValorDebounce] = useState<T>(valore)

    useEffect(() => {
        // Imposto un timer che aggiorna il valore dopo 'ritardo' passato come paramentro
        const timer = setTimeout(() => {
            setValorDebounce(valore)
        }, ritardo)

        // Cleanup: cancella il timer precedente se 'valore' cambia
        // (l'utente sta ancora scrivendo)
        return () => clearTimeout(timer)

    }, [valore, ritardo])


  return valoreDebounce
}
