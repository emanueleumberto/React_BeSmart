import NavbarComponent from "../components/NavbarComponent"
import { useAuth } from "../context/AuthContext"

export default function HomePage() {

  const { utente } = useAuth()

  return (
    <>
      <NavbarComponent />
      <div>HomePage</div>
      {!utente ? (
        <div>
          <p>Credenziali demo admin: 'admin@example.com' - 'qwerty'</p>
          <p>Credenziali demo moderatore: 'mod@example.com' - '12345'</p>
          <p>Credenziali demo utente: 'user@example.com' - 'Pa$$w0rd!'</p>
        </div>
      ) : (
        <div>
          Loggato come {utente?.nome} ({utente?.email}) Ruolo: {utente?.ruolo}
        </div>
      )}
    </>
  )
}
