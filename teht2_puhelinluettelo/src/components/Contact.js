import React from 'react'


const Name = ({ name }) => {
    return <span>name: {name}   </span>
}

const Number = ({ number }) => {
    return <span>number: {number}   </span>
}

const Contact = ({person}) => {
    return (
        <div>
            <Name name={person.name} key={person.name.concat(Date.now())} />
            <Number number={person.number} key={person.number} />
        </div>
    )
}

export default Contact