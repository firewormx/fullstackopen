import { Patient, Diagnose, EntryWithoutId, Gender} from "../types"
import { useParams } from "react-router-dom"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Man3Icon from '@mui/icons-material/Man3';
import { Typography, Button, Alert } from "@mui/material";
import EntryDetails from "./EntryDetails/EntryDetails";
import '../index.css'
import { useState, useEffect} from "react";
import patientService from '../services/patients'
import axios from "axios";
import AddEntryModal from "./AddEntryModal";

interface Props{
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
  const id = useParams().id
  let specialPatient = patients.find(p => p.id === id);

  const [patient, setPatient] = useState<Patient | undefined>(specialPatient)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  useEffect(()=> {
    const fetchPatientInfo = async() => {
     const updatedPatient = await patientService.getSpecialPatient(id);
      setPatient(updatedPatient); 
    }
   void fetchPatientInfo();
  }, [])

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(null);
  };

  const showError = (text: string) => {
    setError(text)
    setTimeout(() => {
      setError('')
    }, 5000)
      }

  const submitNewEntry = async(values: EntryWithoutId) => {
try{
  const updatedPatient = await patientService.postNewEntry(values, id as string,)
  setPatient(updatedPatient)
  setModalOpen(false)
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
if(!id) return <div>loading...</div>

return (
  <div key={patient?.id}> 
 <Typography component="h5" variant="h5">{patient?.name}{genderId(patient?.gender)}</Typography>
<p>ssn:&nbsp; {patient?.ssn}</p>
<p>occupation:&nbsp; {patient?.occupation}</p>

{error &&  <Alert severity="error">This is an error Alert: {error}.</Alert>}

<AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
 />

<Typography component="h5" variant="h5">entries</Typography>
{(patient?.entries && patient.entries.length > 0)
            ? patient?.entries?.map( e => <EntryDetails entry={e} key={e.id} /> )
            : <p>This patient has no entries.</p>
      }

<Button variant="contained" onClick={() => openModal()}>Add New Entry</Button>
</div>
)
}
  
export default SpecialPatientInfo