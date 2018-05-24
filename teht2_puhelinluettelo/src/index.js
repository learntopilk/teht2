import React from 'react';
import ReactDOM from "react-dom";

const Name = ({ name }) => {
    return (
        <div>{name}</div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' }
            ],
            newName: ''
        }
    }

    addEntry = (event) => {
        event.preventDefault();
        console.log(this.state.newName)
        if (this.state.newName !== '') {
            let arr = this.state.persons
            arr.push({ name: this.state.newName })
            this.setState({ persons: arr, newName: '' }, console.log(this.state.persons))
        }
    }

    onTextFieldChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addEntry}>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.onTextFieldChange} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <div>debug: {this.state.newName}</div>
                <h2>Numerot</h2>
                {this.state.persons.map(person => <Name name={person.name} key={person.name.concat(Date.now())} />)}
                
      </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'))