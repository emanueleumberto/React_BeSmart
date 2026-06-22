// useReducer è l'alternativa a useState quando lo stato è un oggetto
// e le sue transizioni dipendono da una logica strutturata (es. switch/if).
// Separare la logica di aggiornamento (reducer) dal componente (UI)
// rende il codice più testabile e prevedibile.

import { useReducer } from "react"

// 1. Tipo di dato
// Lo stato è un oggetto tipizzato: niente "any".
// In un'app reale potrebbe contenere molti campi (es. { count, loading, error })
interface State {
    count: number
}

// Le azioni sono un "union type discriminato":
// ogni azione ha un campo 'type' univoco che il reducer usa per decidere
// cosa fare. Aggiungere una nuova azione = aggiungere un nuovo tipo qui.
// Il payload è un dato aggiuntivo che l'azione porta con sé.
// Non tutte le azioni ne hanno bisogno: INCREMENTA e DECREMENTA
// sanno già cosa fare, mentre AGGIUNGI ha bisogno di sapere "quanto".
type Action = 
| { type: "INCREMENTA"}
| { type: "DECREMENTA"}
| { type: "RESET"}
| { type: "AGGIUNGI"; payload: number}

// 2. Reducer
// Il reducer è una funzione PURA: dati gli stessi input, restituisce
// sempre lo stesso output, senza effetti collaterali.
// Firma standard: (statoCorrente, azione) => nuovoStato
function reducer(state: State, action: Action) {
    // Qui inserisco la logica di modifica dello stato
    // Fuori dal componente
    switch(action.type) {
        case "INCREMENTA":
            return {count: state.count + 1}
        case "DECREMENTA":
            // Limite inferiore: il contatore non scende sotto zero.
            // Nota: non modifichiamo mai 'state' direttamente (immutabilità).
            return {count: Math.max(0, state.count -1)}
        case "AGGIUNGI":
            // action.payload è dipsonibile solo in questo case
            return {count: Math.max(0, state.count + action.payload)}
        case "RESET":
            return {count: 0}
        default: 
            throw new Error("Azione non gestita")
    }
}

export default function UseReducerComponent() {

    const [state, dispatch] = useReducer(reducer, {count: 0})

  return (
    <div>
        <h1>UseReducerComponent</h1>
        <p>Contatore: <strong>{state.count}</strong></p>
        <button style={{margin: "0.5rem"}} onClick={() => dispatch({type: "INCREMENTA"})} >Incrementa</button>
        <button style={{margin: "0.5rem"}} onClick={() => dispatch({type: "DECREMENTA"})} >Decrementa</button>
        <button style={{margin: "0.5rem"}} onClick={() => dispatch({type: "AGGIUNGI", payload: 10})} >+10</button>
        <button style={{margin: "0.5rem"}} onClick={() => dispatch({type: "AGGIUNGI", payload: -10})} >-10</button>
        <button style={{margin: "0.5rem"}} onClick={() => dispatch({type: "RESET"})} >Reset</button>
    </div>
  )
}
