import {useState,useEffect} from 'react'
import axios from 'axios'

const CountryFilter = ({handleCountrySearch, searchCountry}) => <>
  <form><div>find countries: <input value={searchCountry} onChange={handleCountrySearch}/></div></form>
</>

const CountryList = ({countries, setSearchCountry}) => {
  return(
    <ul>
      {countries.map(
        country => (
          <li key={parseInt(country.ccn3)}>
            {country.name.common} <button onClick={() => setSearchCountry(country.name.common)}>show</button>
          </li>))}
    </ul>
  )
}


const CountryDisplay = ({countries, filterValue, setSearchCountry, api_key}) => {
  const [countryWeather, setCountryWeather] = useState([])

  const filtered = countries.filter((country) => (country.name.common.toLowerCase().includes(filterValue.toLowerCase())))

  if(filtered.length > 10){
    return <>Too many countries to show</>
  }
  else if(filtered.length === 1){
    return(<Country country={filtered[0]} api_key={api_key} countryWeather={countryWeather} setCountryWeather={setCountryWeather}/>)
  }
  return (<CountryList countries={filtered} setSearchCountry={setSearchCountry}/>)
}

const Country = ({country, api_key, setCountryWeather, countryWeather}) =>{

  const api_string = `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
    .get(api_string)
    .then(response => {
      setCountryWeather(response.data)
      setIsLoading(false)
    })
  },[])

  if (isLoading) {
    return(<>Weather loading...</>)
  }
  else{
    return(<>
    <h1>{country.name.common}</h1>
    <p>capital: {country.capital[0]}</p>
    <p>area: {country.area}</p>
    <p><b>language:</b></p>
    <ul>
      {Object.entries(country.languages).map(lang => (<li key={lang[0]}>{lang[1]}</li>))}
    </ul>
    <img src={country.flags.png} />
    <h2>Weather</h2>
    <p>temperature {Math.round((countryWeather.main.temp - 273.3)*100)/100} Celcius</p>
    <img src={`http://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`} />
    <p>wind {countryWeather.wind.speed} m/s</p>

  </>)}
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  const handleCountrySearch = (event) => {
    setSearchCountry(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <CountryFilter searchCountry={searchCountry} handleCountrySearch={handleCountrySearch} />
      <button onClick={() => setSearchCountry('')}>Clear</button>
      <CountryDisplay countries={countries} filterValue={searchCountry} setSearchCountry={setSearchCountry} api_key={api_key}/>
    </div>
  );
}

export default App;
