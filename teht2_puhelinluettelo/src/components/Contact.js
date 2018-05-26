import React from 'react'


const Name = ({ name }) => {
    return <span>name: {name}   </span>
}

const Number = ({ number }) => {
    return <span>number: {number}   </span>
}

const Contact = ({person, action}) => {
    return (
        <tr>
            <td><Name name={person.name} key={person.name.concat(Date.now())} /> </td>
            <td><Number number={person.number} key={person.number} /></td>
            <td><button onClick={action(person.id)}>Delete this</button></td>
        </tr>
    )
}

export default Contact