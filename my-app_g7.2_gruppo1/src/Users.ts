import type { Utente } from "./context/AuthContext";

export const dbUtenti: Record<string, {password: string} & Utente> = {
    'admin@example.com': {id: 1, nome: "Mario Rossi", email: 'admin@example.com', token: 'tokenok', ruolo: "admin", password: 'qwerty'},
    'mod@example.com': {id: 2, nome: "Francesca Neri", email: 'mod@example.com', token: 'tokenok', ruolo: "moderatore", password: '12345'},
    'user@example.com': {id: 3, nome: "Giuseppe Verdi", email: 'user@example.com', token: 'tokenok', ruolo: "utente", password: 'Pa$$w0rd!'}
}