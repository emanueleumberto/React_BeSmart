
export default function ListItemComponent({obj, remove}) {

  return (
    <li>{obj.name} {obj.lastname} <button onClick={()=>remove(obj)}>X</button></li>
  )
  
}
