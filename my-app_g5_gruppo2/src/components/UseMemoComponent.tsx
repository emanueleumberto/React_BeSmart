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
//   ✅ Derivazioni di dati usati in più punti del componente
//   ✅ Valori passati come dipendenze a useEffect o useCallback
//   ❌ Calcoli semplici (somme, concatenazioni): il costo del memo supera il beneficio
//   ❌ Per ottimizzare "per precauzione": profilare prima, ottimizzare dopo

import { useMemo, useState } from "react";

interface Prodotto {
    id: number;
    nome: string;
    categoria: "elettronica" | "abbigliamento" | "alimentari";
    prezzo: number;
    disponibile: boolean;
}

type Ordinameto = "prezzo-asc" | "prezzo-desc" | "nome_asc" | "nome-desc";

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

    const [categoria, setCategoria] = useState<Prodotto["categoria"] | "tutto">("tutto");
    const [soloDisponibili, setSoloDisponibili] = useState<boolean>(false);
    const [ordinamento, setOrdinamento] = useState<Ordinameto>("prezzo-desc");

    const [contatore, setContatore] = useState<number>(0);

    // Ricalcola SOLO quando cambiano: categoria o soloDisponibili.
    // Se l'utente clicca altro, questo blocco NON viene rieseguito.
    //
    // Senza useMemo: filter() verrebbe rieseguito ad ogni render,
    // anche quando la categoria non è cambiata.
    const prodottiFiltrati = useMemo(() => {
        console.log("Filtro ricalcolato");
        return prodotti.filter(p => {
            const passaCategoria = categoria === "tutto" || p.categoria === categoria;
            const passaDisponibile = !soloDisponibili || p.disponibile;
            return passaCategoria && passaDisponibile
        })
    }, [categoria, soloDisponibili])
    // ↑ deps: [categoria, soloDisponibili]
    // React confronta questi valori con quelli del render precedente.
    // Se sono identici (===), restituisce il risultato cached.

    // Dipende da 'prodottiFiltrati' e 'ordinamento'.
    // La catena è: categoria/soloDisponibili → prodottiFiltrati → prodottiOrdinati.
    // Se il filtro non cambia, l'ordinamento non viene ricalcolato nemmeno lui.
    //
    // IMPORTANTE: [...prodottiFiltrati] crea una copia prima di ordinare.
    // Array.sort() muta l'array originale: ordinare direttamente prodottiFiltrati
    // modificherebbe il valore memoizzato, causando bug difficili da tracciare.
    const prodottiOrdinati = useMemo(() => {
        console.log("Ordinamento ricalcolato");
        return [...prodottiFiltrati].sort((a, b) => {
            switch(ordinamento) {
                case "prezzo-asc": return a.prezzo - b.prezzo;
                case "prezzo-desc": return b.prezzo - a.prezzo;
                case "nome_asc": return a.nome.localeCompare(b.nome);
                case "nome-desc": return b.nome.localeCompare(a.nome)
            }
        })
    }, [prodottiFiltrati, ordinamento])
    // ↑ deps: [prodottiFiltrati, ordinamento]
    // 'prodottiFiltrati' è un array memoizzato: il suo riferimento cambia
    // solo quando il filtro viene effettivamente ricalcolato.
    // Questo è il motivo per cui useMemo è utile anche come dipendenza.

  return (
    <div>
        <h1>UseMemoComponent {contatore}</h1>
        <button onClick={() => setContatore(c => c + 1)} >Contatore</button>
        <ul>
            {prodottiOrdinati.map(p => <li key={p.id}>
                <strong>{p.nome}</strong> €{p.prezzo} ({p.categoria}) - {p.disponibile ? "Disponibile" : "Non Disponibilie"} </li>)}
        </ul>
    </div>
  )
}
