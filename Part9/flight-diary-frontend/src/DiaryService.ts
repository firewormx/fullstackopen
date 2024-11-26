import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry} from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return   axios.get<DiaryEntry[]>(baseUrl).then(responses => responses.data)
}
export const getNonSensitiveDiary = () => {
return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then(response => response.data)
}

export const createDairy = (object: NewDiaryEntry) => {
return axios.post<DiaryEntry>(baseUrl, object).then(response => response.data)
}
