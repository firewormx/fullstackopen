import { NewPatientSchema } from "./utils"
import {z} from 'zod'

export interface Diagnose {
  code:  string,
 name:  string,
latin?:  string
}

export  enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export interface Patients{
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: Gender,
    occupation: string
}

export type NonSensitiveInfo = Omit<Patients, 'ssn'>
// export type NewPatient = Omit<Patients, 'id'>
export type  NewPatient = z.infer<typeof NewPatientSchema>