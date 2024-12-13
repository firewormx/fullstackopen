import { Patient, Diagnose, EntryWithoutId } from "../types"
import { useParams } from "react-router-dom"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Man3Icon from '@mui/icons-material/Man3';
import EntryDetails from "./EntryDetails/EntryDetails";
import '../index.css'
import {Button} from '@mui/material'
import { useState } from "react";
import patientService from '../services/patients'
import axios from "axios";
import AddEntryModal from "./AddEntryModal";

interface Props{
    patients:Patient[],
    diagnoses: Diagnose[]
}

const SpecialEntry= ({patients, diagnoses}: Props) => {
  const [patient, setPatient] = useState<Patient>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  // const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const openModal = (): void => setModalOpen(true);
  const [error, setError] = useState<string>();

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const id = useParams().id
  const specailPatient = patients.find(p => p.id === id);

const showError = (text: string) => {
setError(text)
setTimeout(() => {
  setError('')
}, 5000)
  }

  const submitNewEntry = async(values: EntryWithoutId) => {
try{
  const newPatient = await patientService.postNewEntry(id as string, values)
  setPatient(newPatient);
  return true;
}catch(error: unknown){
  if(axios.isAxiosError(error)){
    if(error.response?.data && typeof error.response.data === 'string'){
      const Prefix = 'Something went wrong. Error: '
      const message = error.response.data.replace(Prefix, '')
      console.log(message)
      showError(message)
    }else{
      showError('Unknown axios error')
    }
  }else{
    console.log('Unknown error', error)
    showError('Unknown error')
  }
  return false
}
}


  const genderPart = () => {
    if(specailPatient?.gender === 'female'){
  return <FemaleIcon />
    }
    if(specailPatient?.gender === 'male'){
      return <MaleIcon />
    }else{
 return <Man3Icon />
    }
  }
  
  // const findDescription = ( code: string ) => {
  //   const desc: Diagnose | undefined = diagnoses.find( d => d.code === code);
  //   return (desc === undefined) ? null : desc?.name;
  // };

return (
  <div key={specailPatient?.id}>
  <h2>{specailPatient?.name} {genderPart()}</h2>

<p>ssn:&nbsp; {specailPatient?.ssn}</p>
<p>occupation:&nbsp; {specailPatient?.occupation}</p>

<AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
 />

<h3>entries</h3>
{specailPatient?.entries
            ? specailPatient?.entries.map( e => <EntryDetails entry={e} key={e.id} /> )
            : <p>This patient has no entries.</p>
      }

<Button variant="contained" onClick={() => openModal()}>ADD NEW ENTRY</Button>
</div>
)
}
  
export default SpecialEntry