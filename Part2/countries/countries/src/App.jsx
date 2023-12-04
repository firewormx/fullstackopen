import { useState, useEffect } from 'react'
import axios from "axios";
import CountryInfo from './components/Country';
import Result from './components/Result';

const appStyle = {
  display: "fixed",
 marginLeft: 30,
 color: "red",
 fontSize: 18
}


function App() {
  const [value, setValue] = useState(``);
  const [countries, setCountries] = useState([]);
  const [info, setInfo] = useState({});
  const [weather, setWeather] = useState([]);

  const countriesToShow = countries.filter((country)=> country.name.common.toLowerCase().includes(value.toLowerCase()));

useEffect(()=>{
  axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
  .then(response =>{
    setCountries(response.data);
  })
},[])

useEffect(()=>{
  const countriesToShow = countries.filter(country=> country.name.common.toLowerCase().includes(value.toLowerCase()));
  const api_key = import.meta.env.VITE_SOME_KEY;

if(countriesToShow.length === 1){
   const selectedCountry = countriesToShow[0].name.common;
   axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry}`)
   .then(response =>{
    console.log(response.data);
    setInfo(response.data);
  
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${response.data.latlng[0]}&lon=${response.data.latlng[1]}&exclude={part}&appid=${api_key}`)
  .then(response =>{
   console.log(response.data);
   setWeather(response.data)
  })
   }).catch(error => console.log(error));

}
},[value, weather]);



const handleValueChange = (event) =>{
  setValue(event.target.value);
}

const handleClickButton =(event)=>{
  event.preventDefault();
setValue(event.target.name)
}


  return (
    <>
    <div style={appStyle}>
      find countries <input value={value}  onChange={handleValueChange}/>
{countriesToShow.length !== 1 
? <Result countriesToShow={countriesToShow} key={countriesToShow.index} value={value} 
onClick={handleClickButton}/>
:<CountryInfo country={countriesToShow[0]}  info={info} key={countriesToShow.index} weather={weather}/>}
    </div>
    </>
  )
}

export default App
