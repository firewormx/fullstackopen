import patientsData from '../../data/patients'
import { Patient, NonSensitiveInfo, NewPatient, EntryWithoutId, Entry} from '../types'
import { v1 as uuid } from 'uuid'

const getPatientsData = (): Patient[] => {
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

// const getNoSsnPatient = (): NoSsnPatient[] => {
//     return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => 
//     ({
//         id,
//         name,
//         dateOfBirth,
//         gender,
//         occupation,
//         entries
//     }));
// };

const postPatient = (entry: NewPatient): Patient => {
const id = uuid()
const newPatient = {
id,
...entry
}
patientsData.push(newPatient)
return newPatient
}

const postNewEntry = (patient: Patient, entry:EntryWithoutId,) => {
const id = uuid();
const newEntry = {
    id,
    ...entry
}
 patient?.entries?.push(newEntry)
 return newEntry
}

const getSpecialPatient = (id: string): Patient | undefined => {
const specailPatient = patientsData.find(p => p.id === id)
return specailPatient 
}


export default {getPatientsData, getNonSensitiveInfo, postPatient, getSpecialPatient, postNewEntry}

