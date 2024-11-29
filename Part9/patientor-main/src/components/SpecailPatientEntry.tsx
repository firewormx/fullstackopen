import { Patient } from "../types"
import { useParams } from "react-router-dom"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Man3Icon from '@mui/icons-material/Man3';
interface Props{
    patients:Patient[],
}

const SpecialEntry= ({patients}: Props) => {
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

return (
  <div key={specailPatient?.id}>
  <h2>{specailPatient?.name} {genderPart()}</h2>

<p>ssn:&nbsp; {specailPatient?.ssn}</p>
<p>occupation:&nbsp; {specailPatient?.occupation}</p>
</div>
)
}
  
export default SpecialEntry