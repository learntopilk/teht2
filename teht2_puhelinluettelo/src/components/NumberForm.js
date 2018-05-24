import React from 'react'

const Nimi = ({ value, onChange }) => {
    return <div>syötä nimi: <input value={value} onChange={onChange} /></div>
}

const Numero = ({ value, onChange }) => {
    return <div>syötä numero: <input value={value} onChange={onChange} /></div>
}

const Painike = () => {
    return <button type="submit">Lisää henkilö</button>
}

const NumberForm = ({thi}) => {
    return (
        <form onSubmit={thi.addEntry}>
            <Nimi value={thi.state.newName} onChange={thi.onTextFieldChange} />
            <Numero value={thi.state.newNumber} onChange={thi.onNumberFieldChange} />
            <Painike />
        </form>

    )
}

export default NumberForm