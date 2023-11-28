import { useState, useEffect } from 'react'
import axios from "axios";
import CountryInfo from './components/Country';
import Result from './components/Result';

const appStyle = {
  display: "fixed",
 marginLeft: 30,
 color: "black",
 fontSize: 18
}


function App() {
  const [value, setValue] = useState(``);
  const [countries, setCountries] = useState([]);
  const [info, setInfo] = useState({});

  const countriesToShow = countries.filter((country)=> country.name.common.toLowerCase().includes(value.toLowerCase()));

useEffect(()=>{
  axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
  .then(response =>{
    setCountries(response.data);
  })
},[])

useEffect(()=>{
  const countriesToShow = countries.filter(country=> country.name.common.toLowerCase().includes(value.toLowerCase()));
if(countriesToShow.length === 1){
   const selectedCountry = countriesToShow[0].name.common;
   axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry}`)
   .then(response =>{
    console.log(response.data);
    setInfo(response.data);
   }).catch(error => console.log(error))
}
},[value]);


const handleValueChange = (event) =>{
  setValue(event.target.value);
}



  return (
    <>
    <div style={appStyle}>
      find countries <input value={value}  onChange={handleValueChange}/>
{countriesToShow.length !== 1 
? <Result countriesToShow={countriesToShow} key={countriesToShow.index} value={value} />
:<CountryInfo country={countriesToShow[0]}  info={info} key={countriesToShow.index}/>}
    </div>
    </>
  )
}

export default App
