// useReducer è l'alternativa a useState quando lo stato è un oggetto
// e le sue transizioni dipendono da una logica strutturata (es. switch/if).
// Separare la logica di aggiornamento (reducer) dal componente (UI)
// rende il codice più testabile e prevedibile.

import { useReducer, useRef } from "react"

// 1. Tipo di stato
interface State {
    count: number
}

type Action = 
| {type: "INCREMENTA"}
| {type: "DECREMENTA"}
| {type: "RESET"}
| {type: "AGGIUNGI", payload: number}

function reducer(state: State, action: Action) {
    switch(action.type) {
        case "INCREMENTA":
            return {count: state.count + 1}
        case "DECREMENTA":
            return {count: Math.max(0, state.count - 1)}
        case "RESET":
            return {count: 0}
        case "AGGIUNGI":
            return {count: Math.max(0, state.count + action.payload)}
        default:
            throw new Error("Azione non consentita")
    }
}

export default function UseReducerComponent() {

    const [state, dispath] = useReducer(reducer, {count: 0})
    const inputRef = useRef<HTMLInputElement>(null);

    function aggiungiDaInput() {
        const valore = Number(inputRef.current?.value);
        if(isNaN(valore) || valore === 0) return

        dispath({type: "AGGIUNGI", payload: valore})

        if(inputRef.current) inputRef.current.value = ""
    }

    function gestisciEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === "Enter") aggiungiDaInput()
    }

    return (
        <div>
            <h1>UseReducerComponent</h1>
            <p>Contatore: {state.count}</p>
            <button style={{margin: "0.5rem"}} onClick={() => dispath({type: "INCREMENTA"})}>Incrementa</button>
            <button style={{margin: "0.5rem"}} onClick={() => dispath({type: "DECREMENTA"})}>Decrementa</button>
            <button style={{margin: "0.5rem"}} onClick={() => dispath({type: "AGGIUNGI", payload: 10})}>+10</button>
            <button style={{margin: "0.5rem"}} onClick={() => dispath({type: "AGGIUNGI", payload: -10})}>-10</button>          
            <button style={{margin: "0.5rem"}} onClick={() => dispath({type: "RESET"})}>Reset</button>
        
            <input ref={inputRef} onKeyDown={gestisciEnter} type="number" defaultValue="" />
            <button style={{margin: "0.5rem"}} onClick={aggiungiDaInput}>Aggiungi</button>
        </div>
    )
}
