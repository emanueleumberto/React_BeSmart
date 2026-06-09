import { useState } from "react"

export default function FunctionalComponent({titolo, autore}) {
  // console.log(props);

  // const stato = useState('Sono uno stato');
  // console.log(stato);

  const [stato, setStato] = useState('Sono uno stato');

  return (
    // <div>{props.titolo} scritto da: {props.autore}</div>
    <div>
      <h3>{titolo} scritto da: {autore}</h3>
      {/* <p>Stato: {stato[0]}</p>
      <button onClick={() => stato[1]('Stato cambiato')}>click</button> */}
      <p>Stato: {stato}</p>
      <button onClick={() => setStato('Stato cambiato')}>click</button> 
    </div>
  )
}
