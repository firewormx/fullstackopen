"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
// import {z} from 'zod'
// export const NewPatientSchema = z.object({
//     name: z.string(),
//     dateOfBirth: z.string().date(),
//     gender: z.nativeEnum(Gender),
//     occupation: z.string(),
//     ssn: z.string().optional(),
//     entries:z.discriminatedUnion('type',[
//         z.object({type: z.literal('HealthCheck'), 
//                  healthCheckRating: z.nativeEnum(HealthCheckRating)}),
//        z.object({type: z.literal('Hospital'),
//         discharge: z.object({date: z.string().date(), criteria: z.string(),})
//        }),
//        z.object({type: z.literal('OccupationalHealthcare'),
//         employerName: z.string(),
//         sickLeave: z.object({
//             startDate: z.string(),
//             endDate: z.string(),
//         }).optional()
//        })
//     ])
// })
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name.');
    }
    return name;
};
const isDate = (dateOfBirth) => {
    return Boolean(Date.parse(dateOfBirth));
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(gender);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender info: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing dadta');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'gender' in object &&
        'occupation' in object &&
        'ssn' in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
            entries: []
        };
        return newPatient;
    }
    throw new Error('Incorrect data: a field missing.');
};
exports.default = toNewPatient;