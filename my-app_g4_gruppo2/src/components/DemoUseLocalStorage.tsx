import useLocalStorage from "../hooks/useLocalStorage"

export default function DemoUseLocalStorage() {

    const [tema, setTema] = useLocalStorage<'chiaro'|'scuro'>('tema', 'chiaro')
    const [lingua, setLingua] = useLocalStorage<string>('lingua', 'it')


  return (
    <div>
        <p>Il valore del tema salvato nel localstorage è {tema}</p>
        <button onClick={() => setTema(t => t === 'chiaro' ? 'scuro' : 'chiaro')}>Cambia Tema</button>

        <p>La lingua utilizzata nel LocalStorage è {lingua}</p>
        {['it', 'en', 'fr', 'de'].map(ele => 
            <button style={{margin: '0.3rem'}} onClick={() => setLingua(ele)}>{ele}</button>
        )}
    </div>
  )
}
