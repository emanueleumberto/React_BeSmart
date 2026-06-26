import { Link } from "react-router-dom"
import NavbarComponent from "../components/NavbarComponent"

export default function Home() {
  return (
    <div>
        <NavbarComponent />
        <h1>Home</h1>
        <Link className="nav-link" to="/prodotti" >Prodotti</Link>
        <Link className="nav-link" to="/prodotti/3" state={{provenienza: "HomePage"}} >Dettaglio Prodotti</Link>
    </div>
  )
}
