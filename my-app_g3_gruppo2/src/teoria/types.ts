// Tipi di base in Typescript

// string           name: string
// number           age: number
// boolean          active: boolean
// string[]         tags: string[]
// T[]              users: users[]
// string | null    email: string | null
// string?          phone?: string
// "a" | "b"        role: "admin" | "user"
// void             onClick: () => void
// never            codice irraggiungibile

// Type -> Usato per tipizzare Oggetti, union, utility
type User = {
    id: number
    name: string
    email: string
    role: "admin" | "editor" | "viewer"
    phone?: string
    deletedAt: Date | null
}

// Interface -> Usata principalmente per oggetti estensibili
interface Animal {
    name: string
    speak(): void
}

// Estende Animal ed eredita tutte le caratteristiche
interface Dog extends Animal {
    altro: string
}

// Union type -> un nuovo tipo di dato che può assumere tipi diversi
type ID = string | number

// Array
type UserArr = User[]
//type UserArr = Array<User> // Sintassi equivalente

// Utility Types -> trasformano tipi di dato esistenti
type PartialUser = Partial<User> // tutte le prop sono opzionali
type ReadOnlyUser = Readonly<User> // tutte le prop sono di sola lettura
type PickUser = Pick<User, "name" | "email"> // Restituisce un nuovo tipo di dato cone le sole proprietà richieste
type OmitUser = Omit<User, "id"> // Restituisce un nuovo tipo di dato con tutte le proprietà escluse quelle defininte
