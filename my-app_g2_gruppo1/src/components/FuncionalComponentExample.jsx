import { useEffect, useState } from "react"
import { Alert, Container, Form, ListGroup, Spinner } from "react-bootstrap"

export default function FuncionalComponentExample() {

    const urlUsers = 'https://jsonplaceholder.typicode.com/users/';
    const urlPosts = 'https://jsonplaceholder.typicode.com/posts/'

    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([]) 

    const [userSelected, setUserSelected] = useState(0)
    const [postSelected, setPostSelected] = useState(0)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(()=> {
        // Logica da eseguire al montaggio del componente
        // Logica da eseguire ad ogni modifica della dipendenza inserita nelle []

        return () => {
            // Logica da eseguire subito prima dello smontaggio di un componente
        }
    }, [])

    useEffect(() => {
        fetch(urlUsers)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            setTimeout(() => {
                setUsers(json)
                setLoading(false)
            }, 2000)
            
        })
        .catch(error => {
            console.error(error)
            setLoading(false)
            setError("Errore nel caricamento...")
        });
    }, [])

    useEffect(() => {
        fetch(urlUsers+userSelected+"/posts")
        .then(response => response.json())
        .then(json => {
            //console.log(json);
            setPosts(json)
        })
    }, [userSelected])

    useEffect(() => {
        fetch(urlPosts+postSelected+"/comments")
        .then(response => response.json())
        .then(json => {
            setComments(json)
        })
    }, [postSelected])

    const handleChangeUser = (e) => {
        //console.log(e.target.value);
        setUserSelected(e.target.value)
        setPostSelected(0)
    }

    const handleChangePost = (e) => {
        //console.log(e.target.value);
        setPostSelected(e.target.value)
    }


  return (
    <>
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        <Container>
            {/* <ListGroup>
                {users.map(ele => <ListGroup.Item>{ele.name} ({ele.email})</ListGroup.Item>)}
            </ListGroup> */}
            <Form.Select aria-label="Default select example" onChange={handleChangeUser}>
                <option>Open this select menu</option>
                {users.map(ele => <option value={ele.id} key={ele.id}>
                                        {ele.name} ({ele.email})
                                  </option>)}
            </Form.Select>
            {/* <ListGroup>
                {posts.map(ele => <ListGroup.Item>{ele.userId} - {ele.title}</ListGroup.Item>)}
            </ListGroup> */}
            <Form.Select aria-label="Default select example" onChange={handleChangePost}>
                <option>Open this select menu</option>
                {posts.map(ele => <option value={ele.id} key={ele.id}>
                                        {ele.userId} - {ele.title}
                                  </option>)}
            </Form.Select>
            <ListGroup>
                {comments.map(ele => <ListGroup.Item key={ele.id}>{ele.postId} - {ele.name} ({ele.email})</ListGroup.Item>)}
            </ListGroup>
        </Container>
    </>
  )
}
