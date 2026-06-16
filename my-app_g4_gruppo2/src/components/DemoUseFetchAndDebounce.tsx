import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";

interface Post {id: number, title: string}

export default function DemoUseFetchAndDebounce() {

    const url = 'https://jsonplaceholder.typicode.com/posts';

    const [query, setQuery] = useState('');

    const queryDebounce = useDebounce(query, 1500)

    const { dati } = useFetch<Post[]>(
        queryDebounce.trim() ?
        `${url}?title_like=${queryDebounce}&_limits=5` : 
        url
    )

    return (
        <div>
            <input 
                type="text" 
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Inserisci titolo da cercare nei post" />
            <ul>
                {dati?.map(ele => <li>{ele.id} -  {ele.title}</li>)}
            </ul>
        </div>
    )
}
