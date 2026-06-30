import { createContext, useCallback, useContext, useEffect, useReducer, useState, type ReactNode } from "react"
import { dbUtenti } from "../Users"

export interface Utente {
    id: number
    nome: string 
    email: string 
    ruolo: 'admin' | 'moderatore' | 'utente'
    token: string
}

interface StatoAuth { 
    utente: Utente | null; 
    caricamento: boolean
}

type ActionAuth = 
| {type: 'LOGIN'; utente: Utente}
| {type: 'LOGOUT'; }
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
    utente: Utente | null; caricamento: boolean; errore: string | null; 
    login: (email: string, password: string) => Promise<void>; logout: () => void
} | undefined>(undefined)


export default function AuthProvider({children}: {children: ReactNode}) {

    const [stato, dispatch] = useReducer(AuthReducer, {utente: null, caricamento: true})
    const [errore, setErrore] = useState<string | null>(null)

    // Verifica del token al mount della pagina
    useEffect(() => {
        const utenteSalvato = localStorage.getItem('utente-demo')
        if(utenteSalvato){
            setTimeout(() => dispatch({type: "LOGIN", utente: JSON.parse(utenteSalvato)}), 500)
        } else {
            dispatch({type: 'CARICAMENTO', valore: false})
        }  
    }, [])

    const login = useCallback(async (email: string, password: string) => {
        setErrore(null)
        await new Promise(r => setTimeout(r, 1000)) // await apiLogin(email, password)
        
        const record = dbUtenti[email.toLowerCase()]
        if(!record || record.password !== password) {
            setErrore('Credenziali errate!!!')
            return;
        }

        const {password: _, ...utente} = record
        dispatch({type: 'LOGIN', utente})

    }, [])

    const logout = useCallback(() => dispatch({type: 'LOGOUT'}), [])


  return (
    <AuthContext.Provider value={{...stato, errore, login, logout }}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error('UseAuth not found!')
    return ctx
}


