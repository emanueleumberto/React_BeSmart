import NavbarComponent from "../components/NavbarComponent"
import { useAuth } from "../context/AuthContext"

export default function Profile() {

    const {utente} = useAuth()

  return (
    <div>
        <NavbarComponent />
        <h1>Profile</h1>
        <ul>
            <li>Utente: {utente?.nome}</li>
            <li>Email: {utente?.email}</li>
            <li>Ruolo: {utente?.ruolo}</li>
        </ul>
    </div>
  )
}
