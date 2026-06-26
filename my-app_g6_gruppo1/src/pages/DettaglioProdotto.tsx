import { useLocation, useParams } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import { listaProdotti } from "../prodotti";

export default function DettaglioProdotto() {
  // useParams leggi i parametri dinamici dell'URL
  // URL -> "/prodotti/3" -> params.id === 3
  // I parametri nell'URL sono sempre considerati come Stringhe in React Router
  const { id } = useParams<Record<string, string>>()

  const prodotto = listaProdotti.find(p => p.id === Number(id));

  // oggetto location fornisce tutte le infirmazioni sull'url corrente
  // Utile per analytics, leggere state passato da link
  const location = useLocation()
  // location contiene:
  //   pathname:  "/prodotti/5"           → il percorso
  //   search:    "?tab=recensioni"       → i query string (stringa grezza)
  //   hash:      "#commenti"             → l'ancora
  //   state:     { provenienza: "home" } → dati passati da Link
  //   key:       "abc123"                → ID univoco della location

  console.log(location.state);
  console.log(location.hash);
  console.log(location.search);
  console.log(location.key);
  console.log(location.pathname);

  if(!prodotto) {
    return (
      <>
      <NavbarComponent />
      <div>DettaglioProdotto</div>
      <div>Prodoto non trovato</div>
      </>
    )
  }

  return (
    <>
      <NavbarComponent />
      <div>DettaglioProdotto</div>
      <div>
        <h2>{prodotto?.nome}</h2>
        <p>{prodotto?.categoria}</p>
        <p>€{prodotto?.prezzo}</p>
      </div>
    </>
    
  )
}
