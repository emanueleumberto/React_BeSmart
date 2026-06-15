type User = {
    id: number
    name: string
    email: string
}

const obj: User = {
    id: 1,
    name: 'Mario Rossi',
    email: 'm.rossi@example.com'
}

// Componente tipizzato tramite Typescript rileva immediatamente errori di tipo diverso da quello che ho utilizzato
export default function UserComponent({user}: {user: User}) {
  return (
    // Errore immediato nell'ide di riferimento
    <div>UserComponent {user.name}</div>
  )
}

<UserComponent user={obj} />
{/* <UserComponent user={objGenerico} />
<UserComponent txt={"Ciao a tutti"} /> */}
