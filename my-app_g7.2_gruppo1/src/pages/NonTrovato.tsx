import { Link, useLocation } from "react-router-dom"
import NavbarComponent from "../components/NavbarComponent"

export default function NonTrovato() {

    const location = useLocation()

  return (
    <div>
        <NavbarComponent />
        <h1>404 pagina non trovata</h1>
        <Link to="/">HomePage</Link>
    </div>
  )
}
