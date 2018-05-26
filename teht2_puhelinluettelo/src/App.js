import React from 'react';
import NumberForm from './components/NumberForm'
import Contact from './components/Contact'
import db from './DBTouch'

const Filter = ({ funk }) => {
    return <div><span>Hakutermi: </span><input onChange={funk} /></div>
}

const Message = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="message">{message}</div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            searchTerm: '',
            message: null
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

    setMessageTimeout = () => {
        setTimeout(() => {
            this.setState({ message: null })
        }, 5000)
    }

    addEntry = (event) => {
        event.preventDefault();
        console.log("updating: ", this.state.newName)

        if (this.state.newName !== '') {

            let existingPersonIndex = this.state.persons.findIndex(person => person.name === this.state.newName)

            if (existingPersonIndex === -1) {
                let newPerson = { name: this.state.newName, number: this.state.newNumber }
                db
                    .create(newPerson)
                    .then(res => {
                        console.log("Another soul saved!", res.data)
                        this.setState({
                            persons: this.state.persons.concat(res.data),
                            newName: '',
                            newNumber: '',
                            message: `Lisätty ${res.data.name} luetteloon`
                        },
                            this.setMessageTimeout())
                    })
                    .catch(error => console.log("error:", error))

            } else {

                if (window.confirm(`${this.state.persons[existingPersonIndex].name} on jo olemassa. Haluatko päivittää yhteystiedon?`)) {
                    let id = this.state.persons[existingPersonIndex].id
                    let personToBeUpdated = this.state.persons[existingPersonIndex]
                    personToBeUpdated.number = this.state.newNumber
                    //let newPerson = { name: this.state.persons[existingPersonIndex].name, number: this.state.newNumber }
                    db
                        .update(id, personToBeUpdated)
                        .then(res => {
                            console.log("res from updating existing person: ", res)
                            let arr = this.state.persons
                            arr[existingPersonIndex] = personToBeUpdated
                            this.setState({
                                persons: arr,
                                message: `Päivitetty henkilön ${personToBeUpdated.name} tiedot`,
                                newName: '',
                                newNumber: ''
                            }, () => {
                                this.setMessageTimeout()
                                console.log("State updated after updating existing contact in DB")
                            })
                        })
                } else {
                    this.setState({
                        message: "Henkilö löytyy jo tiedoista!"
                    }, () => {
                        this.setMessageTimeout()
                    })
                }
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
            if (!window.confirm("Haluatko oikeasti poistaa yhteystiedon?")) {
                return
            } else {
                db
                    .remove(id)
                    .then(res => {
                        console.log("response to deletion: ", res)
                        let index = this.state.persons.findIndex(person => person.id === id)
                        let name = this.state.persons.find(person => person.id === id).name
                        let arr = this.state.persons
                        arr.splice(index, 1)

                        this.setState({ message: `${name} poistettu`, persons: arr }, this.setMessageTimeout())
                        //this.componentDidMount();
                    })
            }

        }

    }

    render() {
        const naytettavat =
            this.state.searchTerm === '' ?
                this.state.persons :
                this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return (
            <div>

                <h2>Puhelinluettelo</h2>
                <Message message={this.state.message} />
                <Filter funk={this.onFilterFieldChange} />
                <br />
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
