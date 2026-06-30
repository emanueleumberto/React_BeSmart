export interface Post {
    id: number
    title: string
    body: string
    userId: number
}

export interface NuovoPost {
    title: string
    body: string
    userId: number
}

export interface Utente {
    id: number
    name: string
    username: string
    email: string
    phone: string
    website: string
    address: {city: string, street: string},
    company: {name: string, catchPhrase: string}
}

export type StatoRichiesta<T> = 
| {type: 'idle'}
| {type: 'loading'}
| {type: 'success'; data: T}
| {type: 'error'; message: string; status?: number}