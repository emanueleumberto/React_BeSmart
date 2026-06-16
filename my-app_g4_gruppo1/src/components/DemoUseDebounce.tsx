import { useState } from "react"
import useDebounce from "../hooks/useDebounce";

export default function DemoUseDebounce() {

    const [valore, setValore] = useState('');

    const valoreDebounce = useDebounce(valore, 1000);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValore(e.target.value)
    }  

    return (
        <div>
            <input 
                type="text" 
                value={valore}
                onChange={handleChange}
                placeholder="Inserisci testo" />

            <p>Il valore inserito nel campo di testo è: {valoreDebounce}</p>
        </div>
    )
}
