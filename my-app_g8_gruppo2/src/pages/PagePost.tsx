import React, { useState } from 'react'
import type { NuovoPost, Post, StatoRichiesta } from '../types/api'
import { apiClient } from '../api/clients'
import { AxiosError } from 'axios'

export default function PagePost() {

    const [stato, setStato] = useState<StatoRichiesta<Post>>({type: 'idle'})
    const [titolo, setTitolo] = useState('')
    const [body, setBody] = useState('')

    async function creaPostFetch() {
        setStato({type: "loading"})
        if(!titolo.trim()) return

        const payload: NuovoPost = {
            title: titolo,
            body: body || '---',
            userId: 1
        }

        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(payload)
            })
            if(!res.ok) { throw new Error(`HTTP: ${res.status}: ${res.statusText}`)}

            const data = await res.json() as Post
            setStato({type: "success", data})
            console.log(data);

        } catch (err) {
            setStato({type: "error", message: err instanceof Error ? err.message : 'Errore sconosciuto!'})
        }
    }

    async function creaPostAxios() {
        setStato({type: "loading"})
        if(!titolo.trim()) return

        const payload: NuovoPost = {
            title: titolo,
            body: body || '---',
            userId: 1
        }
        try {
            const {data} = await apiClient.post('/posts', payload)
            setStato({type: "success", data})
            console.log(data);
        } catch (err) {
            if(err instanceof AxiosError) {
                setStato({type: "error", message: err.message, status: err.response?.status})
            }
        }
        
    }

  return (
    <div>
        <h1>PagePost</h1>
        <div>
            <label>Titolo Post</label>
            <input 
                type="text" 
                placeholder="Inserisici titolo"
                onChange={(e) => {setTitolo(e.target.value)}} />
        </div>
        <div>
            <label>Post</label>
            <input 
                type="text" 
                placeholder="Inserisici il tuo post"
                onChange={(e) => {setBody(e.target.value)}}  />
        </div>
        <div>
            <button onClick={creaPostFetch}>Save Post Fetch</button>
            <button onClick={creaPostAxios}>Save Post Axios</button>
        </div>
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
                {stato.data.title} - {stato.data.id}
            </div>
        )}
    </div>
  )
}
