import express from 'express'
import { Response } from 'express'
import { Patients } from '../types'
import patientsService from '../services/patientsService'
const router = express.Router()

router.get('/', (_req, res: Response<Patients[]>) => {
res.send(patientsService.getNonSensitiveInfo())
})

export default router