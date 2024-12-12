import express from 'express'
import { Response, Request, NextFunction } from 'express'
import { NewPatient, Patient, Entry} from '../types'
// import { Entry } from '../types'
// import { toParseHealthCheckEntry, toParseHospitalEntry, toParseOccupationalEntr } from '../utils'
import patientsService from '../services/patientsService'
// import { NewPatientSchema} from '../utils/toNewEntry'
import toNewEntry from '../utils/toNewEntry'
import toNewPatient from '../utils/toNewPatient'
import {z} from 'zod'

const router = express.Router()

router.get('/', (_req, res: Response<Patient[]>) => {
res.send(patientsService.getPatientsData())
})

router.get('/:id', (req, res: Response<Patient>) => {
    const id = req.params.id
res.send(patientsService.getSpecialPatient(id))
})

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction )=> {
if(error instanceof z.ZodError){
res.status(400).send({error: error.issues})
}else{
    res.status(400).send({error: 'unknown error'})
    next(error)
}
}

router.post('/', (req: Request<unknown, unknown, NewPatient>, res: Response<Patient> ) => {
try{
    const newPatient = toNewPatient(req.body)
    const addedPatient = patientsService.postPatient(newPatient)
    res.json(addedPatient)
}catch(error: unknown){
    let errorMessage = 'Something went wrong.'
    if(error instanceof Error){
        errorMessage += 'Error: ' + error.message
    }
    res.status(400);
    console.log(errorMessage)
}
})

router.post('/:id/entries',(req: Request, res: Response<Entry>) => {
    try{
        const foudSpecialPatient = patientsService.getSpecialPatient(req.params.id)
        if(foudSpecialPatient){
            const newEntry = toNewEntry(req.body)
            const addedEntry = patientsService.postNewEntry(newEntry, foudSpecialPatient)
            res.json(addedEntry)
        }
    }catch(error: unknown){
 let errorMessage = 'something went wrong.'
 if(error instanceof Error){
    errorMessage += ' Error: '+ error.message;
 }
 res.status(400);
 console.log(errorMessage)
    }
})

router.use(errorMiddleware)


export default router