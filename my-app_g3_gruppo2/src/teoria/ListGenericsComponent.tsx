// Componente generico: funziona con qualunque T

import { listUser } from "../users"

const products = [
    {isbn: "AB12345", title: "Book", price: 12.5},
    {isbn: "CD98734", title: "Smartphone", price: 456.0},
    {isbn: "PO98765", title: "Laptop", price: 234.9}
]

// Definisco le props di tipo generico
type ListProps<T> = {
    items: T[]
    renderItem: (item: T) => React.ReactNode
    keyExtract: (item: T) => string
    emptyMessage?: string
}
 
 export default function ListGenericsComponent<T>({items, renderItem, keyExtract, emptyMessage}: ListProps<T>) {
    if (items.length === 0) return <div><p>{emptyMessage ?? "Nessun oggetto nella lista"}</p></div>
    return (
     <div>
        <ul>
            {/* {listUser.map(ele => <li key={ele.id}><span>{ele.name} {ele.email}</span></li>)} */}
            {items.map(item => <li key={keyExtract(item)}>{renderItem(item)}</li>)}
        </ul>
     </div>
   )
 }
 
{/* <ListGenericsComponent 
    items={listUser} 
    renderItem={(ele) => <span>{ele.name} {ele.email}</span>} 
    keyExtract={(ele) => ele.id.toString()}
/> */}

<ListGenericsComponent 
    items={products}
    renderItem={(ele) => <span>{ele.title} price: {ele.price}</span>}
    keyExtract={(ele) => ele.isbn}
/>