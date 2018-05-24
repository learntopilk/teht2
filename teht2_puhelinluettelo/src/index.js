import React from 'react';
import ReactDOM from "react-dom";
import NumberForm from './components/NumberForm'
import Contact from './components/Contact'


const Filter = ({ funk }) => {
    return <div><span>Hakutermi: </span><input onChange={funk} /></div>
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-123456' },
                { name: 'Arto Järvinen', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-123456' },
                { name: 'Karita Mattila', number: '040-123456' },
                { name: 'Marita Kattila', number: '040-123456' },
                { name: 'Sven Varjonen', number: '040-123456' }
            ],
            newName: '',
            newNumber: '',
            searchTerm: ''
        }
    }

    addEntry = (event) => {
        event.preventDefault();
        console.log(this.state.newName)

        if (this.state.newName !== '') {

            let arr = this.state.persons
            if (!arr.some(x => x.name === this.state.newName)) {
                arr.push({ name: this.state.newName, number: this.state.newNumber })
                this.setState({ persons: arr, newName: '', newNumber: '' }, console.log("Another soul saved!", this.state.persons))
            } else {
                console.log("Contact already in store!")
            }
        }
    }

    onTextFieldChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }
    onNumberFieldChange = (event) => {
        console.log(event.target.value)
        this.setState({ newNumber: event.target.value })
    }

    onFilterFieldChange = (event) => {
        this.setState({ searchTerm: event.target.value })
    }

    render() {
        const naytettavat =
            this.state.searchTerm === '' ?
                this.state.persons :
                this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return (
            <div>
                <Filter funk={this.onFilterFieldChange} />
                <h2>Puhelinluettelo</h2>
                <NumberForm thi={this} />

                <div>debug: {this.state.newName}</div>
                <h2>Numerot</h2>
                {naytettavat.map(person => {
                    return (
                        <Contact person={person} key={person.name.concat(person.number)} />
                    )
                })}

            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'))