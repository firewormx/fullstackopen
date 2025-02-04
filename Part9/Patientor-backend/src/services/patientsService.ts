import patientsData from '../../data/patients'
import { Patient, NonSensitiveInfo, NewPatient, EntryWithoutId, Entry} from '../types'
import { v1 as uuid } from 'uuid'

const getPatientsData = (): Patient[] => {
 return  patientsData
}

const getNonSensitiveInfo = (): NonSensitiveInfo[] => {
return patientsData.map(({id,name,dateOfBirth, gender, occupation,entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
}))
}

const postPatient = (entry: NewPatient): Patient => {
const id = uuid()
const newPatient = {
id,
...entry
}
patientsData.push(newPatient)
return newPatient
}

const postNewEntry = (entry:EntryWithoutId, id: string): Patient => {
const newEntry: Entry = {
    id: uuid(),
    ...entry
}
const updatedPatient = patientsData.find(p => p.id === id)
if(!updatedPatient) throw new Error('Patient does not exist!')

updatedPatient.entries?.push(newEntry)
 return updatedPatient;
}

const getSpecialPatient = (id: string): Patient | undefined => {
const specailPatient = patientsData.find(p => p.id === id)
return specailPatient 
}


export default {getPatientsData, getNonSensitiveInfo, postPatient, getSpecialPatient, postNewEntry}

