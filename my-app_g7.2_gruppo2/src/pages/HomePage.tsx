import NavbarComponent from "../components/NavbarComponent"
import { useAuth } from "../context/AuthContext"

export default function HomePage() {

const { utente } = useAuth()

  return (
    <div>
        <NavbarComponent />
        <h1>HomePage</h1>
        {!utente ? (
            <div>
                <p>Credenziali demo admin: 'admin@example.com' - 'qwerty'</p>
                <p>Credenziali demo moderatore: 'mod@example.com' - '12345'</p>
                <p>Credenziali demo utente: 'user@example.com' - 'Pa$$w0rd!'</p>
            </div>
        ) : (
            <div>
                Utente loggato come {utente.nome} ({utente.email}) Ruolo: {utente.ruolo}
            </div>
        )}
    </div>
  )
}
