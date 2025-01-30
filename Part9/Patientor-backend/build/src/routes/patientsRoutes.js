"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { Entry } from '../types'
// import { toParseHealthCheckEntry, toParseHospitalEntry, toParseOccupationalEntr } from '../utils'
const patientsService_1 = __importDefault(require("../services/patientsService"));
// import { NewPatientSchema} from '../utils/toNewEntry'
const toNewEntry_1 = __importDefault(require("../utils/toNewEntry"));
const toNewPatient_1 = __importDefault(require("../utils/toNewPatient"));
const zod_1 = require("zod");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getPatientsData());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(patientsService_1.default.getSpecialPatient(id));
});
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        res.status(400).send({ error: 'unknown error' });
        next(error);
    }
};
router.post('/', (req, res) => {
    try {
        const newPatient = (0, toNewPatient_1.default)(req.body);
        const addedPatient = patientsService_1.default.postPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400);
        console.log(errorMessage);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const foudSpecialPatient = patientsService_1.default.getSpecialPatient(req.params.id);
        if (foudSpecialPatient) {
            const newEntry = (0, toNewEntry_1.default)(req.body);
            const addedEntry = patientsService_1.default.postNewEntry(foudSpecialPatient, newEntry);
            res.json(addedEntry);
        }
    }
    catch (error) {
        let errorMessage = 'something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400);
        console.log(errorMessage);
    }
});
router.use(errorMiddleware);
exports.default = router;
