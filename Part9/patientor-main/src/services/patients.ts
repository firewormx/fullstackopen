import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getSpecialPatient = async(id: string)=> {
const {data}= await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
return data
} 

const postNewEntry = async(id: string, object: EntryWithoutId) => {
const {data} = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, object)
return data
}
export default {
  getAll, create, getSpecialPatient, postNewEntry
};

