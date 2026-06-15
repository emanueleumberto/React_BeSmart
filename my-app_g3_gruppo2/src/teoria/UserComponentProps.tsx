// Tipizzare le props è il caso d'uso più frequente di Typescript in React
// Il componente diventa autodocumentante: chi lo usa sa esattamente 
// quale dato è stato passato come argomento e come utilizzarlo

// 1: Definire il tipo di dato della props separatamente
type UserProps = {
    name: string
    email?: string
    role: "admin" | "user"
    age?: number
    onDelete: (id:number) => void
    children?: React.ReactNode
}

// 2: Tipizzare le props del componente utilizzando la destrutturazione
export default function UserComponentProps({name, email, role, age=18, onDelete, children}: UserProps) {
  return (
    <div>
        <h2>Ciao, {name}</h2>
        <p>-- {email} --</p>
        <span>{role} - {age} anni</span>
        <button onClick={() => onDelete(1)}>Elimina</button>
        {children}
    </div>
  )
}

// 3: Utilizzare il componente -> l'ide mi suggerisce le props disponibili
<UserComponentProps 
    name={"Mario Rossi"}
    email={"m.rossi@example.com"}
    role={"admin"}
    onDelete={(id) => console.log(id)} />

