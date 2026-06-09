import { Component } from "react"

export default class ClassComponentLifecycle extends Component {

    constructor(props){
        super(props)
        console.log("Sono il Costruttore di una classe");
    }

    // Metodo invocato dopo il montaggio del componente
    componentDidMount() {
        console.log("Sono il metodo ComponentDidMount di una classe");
    }

    // Metodo invocato dopo ogni modifica del componente (props, state, forceUpdate)
    componentDidUpdate() {
        console.log("Sono il metodo componentDidUpdate di una classe");
    }

    // Metodo invocato poco prima dello smontaggio di un componente
    componentWillUnmount() {
        console.log("Sono il metodo componentWillUnmount di una classe");
    }

  render() {
    console.log("Sono il metodo Render di una classe");
    return (
      <div>ClassComponentLifecycle</div>
    )
  }
}
