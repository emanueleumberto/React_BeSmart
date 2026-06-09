import { useEffect, useState } from 'react'
import { Container, ListGroup, Spinner, Alert, Form } from 'react-bootstrap'

export default function FunctionalComponentExample() {

    const urlUsers = 'https://jsonplaceholder.typicode.com/users/';
    const urlPosts = 'https://jsonplaceholder.typicode.com/posts/'

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const [userSelected, setUserSelected] = useState(0);
    const [postSelectd, setPostSelected] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
            // Logica da eseguire al montaggio del componente
            // Logica da eseguire ad ogni modifica delle dipendeze nella []
    
            return () => {
                // Logica da eseguire subito prima dello smontaggio di un componente
            }
        }, [])


    useEffect(() => {
        fetch(urlUsers)
        .then(response => response.json())
        .then(json => {
            setTimeout(() => {
                setUsers(json)
                setLoading(false)
            }, 2000)
            
        })
        .catch(error => {
            setError('Errore di caricamento....')
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        fetch(urlUsers+userSelected+'/posts')
            .then(response => response.json())
            .then(json => setPosts(json))
    }, [userSelected])

    useEffect(() => {
        fetch(urlPosts+postSelectd+'/comments')
            .then(response => response.json())
            .then(json => setComments(json))
    }, [postSelectd])

    const handleChangeUser = (e) => {
        // console.log(e.target.value)
        setUserSelected(e.target.value)
        setPostSelected(0)
    } 

    const handleChangePost = (e) => {
        // console.log(e.target.value)
        setPostSelected(e.target.value)
    } 


  return (
    <Container>
        {loading && <Spinner animation="border" />}
        {error && <Alert variant='danger'>{error}</Alert>}
        {/* <ListGroup>
            {users.map(ele => <ListGroup.Item>{ele.name}</ListGroup.Item>)}
        </ListGroup> */}
        <Form.Select aria-label="Default select example" onChange={handleChangeUser}>
            <option>Open this select menu</option>
            {users.map(ele => <option value={ele.id} >{ele.id} - {ele.name}</option>)}
        </Form.Select>
        {/* <ListGroup>
            {posts.map(ele => <ListGroup.Item>{ele.title}</ListGroup.Item>)}
        </ListGroup> */}
        <Form.Select aria-label="Default select example" onChange={handleChangePost}>
            <option>Open this select menu</option>
            {posts.map(ele => <option value={ele.id} > {ele.id} {ele.title}</option>)}
        </Form.Select>
        <ListGroup>
            {comments.map(ele => <ListGroup.Item>{ele.name}</ListGroup.Item>)}
        </ListGroup> 
    </Container>
  )
}
