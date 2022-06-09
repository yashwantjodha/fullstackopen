import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './components/Country'

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ toShow, setToShow ] = useState('')

  useEffect(() => {
    // fetch data from restcountries.com
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // input change
  const searchCountry = (event) => {
    setToShow('')
    setSearch(event.target.value)
  }

  // filtered countries based on search
  const filteredCountries = () => {
    let filtered = []

    // filtering
    if (search) {
      filtered = countries.filter(c => {
        if (c.name.common.toLowerCase().includes(search.toLowerCase())) {
          return true
        } else {
          return false
        }
      })
    } else {
      filtered = countries
    }
    
    // single country
    if (filtered.length === 1) {
      return <Country country={filtered[0]} />
    }

    // multiple countries
    if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else {
      const countriesShown = filtered.map((c, i) => {
        return <li key={i}>{c.name.common} <button onClick={showCountry(c)}>show</button></li>
       })
      return countriesShown
    }
  }

  // show button
  const showCountry = (country) => {
    return (e) => {
      setToShow(country)
    }
  }

  return (
    <div>
      <div>find countries <input onChange={searchCountry} value={search} /></div>
      <div>{toShow ? <Country country={toShow}/> : filteredCountries()}</div>
    </div> 
  )
}

export default App