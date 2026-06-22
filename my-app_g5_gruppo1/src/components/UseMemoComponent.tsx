// PROBLEMA CHE RISOLVE:
// Ad ogni re-render React riesegue tutto il corpo del componente,
// incluse funzioni potenzialmente costose (filtri, ordinamenti, calcoli).
// Se il risultato dipende da dati che non sono cambiati, ricalcolarlo
// è uno spreco: produce lo stesso output ad ogni render inutilmente.
//
// SOLUZIONE:
// useMemo(fn, [deps]) memorizza il risultato di una computazione.
// React lo ricalcola SOLO quando almeno una dipendenza cambia.
// Tra un render e l'altro, restituisce il valore cached senza rieseguire fn.
// QUANDO USARLO (e quando no):
//   ✅ Calcoli costosi su array grandi (filtri, sort, aggregazioni)
//   ✅ Derivazioni di dati usate in più punti del componente
//   ✅ Valori passati come dipendenze a useEffect o useCallback
//   ❌ Calcoli semplici (somme, concatenazioni): il costo del memo supera il beneficio
//   ❌ Per ottimizzare "per precauzione": profilare prima, ottimizzare dopo

import { useMemo, useState } from "react";

interface Prodotto {
    id: number;
    nome: string;
    categoria: "elettronica" | "abbigliamento" | "alimentari";
    prezzo: number;
    disponibile: boolean
}

type Ordinamento = "prezzo-asc" | "prezzo-desc" | "nome-asc" | "nome-desc"

// Dichiarati fuori dal componente: sono costanti, non cambiano mai.
// Tenerli fuori evita che vengano ricreati ad ogni render.
const prodotti: Prodotto[] = [
    { id: 1, nome: "Laptop Pro",        categoria: "elettronica",   prezzo: 1299, disponibile: true  },
    { id: 2, nome: "T-Shirt Classic",   categoria: "abbigliamento", prezzo: 29,   disponibile: true  },
    { id: 3, nome: "Smartphone X",      categoria: "elettronica",   prezzo: 899,  disponibile: false },
    { id: 4, nome: "Pasta Artigianale", categoria: "alimentari",    prezzo: 4,    disponibile: true  },
    { id: 5, nome: "Cuffie Wireless",   categoria: "elettronica",   prezzo: 199,  disponibile: true  },
    { id: 6, nome: "Giacca Invernale",  categoria: "abbigliamento", prezzo: 189,  disponibile: true  },
    { id: 7, nome: "Olio EVO",          categoria: "alimentari",    prezzo: 12,   disponibile: true  },
    { id: 8, nome: "Tablet Ultra",      categoria: "elettronica",   prezzo: 649,  disponibile: false },
    { id: 9, nome: "Jeans Slim",        categoria: "abbigliamento", prezzo: 79,   disponibile: true  },
    { id: 10, nome: "Caffè Arabica",    categoria: "alimentari",    prezzo: 8,    disponibile: true  }
]

export default function UseMemoComponent() {

    const [categoria, setCategoria] = useState<Prodotto["categoria"] | "tutte">("tutte");
    const [ordinamento, setOrdinamento] = useState<Ordinamento>("nome-asc");
    const [soloDisponibili, setSoloDisponibili] = useState(false);

    const [contatore, setContatore] = useState(0);

    // Ricalcola SOLO quando cambiano: categoria o soloDisponibili.
    // Se l'utente clicca altro, questo blocco NON viene rieseguito.
    //
    // Senza useMemo: filter() verrebbe rieseguito ad ogni render,
    // anche quando la categoria non è cambiata.
    const prodottiFiltrati = useMemo(() => {
        console.log("Filtro ricalcolato");
        return prodotti.filter(p => {
            const passaCategoria   = categoria === "tutte" || p.categoria === categoria;
            const passaDisponibile = !soloDisponibili || p.disponibile; // Visualizza tutti o solo disponibili
            return passaCategoria && passaDisponibile;
        })

    }, [categoria, soloDisponibili])
    // ↑ deps: [categoria, soloDisponibili]
    // React confronta questi valori con quelli del render precedente.
    // Se sono identici (===), restituisce il risultato cached.

  return (
    <div>
        <h1>UseMemoComponent</h1>
        <ul>
            {prodottiFiltrati.map(p => <li key={p.id}><strong>{p.nome}</strong> - € {p.prezzo} ({p.categoria}) {p.disponibile ? "Disponibile" : "Non Disponibile"} </li>)}
        </ul>
    </div>
  )
}
