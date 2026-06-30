import NavbarComponent from "../components/NavbarComponent";
import { useAuth } from "../context/AuthContext";

export default function NotAuthPage() {

    const {utente} = useAuth()

  return (
    <div>
        <NavbarComponent />
        <h1>NotAuthPage</h1>
        <p>{utente?.nome} - Il tuo ruolo è {utente?.ruolo}</p>
    </div>
  )
}
