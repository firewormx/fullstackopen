const Result = ({countriesToShow, value}) => {
    if(value === "") return ;
if(countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
}else {
        return (
            <ul>
                {countriesToShow.map((country,index) => (
                    <li key={index}>
                        {country.name.common}
                    </li>
                ))}
            </ul>
        )
    }
    

}

export default Result;