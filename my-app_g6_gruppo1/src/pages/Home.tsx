import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

export default function Home() {
  return (
    <>
        <NavbarComponent />
        <div>
          <h1>Home Page</h1>
          <Link className="nav-link" to="/prodotti">Prodotti page</Link>
          <Link className="nav-link" to="/prodotti/5" state={{provenienza: "HomePage"}}>Dettaglio Prodotto</Link>
        </div>
    </>
    
  )
}
