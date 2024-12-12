import { Discharge,HealthCheckRating, Diagnose, EntryWithoutId, NewBaseEntry, SickLeave} from '../types'


const isString = (text: unknown): text is string => {
return typeof text === 'string' || text instanceof String;
}

const parseDescription = (description: unknown): string => {
if(!description || !isString(description)){
    throw new Error('Incorrect or missing description!')
}
return description;
}

const isDate = (date: string): boolean => {
return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
if(!date ||!isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date: ' + date)
}
return date
}

const parseSpecilist = (specialist: unknown): string => {
    if(!specialist || !isString(specialist)){
        throw new Error('Incorrect or missing specialist!')
    }
    return specialist
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
    if(!object || typeof object !=='object' || !('diagnosisCodes' in object )){
    return [] as Array<Diagnose['code']>
    }
    return object.diagnosisCodes as Array<Diagnose['code']>
    }

const isNumber = (text: unknown): text is number => {
return typeof text === 'number'|| text instanceof Number
}

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
    }
    
    const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if(!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)){
        throw new Error('Incorrect or missing healthcheck rating: '+ healthCheckRating)
    }
    return healthCheckRating
    }

const parseCriteria = (criteria: unknown): string => {
if(!criteria || !isString(criteria)){
    throw new Error('Incorrect or missing criteria info')
}
return criteria
}

const parseDischarge = (object: unknown): Discharge => {
if(!object || typeof object !=='object'){
    throw new Error('Incorrect or missing discharge date or criteria')
}
if('date' in object &&
    'criteria' in object
){
    const discharge : Discharge ={
        date: parseDate(object.date),
        criteria: parseCriteria(object.criteria)
    }
    return discharge
}
throw new Error('Incorrect data: date or criteria missing.')
}

const parseEmployerName = (employerName: unknown): string => {
if(!employerName || !isString(employerName)){
    throw new Error('Incorrect or missing name')
}
return employerName
}

const parseSickLeave = (object: unknown): SickLeave => {
if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data')
}
if('startDate' in object
    && 'endDate' in object
){
    const sickLeave: SickLeave = {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate)
    }
return sickLeave;
}
throw new Error('Incorrect data: a field missing.')
}

const toNewEntry = (object: unknown): EntryWithoutId => {
        if(!object || typeof object !== 'object'){
            throw new Error('Incorrect or missing data')
        }
        if('description' in object && 
            'date'  in object && 
            'specialist' in object ){
            const newBaseEntry: NewBaseEntry = 'diagnosisCodes' in object
            ? {
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecilist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        }:  {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecilist(object.specialist)
        }
        if('type' in object){
            switch(object.type){
                case 'HealthCheck':
                    if('healthCheckRating' in object){
                        const healthCheckEntry : EntryWithoutId={
                            ...newBaseEntry,
                            type: 'HealthCheck',
                            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                        }
                  return healthCheckEntry;
                    }
                    throw new Error('Incorrect data: health check rating missing');
                case 'Hospital':
                    if('discharge' in object){
                        const disChargeEntry: EntryWithoutId = {
                       ...newBaseEntry,
                       type: 'Hospital',
                       discharge: parseDischarge(object.discharge)
                        }
                        return disChargeEntry;
                    }
                    throw new Error('Incorrect data: discharge data missing');
                case 'OccupationalHealthcare':
                  if('employerName' in object){
                    const occupationalHealthcareEntry : EntryWithoutId = 'sickLeave' in object
                     ?{
                        ...newBaseEntry,
                        type:'OccupationalHealthcare',
                        employerName: parseEmployerName(object.employerName),
                        sickLeave: parseSickLeave(object.sickLeave)     
                            }
                     : {
                        ...newBaseEntry,
                        type:'OccupationalHealthcare',
                        employerName: parseEmployerName(object.employerName),
                            }
                    return occupationalHealthcareEntry;
                        }
             throw new Error('Incorrect data: employerName missing')
            }
        }
    }
    throw new Error('Incorrect data: some fields are missing.')
}

export default toNewEntry;




// export const HospitalEntrySchema = z.object( {
//     description: z.string(),
//     date: z.string(),
//     specialist: z.string(),
//     diagnosisCodes: z.object(parseDiagnosisCodes),
//     type: z.string().includes('HealthCheck'),
//     discharge: z.object({
//         date: z.string(),
//         criteria: z.string()
//     })
// })


// export const HealthCheckEntrySchema = z.object({
//     description: z.string(),
//     date: z.string(),
//     specialist: z.string(),
//     diagnosisCodes: z.array(z.string()).optional(),
//     type: z.string().includes('Hospital'),
//     healthCheckRating: z.nativeEnum(HealthCheckRating),
// })

// export const OccupationalEntrySchema = z.object({
//     description: z.string(),
//     date: z.string(),
//     specialist: z.string(),
//     diagnosisCodes: z.array(z.string()).optional(),
//     type: z.string().includes('OccupationalHealthcare'),
//     employerName: z.string(),
//     sickLeave: z.object({
//         startDate: z.string(),
//         endDate: z.string()
//     }).optional()
// })


// export const toParseHospitalEntry = (object: unknown) => {
// return HospitalEntrySchema.parse(object)
// }

// export const toParseHealthCheckEntry = (obejct: unknown) => {
//     return HealthCheckEntrySchema.parse(obejct)
// }

// export const toParseOccupationalEntr = (object: unknown) => {
// return OccupationalEntrySchema.parse(object)
// }