// import { NewPatientSchema } from "./utils"
// import {HospitalEntrySchema, HealthCheckEntrySchema, OccupationalEntrySchema} from './utils'
// import {z} from 'zod'

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

export interface Discharge {
    date: string,
    criteria: string,
}

interface HospitalEntry extends BaseEntry{
type:'Hospital',
discharge: Discharge
}

export interface SickLeave {
  startDate: string,
  endDate: string,
}

interface OccupationalHealthcareEntry extends BaseEntry{
  type:'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry

//define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T,K> : never;

//Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>


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
    entries: Entry[]
}

export type NoSsnPatient = Omit<Patient, 'ssn'>

export type NonSensitiveInfo = Omit<Patient, 'ssn' | 'entries'>
export type NewPatient = Omit<Patient, 'id'>

// export type  NewPatient = z.infer<typeof NewPatientSchema>

export type NewBaseEntry = Omit<BaseEntry, 'id'>
