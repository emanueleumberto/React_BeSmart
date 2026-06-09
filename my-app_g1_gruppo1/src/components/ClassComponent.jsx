import { Component } from 'react'

export default class ClassComponent extends Component {

    constructor(props){
        super(props)
        this.state = {date: new Date()}
    }

    componentDidMount() {
        console.log("Sono il componentDidMount");
        this.timer =  setInterval(() => {
            // console.log("Sono il setInterval");
            this.setState({date: new Date()})
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        // console.log(this.props);
        return (
            <>
                <div>{this.props.titolo} scritto da: {this.props.autore}</div>
                <div>{this.state.date.toLocaleTimeString()}</div>
            </>
        )
    }
}