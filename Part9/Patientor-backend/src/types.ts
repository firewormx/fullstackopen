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
export type NewPatient = Omit<Patients, 'id'>