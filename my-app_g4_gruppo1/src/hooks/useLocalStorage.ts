// Custom Hook: useLocalStorage con Typescript
// Persistere valori nel LocalStorage del browser

import { useEffect, useState } from "react"

export default function useLocalStorage<T>(chiave: string, valoreIniziale: T) {

    const [valore, setValore] = useState<T>(() => {
        // Funzione di inizializzazione lazy: eseguita solo al primo render
        try {
            const salvalto = localStorage.getItem(chiave)
            return salvalto ? (JSON.parse(salvalto)) : valoreIniziale
        } catch {
            return valoreIniziale
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(chiave, JSON.stringify(valore))
        } catch {
            console.warn('Impossibile salvare nel localStorage del device', chiave);
        }
    }, [chiave, valore])

  // Firma indentica a useState per facilità di utilizzo
  return [valore, setValore] as const
}
