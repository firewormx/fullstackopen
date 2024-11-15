import express from 'express'
import { Response } from 'express'
import { Patients } from '../types'
import patientsService from '../services/patientsService'
import { toNewPatientEntry } from '../utils'

const router = express.Router()

router.get('/', (_req, res: Response<Patients[]>) => {
res.send(patientsService.getNonSensitiveInfo())
})

router.post('/', (req, res) => {
    try{
const newPatientEntry = toNewPatientEntry(req.body)
const addedPatient = patientsService.postPatient(newPatientEntry)
res.json(addedPatient)
    }catch(error: unknown){
        let errorMessage = 'something wrong happened.'
        if(error instanceof Error){
            errorMessage += 'Error: '+ error.message
        }
        res.status(400).send(errorMessage)
    }
})


export default router