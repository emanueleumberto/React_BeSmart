import { useEffect, useState } from "react"
import type { Post, StatoRichiesta } from "../types/api"
import { apiClient } from "../api/clients"
import { AxiosError } from "axios"

export default function PageGet() {

    const [stato, setStato] = useState<StatoRichiesta<Post[]>>({type: 'idle'})

    const chiamataAjaxFetch = async () => {
        setStato({type: "loading"})
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            if(!res.ok) { throw new Error(`HTTP: ${res.status}: ${res.statusText}`)}
            
            const data = await res.json() as Post[]
            setTimeout(() => { 
            setStato({type: "success", data})}, 1000)
            
        } catch (err) {
            setStato({type: "error", message: err instanceof Error ? err.message : 'Errore sconosciuto!'})
        }
    }

    const chiamataAjaxAxios = async () => {
        setStato({type: "loading"})
        try {
            const {data} = await apiClient.get<Post[]>('/posts')
            setTimeout(() => { 
            setStato({type: "success", data})}, 1000)
        } catch (err) {
            if(err instanceof AxiosError) {
                setStato({type: "error", message: err.message, status: err.response?.status})
            }
        }
    }

    useEffect(() => {
        //chiamataAjaxFetch()
        chiamataAjaxAxios()
    }, [])


  return (
    <div>
        <h1>PageGet</h1>

        {stato.type === 'loading' && (
            <div><h2>Caricamento dati....</h2></div>
        )} 

        {stato.type === 'error' && (
            <div>
                <h2>Errore nel caricamento dei dati</h2>
                <h3>{stato.message} - {stato.status}</h3>
            </div>
        )}

        {stato.type === 'success' && (
            <div>
                <ul>
                    {stato.data.map(p => <li key={p.id}>{p.title}</li>)}
                </ul>
            </div>
        )}
    </div>
  )
}
