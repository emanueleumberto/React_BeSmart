// Utilizzo di UseRef in un componente React
// PROBLEMA CHE RISOLVE:
// In React, ogni aggiornamento di stato causa un re-render del componente.
// Esistono però due scenari in cui questo meccanismo non è quello giusto:
//
//   1. Accedere direttamente a un elemento del DOM
//      (focus, scroll, misurazioni, integrazione con librerie esterne)
//
//   2. Conservare un valore tra i render senza provocarne di nuovi
//      (timer ID, contatori interni, valori precedenti)
//
// SOLUZIONE:
// useRef restituisce un oggetto { current: T } che:
//   - persiste per tutta la vita del componente (non viene ricreato)
//   - NON causa re-render quando viene modificato
//   - se assegnato a un elemento JSX via prop 'ref', punta al nodo DOM reale

import { useRef, useState } from "react"

export default function UseRefFormComponent() {

  // CONFRONTO CHIAVE:
  //   useState  → modifica = nuovo render = UI aggiornata
  //   useRef    → modifica = nessun render = valore aggiornato in silenzio
  const [testo, setTesto] = useState("");

  // Caso d'uso più comune: ottenere un riferimento diretto a un nodo DOM
  // per operazioni che React non espone tramite props (focus, scroll, ecc.)

  // useRef<HTMLInputElement>(null) → il tipo descrive l'elemento DOM atteso.
  // Il valore iniziale è null perché al primo render il DOM non esiste ancora.
  // Dopo il mount, React assegna automaticamente inputRef.current = <input>.
  const renderText = useRef<HTMLInputElement>(null);
  const renderSelect = useRef<HTMLSelectElement>(null);

  function focusInput() {
    // inputRef.current è il nodo DOM reale: possiamo chiamare
    // qualsiasi metodo nativo (focus, blur, select, scrollIntoView…)
    // Il controllo '?.' è necessario perché TypeScript sa che può essere null.
    renderText.current?.focus()
  }

  const save = () => {
    // Leggo i dati presenti nello stato, nel campo di input e nella select comenadata con un useRef
    console.log(testo);
    console.log(renderText.current?.value);
    console.log(renderSelect.current?.value);
  }

  return (
    <div>
      <h1>Mio Form</h1>
      <input 
        value={testo}
        type="text" 
        onChange={(e) => setTesto(e.target.value)}
        placeholder="Inserisci un testo" />

      <input 
      //  La prop 'ref' è riservata da React: non viene passata come prop
      //     al componente, ma viene usata internamente per popolare inputRef.current
        ref={renderText}
        type="text" 
        placeholder="Inserisci un testo" />


      <select ref={renderSelect}>
        <option value={1}>valore 1</option>
        <option value={2}>valore 2</option>
        <option value={3}>valore 3</option>
      </select>
      <button onClick={save}>Save</button>
    </div>
  )
}
