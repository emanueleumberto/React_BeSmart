
export default function ListUsersComponent({users,removeUser}) {

  return (
    <div>
        <ul>
            {users.map(ele => <li key={ele.id}>{ele.name} {ele.lastname} <button onClick={() => removeUser(ele)}>remove</button></li>)}
        </ul>
    </div>
  )
}
