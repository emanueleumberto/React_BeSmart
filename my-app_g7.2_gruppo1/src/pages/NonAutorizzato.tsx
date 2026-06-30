import NavbarComponent from "../components/NavbarComponent"
import { useAuth } from "../context/AuthContext"

export default function NonAutorizzato() {

    const { utente } = useAuth()

  return (
    <div>
        <NavbarComponent />
        <h1>Accesso non autorizzato</h1>
        <p>{utente?.nome} - Il tuo ruolo è {utente?.ruolo}</p>
    </div>


  )
}
