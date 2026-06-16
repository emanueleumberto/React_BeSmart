import useLocalStorage from "../hooks/useLocalStorage"

export default function DemoLocalStorage() {

    const [tema, setTema] = useLocalStorage<'chiaro'|'scuro'>('tema', "chiaro")
    const [lingua, setLingua] = useLocalStorage<string>('lingua', 'it')

  return (
    <div>
        <p>Il valore del tema salvato nel localstorage è: {tema}</p>
        <button onClick={() => setTema(t => t === 'chiaro' ? 'scuro' : 'chiaro')}>
            Cambia stato
        </button>
        <p>La lingua utilizzata nel localstorage è: {lingua}</p>
        {['it', 'en', 'fr', 'de'].map(l => 
            <button key={l} style={{margin: '0.3rem'}} onClick={() => setLingua(l)}>
                {l}
            </button>
        )}
    </div>
  )
}
