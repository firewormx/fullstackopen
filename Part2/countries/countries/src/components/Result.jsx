const Result = ({countriesToShow, value, onClick}) => {
    if(value === "") return ;
if(countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
}else {
        return (
            <ul>
                {countriesToShow.map((country,index) => (
                    <li key={index}>
                        {country.name.common}
                        <button type="button" onClick={onClick} name={country.name.common}>show</button>
                    </li>
                ))}
            </ul>
        )
    }
    

}

export default Result;