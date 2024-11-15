import { NewPatient, Gender } from "./types"

const isString = (text: unknown): text is string => {
return  typeof text == 'string' || text instanceof String
}

const parseName = (name: unknown): string => {
if(!isString(name) || !name){
    throw new Error('Incorrect name type or missing field '+ name)
}
return name
}

const isDate = (birth: string): boolean => {
return Boolean(Date.parse(birth))
}

const parseDate = (birth: unknown): string => {
if(!isString(birth) || !birth || !isDate(birth)){
    throw new Error('Incorrect birth type or missing field. '+ birth)
}
return birth
}

const isGender= (param: string): param is Gender => {
return Object.values(Gender).map(g => g.toString()).includes(param)
}

const parseGender = (gender: unknown): Gender => {
if(!gender || !isString(gender) || !isGender(gender)){
    throw new Error('Incorrect gender type provided or missing field '+ gender)
}
return gender
}

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect occupation type or missing field '+ occupation)
    }
    return occupation
}

const parseSsn =(ssn: unknown): string => {
if(!isString(ssn) || !ssn){
    throw new Error('Incorrect occupation type or missing field ' + ssn)
}
return ssn
}

export const toNewPatientEntry = (object: unknown): NewPatient =>{
if(!object || typeof object !== 'object'){
throw new Error('Incorrect data')
}
if('name'in object &&
'dateOfBirth' in object &&
'gender'in object &&
'occupation'in object &&
'ssn'in object){
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn)
    } 
    return  newPatient
}
throw new Error('Incorrect data or missing fields')
}

