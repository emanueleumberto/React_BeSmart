// Questo componente definisce la struttura COMUNE a tutte le pagine.
// <Outlet /> è il "buco" dove React Router inserisce il componente
// della route figlia correntemente attiva.
// La Navbar e il Footer rimangono SEMPRE visibili.
import { Outlet, useLocation } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

export default function LayoutPrincipale() {

  const location = useLocation()

  return (
    <div>
      {/* Navbar — definita UNA SOLA VOLTA nel layout padre */}
        <NavbarComponent />
        <h1>LayoutPrincipale</h1>
        {/* Barra URL */}
        <div><span>localhost:5173</span><span>{location.pathname}</span></div>
        {/* Contenuto principale */}
        <div className="m-3">
          {/* Outlet: qui verrà renderizzato il componente della route figlia */}
          <Outlet />
        </div>
        {/* Footer — definito UNA SOLA VOLTA */}
        <FooterComponent />
    </div>
  )
}
