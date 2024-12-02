import axios from "axios";
import { Diagnose } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnose[]>(
    `${apiBaseUrl}/diagnose`
  );

  return data;
};

const getSpecialDiagnose = async(id: string)=> {
    const {data}= await axios.get<Diagnose>(`${apiBaseUrl}/diagnose/${id}`);
    return data
    } 
    
    export default {
      getAll, getSpecialDiagnose
    };
    
    