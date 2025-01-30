"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description!');
    }
    return description;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist!');
    }
    return specialist;
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
const isNumber = (text) => {
    return typeof text === 'number' || text instanceof Number;
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthcheck rating: ' + healthCheckRating + 'this one!');
    }
    return healthCheckRating;
};
const parseCriteria = (criteria) => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing criteria info');
    }
    return criteria;
};
const parseDischarge = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing discharge date or criteria');
    }
    if ('date' in object &&
        'criteria' in object) {
        const discharge = {
            date: parseDate(object.date),
            criteria: parseCriteria(object.criteria)
        };
        return discharge;
    }
    throw new Error('Incorrect data: date or criteria missing.');
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing name');
    }
    return employerName;
};
const parseSickLeave = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('startDate' in object
        && 'endDate' in object) {
        const sickLeave = {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate)
        };
        return sickLeave;
    }
    throw new Error('Incorrect data: a field missing.');
};
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('description' in object &&
        'date' in object &&
        'specialist' in object) {
        const newBaseEntry = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
        };
        if ('diagnosisCodes' in object) {
            newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object);
        }
        if ('type' in object) {
            switch (object.type) {
                case 'HealthCheck':
                    if ('healthCheckRating' in object) {
                        const healthCheckEntry = Object.assign(Object.assign({}, newBaseEntry), { type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
                        return healthCheckEntry;
                    }
                    throw new Error('Incorrect data: health check rating missing');
                case 'Hospital':
                    if ('discharge' in object) {
                        const disChargeEntry = Object.assign(Object.assign({}, newBaseEntry), { type: 'Hospital', discharge: parseDischarge(object.discharge) });
                        return disChargeEntry;
                    }
                    throw new Error('Incorrect data: discharge data missing');
                case 'OccupationalHealthcare':
                    if ('employerName' in object) {
                        const occupationalHealthcareEntry = 'sickLeave' in object
                            ? Object.assign(Object.assign({}, newBaseEntry), { type: 'OccupationalHealthcare', employerName: parseEmployerName(object.employerName), sickLeave: parseSickLeave(object.sickLeave) }) : Object.assign(Object.assign({}, newBaseEntry), { type: 'OccupationalHealthcare', employerName: parseEmployerName(object.employerName) });
                        return occupationalHealthcareEntry;
                    }
                    throw new Error('Incorrect data: employerName missing');
                default:
                    throw new Error('Incorrect data: some fields are missing');
            }
        }
    }
    throw new Error('Incorrect data: some fields are missing.');
};
exports.default = toNewEntry;
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
