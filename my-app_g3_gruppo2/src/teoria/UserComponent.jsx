// Componente creato con Javascript avraà tutta una serie di problemi comuni

export default function UserComponent({user}) {
  return (
    <div>UserComponent {user.nome}</div>
    // Errore emerge solo in fase di runtime
  )
}

// Errore emerge solo in fase di runtime
<UserComponent pippo= {"Mario Rossi"} />
