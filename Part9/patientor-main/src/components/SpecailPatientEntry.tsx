import { Patient, Diagnose } from "../types"
import { useParams } from "react-router-dom"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Man3Icon from '@mui/icons-material/Man3';
import EntryDetails from "./EntryDetails/EntryDetails";
import '../index.css'

interface Props{
    patients:Patient[],
    diagnoses: Diagnose[]
}

const SpecialEntry= ({patients, diagnoses}: Props) => {
  const id = useParams().id
  const specailPatient = patients.find(p => p.id === id);

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
  
  const findDescription = ( code: string ) => {
    const desc: Diagnose | undefined = diagnoses.find( d => d.code === code);
    return (desc === undefined) ? null : desc?.name;
  };


return (
  <div key={specailPatient?.id}>
  <h2>{specailPatient?.name} {genderPart()}</h2>

<p>ssn:&nbsp; {specailPatient?.ssn}</p>
<p>occupation:&nbsp; {specailPatient?.occupation}</p>

<h3>entries</h3>

{specailPatient?.entries
            ? specailPatient?.entries.map( e => <EntryDetails entry={e} key={e.id} /> )
            : <p >This patient has no entries.</p>
      }

{specailPatient?.entries?.map((entry, index) => 
<div key={index}>
{/* <p> {entry.date} {entry.description}</p> */}
{entry.diagnosisCodes?.map((diagnosisCode, index) => 
<ul key={index}>
  <li>{diagnosisCode} {findDescription(diagnosisCode)} </li>
</ul>)}
</div>)}
</div>
)
}
  
export default SpecialEntry