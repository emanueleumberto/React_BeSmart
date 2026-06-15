// Componente generico: funziona con qualsiasi tipo T
import { listUser } from "../users"


// Definisco le props di tipo generico
type ListProps<T> = {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
  emptyMessage?: string
}

// Utilizzo il componente in maniera generica
export default function ListGenericsComponent<T>({items, renderItem, keyExtractor, emptyMessage}:ListProps<T>) {
  if(items.length === 0) return <p>{emptyMessage ?? "Nessun elemento presente nella lista"}</p>
  return (
    <div>
      <ul>
        {items.map(item => <li key={keyExtractor(item)}>{renderItem(item)}</li>)}
      </ul>
    </div>
  )
}

// Uso listUser[] come items -> Typescript inferisce T = User
{/* <ListGenericsComponent 
  items={listUser}
  renderItem={(u) => <span>{u.name} {u.lastname}</span>}
  keyExtractor={(u) => u.id.toString()} /> */}

{/* <ListGenericsComponent 
  items={listUser}
  renderItem={(u) => <span>{u.name} {u.lastname}</span>}
  keyExtractor={(u) => u.email} /> */}

<ListGenericsComponent 
  items={listUser}
  renderItem={(u) => <span>{u.id} email: {u.email}</span>}
  keyExtractor={(u) => u.id.toString()} />
