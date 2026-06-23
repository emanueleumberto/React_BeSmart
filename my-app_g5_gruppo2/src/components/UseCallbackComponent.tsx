//   1. IL PROBLEMA
//      Perché le funzioni vengono ricreate ad ogni render
//      e cosa succede quando le passiamo ai componenti figli.
//
//   2. LA SOLUZIONE
//      useCallback: come funziona, sintassi, array di dipendenze.

import { memo, useCallback, useMemo, useState } from "react"

interface Prodotto {
    id: number,
    nome: string,
    reparto: string,
    prezzo: number
}

const Prodotti = [
    { id: 1, nome: 'Monitor 27"',     reparto: 'IT',         prezzo: 450 },
    { id: 2, nome: 'Tastiera mec.',   reparto: 'IT',         prezzo: 120 },
    { id: 3, nome: 'Mouse wireless',  reparto: 'IT',         prezzo: 65  },
    { id: 4, nome: 'Sedia ergon.',    reparto: 'Logistica',  prezzo: 380 },
    { id: 5, nome: 'Scrivania reg.',  reparto: 'Logistica',  prezzo: 620 },
    { id: 6, nome: 'Webcam 4K',       reparto: 'IT',         prezzo: 95  }
]

// memo - evita che un componente figlio si ri-renderizzi se le sue props non sono cambiate.
// Dove si usa: a livello di definizione del componente.
// Nel codice, memo su RigaProdotto è inutile senza useCallback sulla funzione passata come prop, 
// perché ad ogni render del padre aggiungiAlCarrello è una nuova funzione 
// → memo fallisce il confronto.

// Rappresenta una riga della tabella prodotti.
// Ha memo perché vogliamo evitare re-render inutili.
const RigaProdotto = memo(function RigaCarrello(
    {prodotto, aggiungiAlCarrello}: 
    {prodotto: typeof Prodotti[0], aggiungiAlCarrello: (id:number) => void}) {
        console.log("RigaProdotto");
    return (
        <>
            <li>
                Prodotto: {prodotto.nome} 
                Reparto: {prodotto.reparto} 
                Prezzo: {prodotto.prezzo}
                <button onClick={() => aggiungiAlCarrello(prodotto.id)}>Add Cart</button>
            </li>
        </>
    )
})

export default function UseCallbackComponent() {

    const [ricerca, setRicerca] = useState<string>('');
    const [carrello, setCarrello] = useState<number[]>([]);

    const prodottiFiltrati = useMemo(() => Prodotti.filter(p => {
        return p.nome.toLowerCase().includes(ricerca.toLowerCase())
    }), [ricerca])

    // ❌ Questa funzione viene ricreata ad ogni tasto digitato nella barra
    // di ricerca. Ogni lettera che l'utente digita causa un render del padre,
    // che ricrea onAggiungiAlCarrello, che invalida memo su TUTTE le righe.

    // const aggiungiAlCarrello = (id: number) => {
    //     setCarrello(c => [...c, id])
    // }

    // ✅ Con useCallback: la funzione è memorizzata.
    // Quando l'utente digita nella ricerca, il padre si ri-renderizza
    // ma onAggiungiAlCarrello è sempre lo stesso oggetto → memo funziona
    // → le righe NON si ri-renderizzano per colpa della ricerca.
    const aggiungiAlCarrello = useCallback((id: number) => {
        setCarrello(c => [...c, id])
    }, [])
 
  return (
    <>
        <div>UseCallbackComponent</div>
        <input 
            type="text" 
            placeholder="Cerca prodotto" 
            value={ricerca} 
            onChange={e => setRicerca(e.target.value)} />
        <ul>
            {prodottiFiltrati.map(p => <RigaProdotto 
                                            key={p.id} 
                                            prodotto={p} 
                                            aggiungiAlCarrello={aggiungiAlCarrello} />)}
        </ul>
        <div>Carrello: {carrello.length} prodotti.</div>
    </>
  )
}
