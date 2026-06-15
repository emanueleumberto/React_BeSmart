// Tipizzare le props è il caso d'uso più frequente di Typescript in React
// Il componente diventa autodocumentante: chi lo usa sa esattamente 
// quale dato è stato passato come argomento e come utilizzarlo

// 1: Definere il tipo di dato delle props separatamente
type UserProps = {
    name: string                    // obbligatorio
    email?: string                  // opzionale
    role: "admin"|"user"            // obbligatorio con solo uno dei due valori definiti
    age?: number                    // opzionale
    onDelete: (id: number) => void  // funzione di callback con un parametro tipizzato e senza un valore di ritorno
    children?: React.ReactNode      // Contunuto JSX annidato
}

// 2: Tipizzare le props del componente utilizzando la destrutturazione
export default function UserComponentProps({name, email, age=18, role, onDelete, children}: UserProps) {
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

// 3: Utilizzo il componente -> l'ide mi suggerisce le props disponibili
<UserComponentProps 
        name={"Mario Rossi"} 
        email={"m.rossi@example.com"}
        role={"admin"}
        onDelete={(id) => console.log(id)} />


// Errori rilevati dall'Ide
{/* <UserComponentProps />
<UserComponentProps role="admin" /> */}
