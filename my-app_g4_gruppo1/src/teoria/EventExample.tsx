// Tipizzare gli Eventi in React Typescript
// React ha tipi specifici per ogni evento del DOM

import { useState } from "react"

// Evento           Tipo        Typescript
// onChange         Input       React.ChangeEvent<HTMLInputElement>
// onChange         select      React.ChangeEvent<HTMLSelectElement>
// onSubmit         form        React.FormEvent<HTMLFormElement>
// onClick          button      React.MouseEvent<HTMLButtonElement>

export default function EventExample() {

    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        setValue(e.target.value)
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e);
        setValue(e.target.value)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Click del Button");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Click Submit");
    }


  return (
    <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange} />
        <select onChange={handleSelect}>
            <option>admin</option>
            <option>user</option>
        </select>
        <button type="submit" onClick={handleClick}>Invia</button>
    </form>
  )
}
