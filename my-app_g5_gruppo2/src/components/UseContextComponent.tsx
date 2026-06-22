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

// 2. Creazione del contesto
const UtenteContext = createContext<Utente | null>(null);

// 3. Creazione di Hook custom di controllo (best practice)
function useUtente(): Utente {
    const ctx = useContext(UtenteContext);

    if(!ctx) {
        throw new Error("useUtente is null");
    }

    return ctx;
}

//   App  →  Layout  →  Header  →  UserInfo   (consuma il Context)
//                  →  Main    →  Benvenuto  (consuma il Context)

function UserInfo() {
    
    // const utente = useContext(UtenteContext); // accesso al context senza nessun controllo dei dati null
    const utente = useUtente(); // accesso al context passando per Hook custom di controllo
    const tema = useContext(TemaContext); // accesso al context senza nessun controllo dei dati

    return (
    <div>
        <h2>UserInfo</h2>
        <p>{utente.nome} - {utente.ruolo}</p>
        <p>Tema scelto: {tema}</p>
    </div>
  )
}

function Benvenuto() {

    const utente = useUtente();

    return (
    <div>
        <h2>Benvenuto</h2>
        <p>Ciao {utente.nome} {utente.ruolo === "admin" && <span>Hai accesso alla sezione admin</span>}</p>
    </div>
  )
}

function Header() {


    return (
    <div>
        <h3>Header</h3>
        <UserInfo />
    </div>
  )
}

function Main() {
    return (
    <div>
        <h3>Main</h3>
        <Benvenuto />
    </div>
  )
}

function Layout() {

    return (
    // Layout non sa nulla dell'utente che stiamo gestendo
    // Non lo riceve tramite props e non lo passa ai suoi componenti figli tramite props
    <div>
        <h2>Layout</h2>
        <Header />
        <Main />
    </div>
  )
}

//  Creazione del secondo contesto
const TemaContext = createContext<string>("");

// App.tsx della mia applicazione
export default function UseContextComponent() {

    const [utente, setUtente] = useState<Utente>({
        nome: "Mario Rossi",
        ruolo: "user"
    })

    const [tema, setTema] = useState<string>('dark');

    function cambiaUtente() {
        setUtente(prev => 
            prev.ruolo === "user" 
            ? {nome: "Francesca Neri", ruolo: "admin"}
            : {nome: "Mario Rossi", ruolo: "user"}
        )
    }
  return (
    // value={utente} permette ad ogni componente annidato di
    // utilizzare lo stato utente chiamando l'hook custom di nome useUtente
    // Ogni componente riceverà il valore aggiornato ad ogni cambio di stato
    <TemaContext.Provider value={tema}>
        <UtenteContext.Provider value={utente}>
            <div>
                <h1>UseContextComponent</h1>
                <Layout />
                <button onClick={cambiaUtente}>Cambia Utente</button>
            </div>
        </UtenteContext.Provider>
    </TemaContext.Provider>
  )
}
