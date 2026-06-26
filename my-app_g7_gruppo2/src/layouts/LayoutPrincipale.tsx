// Questo componente definisce la struttura COMUNE a tutte le pagine.
// <Outlet /> è il "buco" dove React Router inserisce il componente
// della route figlia correntemente attiva.
// La Navbar e il Footer rimangono SEMPRE visibili.
import { Outlet, useLocation } from "react-router-dom"
import FooterComponent from "../components/FooterComponent"
import NavbarComponent from "../components/NavbarComponent"

export default function LayoutPrincipale() {

    const location = useLocation()


  return (
    <div>
        {/* Navbar — definita UNA SOLA VOLTA nel layout padre */}
        <NavbarComponent />
        <h1>LayoutPrincipale</h1>
        {/* Barra URL */}
        <div>http://localhost:5173 {location.pathname}</div>
        {/* Contenuto principale */}
        <div>
            {/* Outlet: qui verrà renderizzato il componente della route figlia */}
            <Outlet />
        </div>
        {/* Footer — definito UNA SOLA VOLTA */}
        <FooterComponent />
    </div>
  )
}
