import { useState } from "react"

export default function FunctionalComponent({titolo, autore}) {

    // console.log(props);

    const [stato, setStato] = useState('Sono uno stato')
    const [timer, setTimer] = useState({date: new Date()})

    // console.log(stato);

    setInterval(() => {
        setTimer({date: new Date()})
    }, 1000)

    return (
        <div>
            <h3>{titolo} Scritto da: {autore}</h3>
            <p></p>
            <h3>Stato: {stato} </h3>
            <button onClick={() => setStato('Stato cambiato')} >Click</button>
            <div>Orario: {timer.date.toLocaleTimeString()}</div>
        </div>
    )
}
