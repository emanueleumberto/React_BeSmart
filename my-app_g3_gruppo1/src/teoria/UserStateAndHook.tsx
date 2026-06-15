import { useState } from "react";

type User = {
    id: number
    name: string
    email: string
    role: "admin"|"editor"|"viewer" // literal type
    phone?: string                  // optional
    deletedAt: Date | null          // nullable
}

export default function UserStateAndHook() {

    const obj: User = {
        id: 1,
        name: "Mario Rossi",
        email: "m.rossi@example.com",
        role: "admin",
        deletedAt: null 
    }

    // Typescript inferisce il tipo di dato dal valore iniziale dello stato
    const [count, setCount] = useState(0);      //number
    const [name, setName] = useState("");      //string
    const [active, setActive] = useState(true); //boolean

    // Quando il tipo non può essere inferito: annotazione esplicita
    const [user, setUser] = useState<User | null>(obj);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Stato con tipo enum-like
    type Status = "idle" | "loading" | "success" | "error"
    const [status, setStaus] = useState<Status>("loading")

    // Stato con un oggetto complesso
    type FormState = {
        name: string
        email: string
        age: number
    }
    const [form, setForm] = useState<FormState>({name:"", email:"", age:18})

    // Aggiornamento parziale con spread
    // keyof è un operatore di tipo (type operator) introdotto in TypeScript.
    // Applicato a un tipo T, produce un union type contenente tutte le chiavi pubbliche di T.
    // È uno strumento fondamentale della programmazione generica e dei tipi condizionali.
    // keyof FormState — il parametro field può assumere esclusivamente i nomi delle proprietà 
    // definite in FormState; 
    // TypeScript genera un errore a compile-time se si passa una chiave inesistente.
    const updateField = (field: keyof FormState, value: string | number) => {
        setForm(prev => ({...prev, [field]: value}))
    }

    return (
        <div>UserStateAndHook</div>
    )
}


