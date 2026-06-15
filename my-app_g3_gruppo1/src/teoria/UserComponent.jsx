
// Componente creato utilizzando JS con tutti i problemi comuni di Javascript
export default function UserComponent({user}) {
  return (
    <div>{user.nome}</div>
    // Errore emerge solo in fase di runtime
  )
}

<UserComponent user = {"Mario Rossi"} />
