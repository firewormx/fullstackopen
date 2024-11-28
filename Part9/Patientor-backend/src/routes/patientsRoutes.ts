import express from 'express'
import { Response, Request, NextFunction } from 'express'
import { NewPatient, Patients } from '../types'
import patientsService from '../services/patientsService'
import { NewPatientSchema } from '../utils'
import {z} from 'zod'

const router = express.Router()

router.get('/', (_req, res: Response<Patients[]>) => {
res.send(patientsService.getPatientsData())
})

router.get('/:id', (_req, res: Response<Patients>) => {
    const id = _req.params.id
res.send(patientsService.getSpecialPatient(id))
})

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
try{
    NewPatientSchema.parse(req.body)
    next()
}catch(error: unknown){
    next(error)
}
}

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction )=> {
if(error instanceof z.ZodError){
res.status(400).send({error: error.issues})
}else{
    res.status(400).send({error: 'unknown error'})
    next(error)
}
}

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patients>) => {
// const newPatientEntry = NewPatientSchema.parse(req.body)
const addedPatient = patientsService.postPatient(req.body)
res.json(addedPatient)
})

router.use(errorMiddleware)


export default router