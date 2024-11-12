import { Diagnose } from "../types";
import diagnoseData from "../../data/diagnoses";


const getData = (): Diagnose[] => {
    return diagnoseData;
}

const addData = () => {
    return null
}

export default {
    getData,
    addData
}