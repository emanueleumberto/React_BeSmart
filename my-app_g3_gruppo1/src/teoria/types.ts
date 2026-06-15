// Tipi Base in Typescript
// i tipi principali da utilizzare in typescript sono:

// string           name: string
// number           age: number
// boolean          active: boolean
// string[]         tags: string[]
// T[]              users: User[]
// string | null    email: string | null
// string?          phone?: string
// "a" | "b"        role: "admin" | "user"
// void             onClick: () => void
// never            codice irraggiungibile

// Type -> Usato per tipizzare oggetti, union, utility
type User = {
    id: number
    name: string
    email: string
    role: "admin"|"editor"|"viewer" // literal type
    phone?: string                  // optional
    deletedAt: Date | null          // nullable
}

// Interface -> Usate principalmente per oggetti estendibili
interface Animal {
    name: string
    speak(): void
}

// Estende Animal ed eredita tutte le caratteristiche
interface Dog extends Animal {
    altro: string
}

// Union Type -> un nuovo tipo di dato che può assumere 
// solo i valori string o number
type ID = string | number

// Array
type userList = User[]
// type userList = Array<User> // sintassi equivalente

// Utility Types -> trasformano tipi di dato esistenti
type PartialUser = Partial<User>    // tutte le props sono opzionali
type ReadOnlyUser = Readonly<User>  // Tutte le props sono di sola lettura
type PickUser = Pick<User, "name" | "email"> // Restituisce un nuovo tipo di dato con le sole proprietà richieste
type OmitUser = Omit<User, "id"> // Restituisce un nuovo tipo di dato con tutte le proprietà di User escluso il campo ID

