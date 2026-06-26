import { Button, ListGroup } from "react-bootstrap"
import NavbarComponent from "../components/NavbarComponent"
import { NavLink, useSearchParams } from "react-router-dom"
import { listaProdotti } from "../prodotti"
import { useState } from "react"

export default function Prodotti() {

  // useSearchParams() legge e modifica i query string di un url (?chiave=valore)
  // è come setState ma per le url. Il browser mantiene nella history
  // URL -> "/prodotti?categoria=audio"
  const [searchParams, setSearchParams] = useSearchParams()
  const categoria = searchParams.get('categoria') ?? 'tutte'

  const prodottiFiltrati = listaProdotti.filter(p => categoria === 'tutte' || p.categoria === categoria)

  const impostaCategoria = (categoria: string) => {
    // modificare il query string ed aggiornare la pagina
    if(categoria === 'tutte') setSearchParams({})
    else setSearchParams({categoria: categoria})
  } 

  return (
    <>
        <NavbarComponent />
        <div>Prodotti</div>
        <div>
          {['tutte', 'informatica', 'audio'].map(c => 
            <Button className="me-2" key={c} variant="dark" onClick={() => impostaCategoria(c)}>{c}</Button>
          )}
        </div>
        <ListGroup>
          {prodottiFiltrati.map(p => <NavLink key={p.id} to={`/prodotti/${p.id}`}>
            <ListGroup.Item>{p.nome} ({p.categoria}) €{p.prezzo}</ListGroup.Item>
            </NavLink>)}
        </ListGroup>       
    </>
    
  )
}
