import { Component } from 'react'

export default class ClassComponentLifecycle extends Component {

    constructor(props){
        super(props)
        console.log('Sono il costruttore della classe ClassComponentLifecycle');
    }

    componentDidMount() {
        console.log('Sono il metodo componetDidMount della classe ClassComponentLifecycle');
    }

    componentDidUpdate() {
        console.log('Sono il metodo componentDidUpdate della calsse ClassComponentLifecycle');
    }

    componentWillUnmount() {
        console.log('Sono il metodo componentWillUnmount della classe ClassComponentLifecycle');
    }

    render() {
        console.log('Sono il metodo render della classe ClassComponentLifecycle');
        return (
        <div>ClassComponentLifecycle</div>
        )
    }
}
