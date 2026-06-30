import { useState } from "react"
import type { NuovoPost, Post } from "../types/api"
import { apiClient } from "../api/clients"

export default function PagePost() {

    const [titolo, setTitolo] = useState('')
    const [body, setBody] = useState('')

    async function creaPostFetch() {
        if(!titolo.trim()) return

        const payload: NuovoPost = {
            title: titolo,
            body: body || '---',
            userId: 1
        }

        try {

            const res = await fetch(
                'https://jsonplaceholder.typicode.com/posts',
                {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(payload)
                }
            )

            if(!res.ok) {
                throw new Error(`HTTP: ${res.status}: ${res.statusText}`)
            }

            const postCreato = await res.json() as Post
            console.log(postCreato);

        } catch (err) {
            console.log(err);
        }

    }
    
    async function creaPostAxios() {
        if(!titolo.trim()) return

        const payload: NuovoPost = {
            title: titolo,
            body: body || '---',
            userId: 1
        }

        const {data} = await apiClient.post<Post>('/posts', payload)
        console.log(data);
    }

  return (
    <div>
        <h1>PagePost</h1>
        <div>
            <label>Titolo Post</label>
            <input 
                type="text" 
                placeholder="Inserisici titolo"
                onChange={(e) => setTitolo(e.target.value)} />
        </div>
        <div>
            <label>Post</label>
            <input 
                type="text" 
                placeholder="Inserisici il tuo post"
                onChange={(e) => setBody(e.target.value)}  />
        </div>
        <div>
            <button onClick={creaPostFetch}>Save Post Fetch</button>
            <button onClick={creaPostAxios}>Save Post Axios</button>
        </div>
    </div>
  )
}
