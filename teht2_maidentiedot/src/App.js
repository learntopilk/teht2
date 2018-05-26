import React, { Component } from 'react';
import axios from 'axios'

const SearchBar = ({ onC, val }) => {
  return (
    <div>hakusana: <input value={val} onChange={onC}></input></div>
  )
}

const ResultDisplay = ({filterFunc, countryC}) => {

  let m = filterFunc()
  console.log("m", m)



  if (m.length === 0) {
    return (<div>No hits!</div>)
  } else if (m.length > 10) {
    return (<div>Too many hits to display at once!</div>)
  } else if (m.length === 1) {
    return <DetailedCountry country={m[0]}/>
  } else {
    return (
      <div>
        {m.map(c => <OneCountry key={c.name.concat(Date.now())} country={c} onC={countryC} />)}
      </div>
    )
  }
}

const OneCountry = ({ country, onC }) => {
  return (<div value={country.name} onClick={onC}>{country.name}</div>)
}

const DetailedCountry = ({country}) => {
  let imgstyle = {
    width: '350px'
  }
  return (
    <div>
      <h4>{country.name} {country.altSpellings[3]}</h4>
      <img src={country.flag} style={imgstyle} alt="the flag of {country.name}"/>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <p>capital: {country.capital}</p>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      searchTerm: ''
    }
  }

  componentDidMount() {
    console.log("Fetching country data")
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        console.log("Data received", res.data)
        this.setState({
          countries: res.data
        })
      })
  }

  filterCountries = () => {
    console.log("filtering using the following: ", this.state.searchTerm)
    return this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }

  onSearchBarChange = (event) => {
    this.setState({ searchTerm: event.target.value })
  }
  onCountryClick = (event) => {
    console.log("event target: ", event.target)
    console.log("country value: ", event.target.textContent)
    
    this.setState({searchTerm: event.target.textContent})
  }

  render() {
    return (
      <div className="App">
        <SearchBar onC={this.onSearchBarChange} val={this.state.searchTerm} />
        <ResultDisplay filterFunc={this.filterCountries} countryC={this.onCountryClick}/>
      </div>
    );
  }
}

export default App;
