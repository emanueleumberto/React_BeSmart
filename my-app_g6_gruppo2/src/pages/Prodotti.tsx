import { Button, ListGroup } from "react-bootstrap"
import NavbarComponent from "../components/NavbarComponent"
import { prodotti } from "../prodotti"
import { NavLink, useSearchParams } from "react-router-dom"

export default function Prodotti() {

  // useSearchParams() legge e modifica i query string di un url (?chiave=valore)
  // è come setState ma per le url. Il browser mantiene nella history
  // URL -> "/prodotti?categoria=audio"
  const [searchParams, setSearchParams] = useSearchParams()
  const categoria = searchParams.get('categoria') ?? 'tutte'

  const prodottiFiltrati = prodotti.filter(p => categoria === 'tutte' || p.categoria === categoria)

  const impostaCategoria = (categoria: string) => {
    // modificare il query string ed aggiornare la pagina
    if(categoria === 'tutte') setSearchParams({})
    else setSearchParams({categoria: categoria})
  } 

  return (
    <div>
        <NavbarComponent />
        <h1>Prodotti</h1>
        {['tutte', 'audio', 'informatica'].map(c => 
          <Button 
            key={c} 
            className="m-3" 
            variant="dark" 
            onClick={() => impostaCategoria(c)}>{c}</Button>
        )}
        <ListGroup>
          {prodottiFiltrati.map(p => 
          <NavLink key={p.id} to={`/prodotti/${p.id}`} state={{utente: p}}>
            <ListGroup.Item>{p.nome} ({p.categoria}) €{p.prezzo}</ListGroup.Item>
          </NavLink>)}
        </ListGroup>
    </div>
  )
}
