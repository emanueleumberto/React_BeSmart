//   useReducer → gestisce la logica di transizione dello stato (count)
//   useRef     → accede al valore dell'input senza causare re-render

import { createContext, useReducer, useRef } from "react";

interface State {
    count: number
}

type Action = 
| { type : "INCREMENTA" }
| { type : "DECREMENTA" }
| { type : "RESET" }
| { type : "AGGIUNGI"; payload: number }

function reducer(state: State, action: Action) {
  switch(action.type) {
    case "INCREMENTA":
      return {count: state.count + 1}
    case "DECREMENTA":
      return {count: Math.max(0, state.count -1)}
    case "RESET":
      return {count: 0}
    case "AGGIUNGI":
      return {count: Math.max(0, state.count + action.payload)}
    default: 
            throw new Error("Azione non gestita")
  }

}

interface Counter {
    count: number
}

const CounterContext = createContext<Counter | null>(null);

function MioInputComponent({inputRef, getisciEnter, aggiungiDaInput}) {
return (
  <div>
          <input 
            ref={inputRef} 
            type="number" 
            defaultValue=""
            onKeyDown={getisciEnter}
            placeholder="Inserisci un valore numerico valido (es. 5 o -3)" />
            <button onClick={aggiungiDaInput}>Aggiungi un valore</button>
        </div>
)
}

function MioDisplayComponent({state}) {
  return (
    <p>Contatore: <strong>{state.count}</strong></p>
  )
}

export default function UseRefAndReducerComponent() {

  const [state, dispatch] = useReducer(reducer, {count: 0});
  const inputRef = useRef<HTMLInputElement>(null);

  function aggiungiDaInput() {
    const valore = Number(inputRef.current?.value);
    if(isNaN(valore) || valore === 0) return

    dispatch({type: "AGGIUNGI", payload: valore})

    if(inputRef.current) inputRef.current.value = "";
  }

  function getisciEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") aggiungiDaInput()
  }

  return (
    <div>
        <h1>UseRefAndReducerComponent</h1>
        <MioDisplayComponent state={state} />
        <button style={{margin: "0.5rem"}} onClick={() => dispatch({type: "INCREMENTA"})} >Incrementa</button>
        <button style={{margin: "0.5rem"}} onClick={() => dispatch({type: "DECREMENTA"})} >Decrementa</button>
        <button style={{margin: "0.5rem"}} onClick={() => dispatch({type: "RESET"})} >Reset</button>
        <MioInputComponent inputRef={inputRef} getisciEnter={getisciEnter} aggiungiDaInput={aggiungiDaInput}  />
    </div>
  )
}
