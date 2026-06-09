import { useEffect } from "react"

export default function FunctionalComponentLifecycle() {

    // UseEffect invocato solo dopo il montaggio del componente
    useEffect(()=> {
        console.log('UseEffect invocato solo dopo il montaggio del componente');
    })

    // UseEffect invocato solo dopo il montaggio del componente e ogni volta che cambia una dipendenza
    useEffect(()=> {
        console.log('UseEffect invocato dopo il montaggio del componente e ogni volta che cambia la dipendenza dip');
    }, [dip])

    // UseEffect invocato solo dopo il montaggio del componente e ogni volta che cambia una dipendenza
    useEffect(()=> {
        // Logica da eseguire al montaggio del componente
        // Logica da eseguire ad ogni modifica della dipendenza inserita nelle []

        return () => {
            // Logica da eseguire subito prima dello smontaggio di un componente
        }
    }, [])


    


  return (
    <div>FunctionalComponentLifecycle</div>
  )
}
