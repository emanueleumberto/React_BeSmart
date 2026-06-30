import { useEffect, useState } from "react"
import type { Post, StatoRichiesta } from "../types/api"
import { apiClient } from "../api/clients"
import { AxiosError } from "axios"

export default function PageGet() {

    const [statoFetch, setStatoFetch] = useState<StatoRichiesta<Post[]>>({type: "idle"})

    const chiamataAjaxFetch = async () => {
        setStatoFetch({type: "loading"})
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            if(!res.ok) {
                throw new Error(`HTTP: ${res.status}: ${res.statusText}`)
            }

            const data = await res.json() as Post[]
            setStatoFetch({type: "success", data})
            console.log(statoFetch);
        } catch(err) {
            setStatoFetch({
                type: "error", 
                message: err instanceof Error ? err.message : 'Errore sconosciuto!'}
            )
            console.log(statoFetch);
        }
    }

    const chiamataAjaxAxios = async () => {
         setStatoFetch({type: "loading"})
         try {
            const {data} = await apiClient.get<Post[]>('/post')
            setStatoFetch({type: "success", data})
         } catch(err) {
            if(err instanceof AxiosError) {
                setStatoFetch({
                type: "error", 
                message: err.message,
                status: err.response?.status
                }
            )
            }
         }
    }

    useEffect(() => {
        //chiamataAjaxFetch()
        chiamataAjaxAxios()
        console.log('UseEffect');
    }, [])

  return (
    <div>
        <h1>PageGet</h1>
        {statoFetch.type === 'loading' && (
            <div>
                <h2>Caricamento dati...</h2>
            </div>
        )}

        {statoFetch.type === 'error' && (
            <div>
                <h2>Errore nel caricamento dei dati </h2>
                <h3>{statoFetch.status} - {statoFetch.message}</h3>
            </div>
        )}

        {statoFetch.type === 'success' && (
            <div>
                <h2>Dati letti tramite chiamata Ajax</h2>
                <ul>
                    {statoFetch.data.map(p => <li key={p.id}> {p.title} - {p.body}</li>)}
                </ul>
            </div>
        )}

        
    </div>
  )
}
