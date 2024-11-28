import { NewPatientSchema } from "./utils"
import {z} from 'zod'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry{
}

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
    occupation: string,
    entries?: Entry[]
}

export type NonSensitiveInfo = Omit<Patients, 'ssn' | 'entries'>
// export type NewPatient = Omit<Patients, 'id'>
export type  NewPatient = z.infer<typeof NewPatientSchema>