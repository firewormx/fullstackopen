"use strict";
// import { NewPatientSchema } from "./utils"
// import {HospitalEntrySchema, HealthCheckEntrySchema, OccupationalEntrySchema} from './utils'
// import {z} from 'zod'
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = exports.HealthCheckRating = void 0;
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating || (exports.HealthCheckRating = HealthCheckRating = {}));
var Gender;
(function (Gender) {
    Gender["Female"] = "female";
    Gender["Male"] = "male";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
