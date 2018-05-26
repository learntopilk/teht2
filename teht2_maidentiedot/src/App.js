import React, { Component } from 'react';
import axios from 'axios'

const SearchBar = ({ onC, val }) => {
  return (
    <div>hakusana: <input value={val} onChange={onC}></input></div>
  )
}

const ResultDisplay = ({fun}) => {
  let m = fun()
  console.log("m", m)



  if (m.length === 0) {
    return (<div>No hits!</div>)
  } else if (m.length > 10) {
    return (<div>Too many hits to display at once!</div>)
  } else {
    return (
      <div>
        {m.map(c => <OneCountry key={c.name.concat(Date.now())} country={c} />)}
      </div>
    )
  }
}

const OneCountry = ({ country }) => {
  return (<div>{country.name}</div>)
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
    return this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }

  onSearchBarChange = (event) => {
    console.log(event.target.value)
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <SearchBar onC={this.onSearchBarChange} val={this.state.searchTerm} />
        <ResultDisplay fun={this.filterCountries} />
      </div>
    );
  }
}

export default App;
