"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatientsData = () => {
    return patients_1.default;
};
const getNonSensitiveInfo = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
// const getNoSsnPatient = (): NoSsnPatient[] => {
//     return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => 
//     ({
//         id,
//         name,
//         dateOfBirth,
//         gender,
//         occupation,
//         entries
//     }));
// };
const postPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const postNewEntry = (patient, entry) => {
    var _a;
    const id = (0, uuid_1.v1)();
    const newEntry = Object.assign({ id }, entry);
    (_a = patient === null || patient === void 0 ? void 0 : patient.entries) === null || _a === void 0 ? void 0 : _a.push(newEntry);
    return newEntry;
};
const getSpecialPatient = (id) => {
    const specailPatient = patients_1.default.find(p => p.id === id);
    return specailPatient;
};
exports.default = { getPatientsData, getNonSensitiveInfo, postPatient, getSpecialPatient, postNewEntry };
