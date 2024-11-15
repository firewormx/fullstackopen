import patientsData from '../../data/patients'
import { Patients, NonSensitiveInfo, NewPatient} from '../types'
import { v1 as uuid } from 'uuid'

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

const postPatient = (entry: NewPatient): Patients => {
const id = uuid()
const newPatient = {
id,
...entry
}
patientsData.push(newPatient)
return newPatient
}

export default {getPatientsData, getNonSensitiveInfo, postPatient}

