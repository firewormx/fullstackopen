import { Patient } from "../types"
import patientService from '../services/patients'

interface Props{
    patients:Patient[],
}

const SpecialEntry= ({patients}: Props) => {
return <div>
    {patients.map(p => 
    <div key={p.id}>
    <h2>{p.name}</h2>&nbsp;{p.gender}
  <p>ssn:&nbsp; {p.ssn}</p>
  <p>occupation:&nbsp; {p.occupation}</p>
  </div>)}
</div>
}
// const getSpecialEntry = async(id: string) => {
//     const [error, setError] = useState('')
//     try{ 
//         const specailPatient = await patientService.getSpecialPatient(id)
//         return (
//           <div>
//               <h2>{specailPatient.name}</h2>&nbsp;&nbsp;{specailPatient.gender}
//             <p>ssn:&nbsp; {specailPatient.ssn}</p>
//             <p>occupation:&nbsp; {specailPatient.occupation}</p>
//             </div>
//     )
//       }catch(e: unknown){
//     if(axios.isAxiosError(e)){
//       if(e?.response?.data && typeof e?.response?.data === 'string'){
//         const message = e.response.data.replace('Something went wrong. Error: ', '');
//         console.error(message);
//         setError(message);
//       }else{
//         setError("Unrecognized axios error");
//       }}else{
//         console.error("Unknown error", e);
//         setError("Unknown error");
//       }
//     }
// }
// const SpecialEntry= (id: string) => {
// return <getSpecialEntry />
    
//     }
  
export default SpecialEntry