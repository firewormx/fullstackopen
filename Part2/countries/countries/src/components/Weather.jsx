const Weather = ({country, weather}) =>{
    if(weather.current){
        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>temperature {weather.current.temp} Celcius</p>
                <img src={weather.current.weather.icon} alt="weather icon"  width="300vw"/>
                <p>wind {weather.current.wind_speed} m/s</p>
            </div>
        )
    }
 
}
export default Weather;