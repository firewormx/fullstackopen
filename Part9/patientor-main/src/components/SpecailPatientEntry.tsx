import { Patient, Diagnose, EntryWithoutId, Gender} from "../types"
import { useParams } from "react-router-dom"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Man3Icon from '@mui/icons-material/Man3';
import { Typography, Button } from "@mui/material";
import EntryDetails from "./EntryDetails/EntryDetails";
import '../index.css'
import { useState, useEffect } from "react";
import patientService from '../services/patients'
import axios from "axios";
import AddEntryModal from "./AddEntryModal";

interface Props{
  // patient: Patient | null |undefined,
  patients:Patient[],
  diagnoses: Diagnose[],
}

const genderId = (gender: Gender | undefined) => {
switch(gender){
 case "female": return <FemaleIcon />;
 case "male" : return < MaleIcon />;
 default: return  <Man3Icon />;
}
}

const SpecialPatientInfo= ({ patients}: Props) => {
  // const [entry, setEntry] = useState<Entry>()!
  const [patient, setPatient] = useState<Patient>()

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const showError = (text: string) => {
    setError(text)
    setTimeout(() => {
      setError('')
    }, 5000)
      }

const id = useParams().id
 let specialPatient = patients.find(p => p.id === id);

  useEffect(()=> {

    const fetchPatientInfo = async() => {
      try{
       const updatedPatient = await patientService.getSpecialPatient(id);
       setPatient(updatedPatient);
      }catch(error: unknown){
    console.error(error)
      }
    }
   void fetchPatientInfo();
  }, [])

  const submitNewEntry = async(values: EntryWithoutId) => {
try{
  if(specialPatient){
    const entry = await patientService.postNewEntry(specialPatient.id, values)
    const updatedEntries = specialPatient?.entries?.concat(entry)
    specialPatient = {...specialPatient, entries: updatedEntries}
    setPatient(specialPatient);
    setModalOpen(false)
  }
  return true
}catch(error: unknown){
  if(axios.isAxiosError(error)){
    if(error.response?.data && typeof error.response.data === 'string'){
      const Prefix = 'Something went wrong. Error: '
      const message = error.response.data.replace(Prefix, '')
      console.error(message)
      showError(message)
    }else{
      showError('Unknown axios error')
    }
  }else{
    console.error('Unknown error', error)
    showError('Unknown error')
  }
  return false
}
}

return (
  <div key={specialPatient?.id}> 
 <Typography component="h5" variant="h5">{specialPatient?.name}{genderId(patient?.gender)}</Typography>
<p>ssn:&nbsp; {specialPatient?.ssn}</p>
<p>occupation:&nbsp; {specialPatient?.occupation}</p>

<AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
 />

<Typography component="h5" variant="h5">entries</Typography>
{(specialPatient?.entries && specialPatient.entries.length > 0)
            ? specialPatient?.entries?.map( e => <EntryDetails entry={e} key={e.id} /> )
            : <p>This patient has no entries.</p>
      }

<Button variant="contained" onClick={() => openModal()}>Add New Entry</Button>
</div>
)
}
  
export default SpecialPatientInfo