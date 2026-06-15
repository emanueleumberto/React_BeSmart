type User = {
    id: number
    name: string
    email: string
}


// Componente tipizzato tramite Typescript che rileva immediatamente errori di tipizzazione
export default function UserComponent({user}: {user: User}) {
  return (
    // Errore immediato nell'ide di riferimento
    <div>UserComponent {user.nome}</div>
  )
}

// Errore immediato nell'ide di riferimento
<UserComponent user={"Mario Rossi"} />
