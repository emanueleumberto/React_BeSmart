import type { Utente } from "./context/AuthContext";

// in produzione sostituire con chiamata POST /api/login
export const dbUser: Record<string, Utente & {password: string}> = {
    'admin@example.com': {id: 1, nome: "Mario Rossi", email: 'admin@example.com', ruolo: 'admin', password: 'qwerty', token: 'myToken123'},
    'mod@example.com': {id: 2, nome: "Francesca Neri", email: 'mod@example.com', ruolo: 'moderatore', password: '12345', token: 'myToken123'},
    'user@example.com': {id: 3, nome: "Giuseppe Verdi", email: 'user@example.com', ruolo: 'utente', password: 'Pa$$w0rd!', token: 'myToken123'}
}