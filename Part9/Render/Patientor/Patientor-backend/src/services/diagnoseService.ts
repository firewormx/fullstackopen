import { Diagnose } from "../types";
import diagnoseData from "../../data/diagnoses";


const getData = (): Diagnose[] => {
    return diagnoseData;
}

const addData = ({name, code, latin}: Diagnose) => {
diagnoseData.concat({name, code, latin})

}

export default {
    getData,
    addData
}