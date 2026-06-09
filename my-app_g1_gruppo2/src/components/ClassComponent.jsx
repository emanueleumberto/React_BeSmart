import { Component } from 'react'

export default class ClassComponent extends Component {

    // orologio = new Date()

    constructor(props){
        super(props)
        this.state = {date: new Date()}
        console.log("Sono il costruttore");
    }

    componentDidMount() {
        console.log("Sono il componentDidMount");
        this.timer = setInterval(() => {
            // this.orologio = new Date()
            this.setState({date: new Date()})
            //console.log(this.orologio.toLocaleTimeString());
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
            <div>Orario: {this.state.date.toLocaleTimeString()}</div>
        </>
    )
  }
}
