import { useState } from "react"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client"
import Select from 'react-select'

// const options = [
//     {value:'', label:'Please select one author'},
//     {value:'Robert Martin', label:'Robert Martin'},
//     {value:'Martin Fowler', label:'Martin Fowler'},
//     {value:'Fyodor Dostoevsky', label:'Fyodor Dostoevsky'},
//     {value:'Joshua Kerievsky', label:'Joshua Kerievsky'},
//     {value:'Sandi Metz', label:'Sandi Metz'},
// ]
const BirthYear = ({setError}) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [selectedOption, setSelectOption] = useState(null)


    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries:[{query: ALL_AUTHORS }],
        onError: (error) => {
       const messages = error.graphQLErrors.map(error => error.message).join('\n')
       console.log(messages)
       setError(messages)
        }
    })
    const handleSubmitButton = (event) => {
        event.preventDefault()
        const setBornTo = Number.parseInt(born, 10)
        editAuthor({variables: {name, setBornTo}})

     setName('')
     setBorn('')
    }
    return <div>
        <h2>Set birthyear</h2>
      <div>
        <form onSubmit={handleSubmitButton}>
{/* <div>name:<input type="text" value={name} onChange= {({target})=> setName(target.value)}/></div> */}
<select name='selectedAuthor' onChange={({target})=> setName(target.value)}>
<option value="">Select one author</option>
<option value="Robert Martin">Robert Martin</option>
<option value="Martin Fowler">Martin Fowler</option>
<option value="Fyodor Dostoevsky">Fyodor Dostoevsky</option>
<option value="Joshua Kerievsky">Joshua Kerievsky</option>
<option value="Sandi Metz">Sandi Metz</option>
</select>

{/* <div className="BirthYear">
    <Select
    defaultValue={selectedOption}
    onChange= {setSelectOption}
    options ={options}
    />
</div> */}
<div>born:<input type="text" value={born} onChange = {({target})=> setBorn(target.value)} /></div>
<button type="submit">update author</button>
        </form>
      </div>
    </div>
}
export default BirthYear