import { NewPatientSchema } from "./utils"
import {z} from 'zod'

interface BaseEntry{
  id: string,
  description:string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnose['code']>
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface HealthCheckEntry extends BaseEntry {
type:'HealthCheck',
healthCheckRating: HealthCheckRating,
}

interface HospitalEntry extends BaseEntry{
type:'Hospital',
discharge: {
  date: string,
  criteria: string,
},
}

interface OccupationalHealthcareEntry extends BaseEntry{
  type:'OccupationalHealthcare',
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string,
  },
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry

//define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T,K> : never;

//Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>


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

export interface Patient{
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: Gender,
    occupation: string,
    entries?: Entry[]
}

export type NonSensitiveInfo = Omit<Patient, 'ssn' | 'entries'>
// export type NewPatient = Omit<Patients, 'id'>
export type  NewPatient = z.infer<typeof NewPatientSchema>