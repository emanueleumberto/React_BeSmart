import { useEffect } from "react"

export default function FunctionalComponentLifecycle() {

    // UseEffect invocato solo dopo il montaggio del componente
    useEffect(() => {})

    // UseEffect invocato dopo il montaggio del componente e ad ogni modifica del valore di una o più dipendenze
    useEffect(() => {}, [])

    useEffect(() => {
        // Logica da eseguire al montaggio del componente
        // Logica da eseguire ad ogni modifica delle dipendeze nella []

        return () => {
            // Logica da eseguire subito prima dello smontaggio di un componente
        }
    }, [])


    return (
        <div>FunctionalComponentLifecycle</div>
    )
}
