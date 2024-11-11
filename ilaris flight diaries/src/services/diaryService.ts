import diaries from '../../data/diaryEntries';
import { NonSensitiveDairyEntry, DiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries
};

const getNonSensitiveEntries = (): NonSensitiveDairyEntry[]=> {
return diaries.map(({id, date, weather, visibility}) => ({
id,
date,
weather,
visibility
}));
}

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary
};