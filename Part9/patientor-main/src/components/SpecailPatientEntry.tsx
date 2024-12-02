import { Patient, Diagnose } from "../types"
import { useParams } from "react-router-dom"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Man3Icon from '@mui/icons-material/Man3';

interface Props{
    patients:Patient[],
    diagnoses: Diagnose[]
}

const SpecialEntry= ({patients, diagnoses}: Props) => {
  const id = useParams().id
  const specailPatient = patients.find(p => p.id === id)

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
  
// ["a", "b", "c"].findIndex()
 const codeArrayStr = specailPatient?.entries?.map(entry => entry.diagnosisCodes?.join(""))!

    const diagnosisArray = () => {
    return   diagnoses.filter(d => codeArrayStr.includes(d.code)).map(d => d)
    } 


return (
  <div key={specailPatient?.id}>
  <h2>{specailPatient?.name} {genderPart()}</h2>

<p>ssn:&nbsp; {specailPatient?.ssn}</p>
<p>occupation:&nbsp; {specailPatient?.occupation}</p>
<h3>entries</h3>
{specailPatient?.entries?.map(entry => <div key={entry.id}>
<p> {entry.date} {entry.description}</p>
{entry.diagnosisCodes?.map(diagnosisCode => <ul key={diagnosisCode}>
  <li>{diagnosisCode}  {diagnosisArray?.name}</li>
</ul>)}
</div>)}
</div>
)
}
  
export default SpecialEntry