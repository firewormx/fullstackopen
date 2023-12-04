import Weather from "./Weather"
const CountryInfo=({country, weather}) => {
    return (<>
    <div>
    <h2>{country.name.common}</h2>
    <div>capital: {country.capital}</div>
    <div>area: {country.area}</div>
    <h3>languages:</h3>
    <div>
      <ul>
{Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
    </div>
  <img src={country.flags.png} alt="country flag" width="300vw" height="150vh"/>
 </div>
 <Weather weather={weather} country={country}/>
    </>
    )
  }
  export default CountryInfo;