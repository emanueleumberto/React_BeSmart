import { createContext, useCallback, useEffect, useReducer, useState, type ReactNode } from "react";
import { dbUser } from "../users";

export interface Utente {
    id: number;
    nome: string;
    email: string;
    ruolo: 'admin' | 'moderatore' | 'utente',
    token: string
}

interface StatoAuth {
    utente: Utente | null;
    caricamento: boolean
}

type ActionAuth = 
| {type: 'LOGIN'; utente: Utente}
| {type: 'LOGOUT';}
| {type: 'CARICAMENTO'; valore: boolean}

function AuthReducer(stato: StatoAuth, action: ActionAuth): StatoAuth {
    switch(action.type) {
        case "LOGIN":
            localStorage.setItem('token', action.utente.token)
            localStorage.setItem('utente-demo', JSON.stringify(action.utente))
            return {utente: action.utente, caricamento: false}
        case "LOGOUT":
            localStorage.removeItem('token')
            localStorage.removeItem('utente-demo')
            return {utente: null, caricamento: false}
        case "CARICAMENTO":
            return {...stato, caricamento: action.valore}
    }
}

const AuthContext = createContext<{
    utente: Utente | null; caricamento: boolean; errore: string | null
    login: (email: string, password: string) => Promise<void>; logout: () => void
} | undefined>(undefined)

export function AuthProvider({children}:{children: ReactNode}) {
    const [stato, dispatch] = useReducer(AuthReducer, {utente: null, caricamento: true})
    const [errore, setErrore] = useState<string | null>(null)

    useEffect(() => {
        const utenteSalvato = localStorage.getItem('utente-demo')
        if(utenteSalvato) {
            // in produzione verificare il token -> dispatch({type: "LOGIN", utente: JSON.parse(utenteSalvato)
            setTimeout(() => dispatch({type: "LOGIN", utente: JSON.parse(utenteSalvato)}), 500)
        } else {
            dispatch({type: "CARICAMENTO", valore: false})
        }
    }, [])

    const login = useCallback(async (email: string, password: string) => {
        await new Promise(r => setTimeout(r, 1000)) // await apiLogin(email, password)
        const record = dbUser[email.toLowerCase()]
        if(!record || record.password !== password){ setErrore('Credenziali non valide!!!'); return} 
        // tolgo la password dall'oggetto per non salvarlo nel localstorage
        const {password: _, ...utente} = record 
        dispatch({type: "LOGIN", utente: utente})
    }, [])

    const logout = useCallback(() => {
        dispatch({type: "LOGOUT"})
    }, [])


    return (
        <AuthContext.Provider value={{...stato, errore, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

