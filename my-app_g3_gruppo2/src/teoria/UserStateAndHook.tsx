import { use, useState } from "react"

type User = {
    id: number
    name: string
    email: string
    role: "admin" | "editor" | "viewer"
    phone?: string
    deletedAt: Date | null
}

export default function UserStateAndHook() {

    // Typescript inferisce il tipo di dato dal valore usato per inizializzare lo stato
    const [count, setCount] = useState(0)
    const [name, setName] = useState("")
    const [active, setActive] = useState(true)

    // Quando il tipo non può essere inferito, annotazione esplicita
    const [user, setUser] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [error, setError] = useState<string | null>(null)

    // Stato con tipo enum-like
    type Status = "idle" | "loading" | "success" | "error"
    const [status, setStatus] = useState<Status>("loading")

    type FormState = {
        name: string
        email: string
        age: number
    }
    const [form, setForm] = useState<FormState>({name:"", email:"", age: 18})

    const updateEmail = (field: keyof FormState, value: string | number) => {
        setForm(prev => ({...prev, [field]: value}))
    }

    return (
        <div>UserStateAndHook</div>
    )
}

