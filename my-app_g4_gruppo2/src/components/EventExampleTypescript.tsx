// Tipizzare gli Eventi in React e Typescript
// React ci mette a disposizione eventi specifici per ogni evento del DOM

import { useState } from "react"


// Evento       Tipo        Typescript
// onChange     Input       React.ChangeEvent<HTMLInputElement>
// onChange     Select      React.ChangeEvent<HTMLSelectEvevent>
// onSubmit     form        React.FormEvent<HTMLButtonElement>
// onClick      button      React.MouseEvent<HTMLButtonElement>

export default function EventExampleTypescript() {

    const [value, setValue] = useState('');

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)
    const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => setValue("Click Button")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => setValue("Click Submit")

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={value} onChange={handleInput} />
                <select onChange={handleSelect}>
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                </select>
                <button type="submit" onClick={handleButton}>Click</button>
            </form>
        </div>
    )
}
