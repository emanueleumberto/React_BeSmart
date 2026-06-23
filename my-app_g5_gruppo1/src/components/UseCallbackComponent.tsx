// INDICE (naviga con le tab in alto):
//
//   1. IL PROBLEMA
//      Perché le funzioni vengono ricreate ad ogni render
//      e cosa succede quando le passiamo ai componenti figli.
//
//   2. LA SOLUZIONE
//      useCallback: come funziona, sintassi, array di dipendenze.

import { memo, useCallback, useState } from "react"

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
const RigaProdotto = memo(function RigaProdotto(
    { prodotto, aggiungiAlCarrello} : 
    { prodotto: typeof Prodotti[0]; aggiungiAlCarrello: (id: number) => void }) {
        console.log(`🔁 RigaProdotto re-render: ${prodotto.nome}`);
        return (
            <div>
                <p>
                    Prodotto: {prodotto.nome} - 
                    Reparto: {prodotto.reparto} 
                    Prezzo: €{prodotto.prezzo} 
                    <button onClick={() => aggiungiAlCarrello(prodotto.id)}>Add</button>
                </p>
            </div>
        )
    })


// Versione senza UseCallback
function CatalogoSenzaCallback() {
    const [ricerca, setRicerca] = useState<string>('');
    const [carrello, setCarrello] = useState<number[]>([])

    const prodottiFiltrati = Prodotti.filter(p => {
        return p.nome.toLowerCase().includes(ricerca.toLowerCase())
    })

    // ❌ Questa funzione viene ricreata ad ogni tasto digitato nella barra
    // di ricerca. Ogni lettera che l'utente digita causa un render del padre,
    // che ricrea onAggiungiAlCarrello, che invalida memo su TUTTE le righe.
    const aggiungiAlCarrello = (id: number) => {
        setCarrello(c => [...c, id])
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Cerca prodotto..." 
                value={ricerca}
                onChange={e => setRicerca(e.target.value)} />

            {prodottiFiltrati.map(p => <RigaProdotto 
                                            key={p.id} 
                                            prodotto={p} 
                                            aggiungiAlCarrello={aggiungiAlCarrello} />)}
            <div>Carrello: {carrello.length} prodotti.</div>
        </div>
    )

}

// Versione con UseCallback
function CatalogoConCallback() {
    const [ricerca, setRicerca] = useState<string>('');
    const [carrello, setCarrello] = useState<number[]>([])

    const prodottiFiltrati = Prodotti.filter(p => {
        return p.nome.toLowerCase().includes(ricerca.toLowerCase())
    })

    // ✅ Con useCallback: la funzione è memorizzata.
    // Quando l'utente digita nella ricerca, il padre si ri-renderizza
    // ma onAggiungiAlCarrello è sempre lo stesso oggetto → memo funziona
    // → le righe NON si ri-renderizzano per colpa della ricerca.
    const aggiungiAlCarrello = useCallback((id: number) => {
        setCarrello(c => [...c, id])
    }, [])

    return (
        <div>
            <input 
                type="text" 
                placeholder="Cerca prodotto..." 
                value={ricerca}
                onChange={e => setRicerca(e.target.value)} />

            {prodottiFiltrati.map(p => <RigaProdotto 
                                            key={p.id} 
                                            prodotto={p} 
                                            aggiungiAlCarrello={aggiungiAlCarrello} />)}
            <div>Carrello: {carrello.length} prodotti.</div>
        </div>
    )
}

export default function UseCallbackComponent() {
  const [modalita, setModalita] = useState<'senza' | 'con'>('senza');
    return (
        <>
            <button onClick={() => setModalita('senza')}>❌ Senza useCallback</button>
            <button onClick={() => setModalita('con')}>✅ Con useCallback</button>
            {modalita === 'senza' ? <CatalogoSenzaCallback /> : <CatalogoConCallback />}
        </>
    )
}
