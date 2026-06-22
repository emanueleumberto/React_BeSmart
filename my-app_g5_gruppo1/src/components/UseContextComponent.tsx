// PROBLEMA CHE RISOLVE:
// Senza Context, per passare dati (es. tema, utente loggato, lingua)
// a componenti profondi nell'albero, si è costretti al "prop drilling":
// passare le stesse props attraverso ogni livello intermedio,
// anche se quei livelli non ne hanno bisogno.
//
// SOLUZIONE:
// useContext crea un "canale diretto" tra un Provider (che possiede il dato)
// e qualsiasi componente discendente (che lo consuma),
// saltando tutti i livelli intermedi.
//
// STRUTTURA DELL'ESEMPIO:
//   App  →  Layout  →  Header  →  UserInfo   (consuma il Context)
//                  →  Main    →  Benvenuto  (consuma il Context)
//
// Nessun componente intermedio (Layout, Header, Main) riceve props:
// il dato "utente" arriva direttamente dove serve.

import { createContext, useContext, useState } from "react";


// 1. Definizione del tipo
// Tipo di dato del valore che il Context trasporterà nei componenti annidati
interface Utente {
    nome: string;
    ruolo: "admin" | "user"
}

// 2. Creazione del context
const UtenteContext = createContext<Utente | null>(null);

// 3. Creazione di Hook custom (best practice)
function useUtente(): Utente {
    const ctx = useContext(UtenteContext);

    if(!ctx) {
        throw new Error("UseUtente is null")
    }

    return ctx;
}


//   App  →  Layout  →  Header  →  UserInfo   (consuma il Context)
//                  →  Main    →  Benvenuto  (consuma il Context)
// Componente UserInfo
function UserInfo() {

    const utente = useUtente();

  return (
    <div>
        <h3>UserInfo</h3>
        <p>{utente.nome} - {utente.ruolo}</p>
    </div>
  )
}
// Componente Benvenuto
function Benvenuto() {

    const utente = useUtente();

    return (
        <div>
            <h3>Benvenuto</h3>
            <p>Ciao {utente.nome} {utente.ruolo === "admin" && (<span>Hai accesso alla sezione Admin</span>)}</p>
        </div>
    )
}
// Componente Header
function Header() {
  return (
    <div>
        <h2>Header</h2>
        <UserInfo />
    </div>
  )
}
// Componente Main
function Main() {
  return (
    <div>
        <h2>Main</h2>
        <Benvenuto />
    </div>
  )
}
// Componente Layout
function Layout() {
    // Layout non sa nulla dell'utente che stiamo gestendo
    // Non lo riceve tramite props e non lo passa ai suoi componenti figli
  return (
    <>
        <Header />
        <Main />
    </>
  )
}


// App.tsx della mia applicazione
export default function UseContextComponent() {

    const [utente, setUtente] = useState<Utente>({
        nome: "Mario Rossi",
        ruolo: "user"
    })

    function cambiaUtente() {
        setUtente((u) => 
            u.ruolo === "user" 
            ? {nome: "Francesca Neri", ruolo: "admin"}
            : {nome: "Mario Rossi", ruolo: "user"}
        );
    }

  return (
    // value={utente} permette ad ogni compnente annidato di
    // utilizzare lo stato utente chiamando l'hook custom di nome useUtente
    // Ogni componente riceverà il valore aggiornato ad ogni cambio di stato
    <UtenteContext.Provider value={utente}>
        <div>
            <h1>UseContextComponent</h1>
            <Layout />
            <button onClick={cambiaUtente}>Cambia Utente</button>
        </div>
    </ UtenteContext.Provider>
  )
}
