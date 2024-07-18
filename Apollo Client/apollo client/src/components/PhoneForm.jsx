import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "../queries";

const PhoneForm = ({setError}) => {
    const [name,setName] = useState('')
    const [phone, setPhone] = useState('')


const [changeNumber, result]= useMutation(EDIT_NUMBER) // the 2nd prams is result obj contains data, loading, error etc prams.

    const submit = (event) => {
   event.preventDefault()
   changeNumber({variables: {name, phone}})
   setName('')
   setPhone('')
    }

useEffect(() => {
    if(result.data && result.data.editNumber === null){
    setError('person not found')
    }
},[result.data])//set error message only when the result of the mutation result.data changes

    return (
        <div>
            <h2>change number</h2>
            <form onSubmit= {submit}>
                <div>
    name<input type="text"  value={name} onChange ={({target}) => setName(target.value)}/>
    </div>
    <div>
   number<input type="text" value={phone} onChange= {({target})=> setPhone(target.value)}/>
   </div>
   <button type="submit">change nunmber</button>
            </form>
        </div>
    )
}
export default PhoneForm