import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

interface Post {id: number; title: string}


export default function DemoUseFetchAndDebounce() {

    const url = 'https://jsonplaceholder.typicode.com/posts'

    const [query, setQuery] = useState('');

    // UseDebounce cambia il valore dopo 600ms dall'ultimo carattere inserito
    const queryDebounce = useDebounce(query, 600);

    // UseFetch 
    const {dati} = useFetch<Post[]>(
        queryDebounce.trim() ? 
        `${url}?title_like=${queryDebounce}&_limits=5` :
        url
    )


  return (
    <>
    <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Inserisci testo" />
    
        <div>
            <ul>
                {dati?.map(post => <li>{post.id} - {post.title}</li>)}
            </ul>
        </div>
    </>
    
  )
}
