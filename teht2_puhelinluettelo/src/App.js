import React from 'react';
import NumberForm from './components/NumberForm'
import Contact from './components/Contact'
import db from './DBTouch'

const Filter = ({ funk }) => {
    return <div><span>Hakutermi: </span><input onChange={funk} /></div>
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            searchTerm: ''
        }
    }

    componentDidMount() {
        console.log("Starting fetch process")
        db
            .getAll()
            .then((response) => {
                console.log("Dis be da promsies FULFILLED!", response.data)
                this.setState({ persons: response.data })
            })
    }

    addEntry = (event) => {
        event.preventDefault();
        console.log("updating: ", this.state.newName)

        if (this.state.newName !== '') {

            let arr = this.state.persons
            if (!arr.some(x => x.name === this.state.newName)) {

                let newPerson = { name: this.state.newName, number: this.state.newNumber }
                db
                    .create(newPerson)
                    .then(res => {
                        console.log("res: ", res)
                        console.log("Another soul saved!", res.data)
                        this.setState({ persons: this.state.persons.concat(res.data), newName: '', newNumber: '' })
                    })
                    .catch(error => console.log("error:", error))

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

    onDeleteButtonPress = (id) => {
        return () => {
            console.log("Delete button launched, id: ", id) 
            db
            .remove(id)
            .then(res => {
                console.log("response to deletion: " , res)
            })
        }

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
                <table>
                    <tbody>
                        {naytettavat.map(person => {
                            return (
                                
                                    <Contact person={person} action={this.onDeleteButtonPress} key={person.name.concat(person.number)} />
                                
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default App;
