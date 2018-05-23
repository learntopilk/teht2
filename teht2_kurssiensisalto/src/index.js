import React from 'react'
import ReactDOM from 'react-dom'

const Yhteensa = ({osat}) => {
    
    let values = osat.map(osa => osa.tehtavia)
    let reducer = (accum, val) => accum + val
    let x = values.reduce(reducer)
    
    return (
        <div>
            <p>Yhteensä {x} tehtävää</p>
        </div>
    )
}
const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat}/>
        </div>
    )
}

const Otsikko = ({nimi}) => {
    return (
        <h1>{nimi}</h1>
    )
}

const Sisalto = ({osat}) => {
    return (
        <ul>
            { osat.map(osa => <Osa osa={osa} key={osa.id}/>) }
        </ul>
    )
}

const Osa = ({osa}) => {
    return (
        <li>
            <span>{osa.nimi}: </span><span>{osa.tehtavia} tehtävää</span>
        </li>
    )
}

const App = () => {
    const kurssit = [
      {
        nimi: 'Half Stack -sovelluskehitys',
        id: 1,
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
            id: 1
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7,
            id: 2
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14,
            id: 3
          }
        ]
      },
      {
        nimi: 'Node.js',
        id: 2,
        osat: [
          {
            nimi: 'Routing',
            tehtavia: 3,
            id: 1
          },
          {
            nimi: 'Middlewaret',
            tehtavia: 7,
            id: 2
          }
        ]
      }
    ]

    return (
        <div>
            <h1>Opetetaan seuraavat kurssit</h1>
            {kurssit.map(kurssi => <Kurssi kurssi={kurssi} key={kurssi.id}/>)}
            
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)