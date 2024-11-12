import patientsData from '../../data/patients'
import { Patients, NonSensitiveInfo} from '../types'

const getPatientsData = (): Patients[] => {
 return  patientsData
}

const getNonSensitiveInfo = (): NonSensitiveInfo[] => {
return patientsData.map(({id,name,dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
}))

}
export default {getPatientsData, getNonSensitiveInfo}

