"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text == 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!isString(name) || !name) {
        throw new Error('Incorrect name type or missing field ' + name);
    }
    return name;
};
const isDate = (birth) => {
    return Boolean(Date.parse(birth));
};
const parseDate = (birth) => {
    if (!isString(birth) || !birth || !isDate(birth)) {
        throw new Error('Incorrect birth type or missing field. ' + birth);
    }
    return birth;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(g => g.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender type provided or missing field ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect occupation type or missing field ' + occupation);
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!isString(ssn) || !ssn) {
        throw new Error('Incorrect occupation type or missing field ' + ssn);
    }
    return ssn;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect data');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'gender' in object &&
        'occupation' in object &&
        'ssn' in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn)
        };
        return newPatient;
    }
    throw new Error('Incorrect data or missing fields');
};
exports.toNewPatientEntry = toNewPatientEntry;
