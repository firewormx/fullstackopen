import { NewDiaryEntry, Weather, Visibility} from "./types";
import {z} from 'zod'

// //type guards
// const isString = (text: unknown): text is string => {
// return typeof text === 'string' || text instanceof String;
// }

// const parseComment = (comment: unknown): string | undefined => {
// if(!isString(comment)){
//     throw new Error('Incorrect or missing comment!')
// }
// return comment;
// }

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date))
//     }

// const parseDate = (date: unknown): string => {
// if(!isString(date) || !isDate(date)){
//     throw new Error('Incorrect or missing date:' + date)
// }
// return date;
// }

// const isWeather = (param: string):param is Weather=> {
// return Object.values(Weather).map(v => v.toString()).includes(param);
// }

// const parseWeather = (weather: unknown): Weather => {
// if(!isString(weather) || !isWeather(weather)){
//     throw new Error('Incorrect or missing weather: '+ weather)
// }
// return weather;
// }

// const isVisibility = (param: string): param is Visibility => {
// return Object.values(Visibility).map(v => v.toString()).includes(param)
// }

// const parseVisibility = (visibility: unknown): Visibility => {
// if(!isString(visibility) || !isVisibility(visibility)) {
//     throw new Error('Incorrect or missing visibility: '+ visibility)
// }
// return visibility
// }

export const newEntrySchema = z.object({
    weather: z.nativeEnum(Weather),
    visibility: z.nativeEnum(Visibility),
    date: z.string().date(),
    comment: z.string().optional()
  });

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    return newEntrySchema.parse(object);
  };


// const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//     console.log(object)//fake the return value to avoid broken state
//     if(!object || typeof object !== 'object'){
//         throw new Error('Incorrect or missing data')
//     }
//     if('comment' in object && 
//         'date'  in object && 
//         'weather' in object && 
//         'visibility' in object){
//         const newEntry : NewDiaryEntry = {
//             date: parseDate(object.date),
//             weather: parseWeather(object.weather),
//             visibility: parseVisibility(object.visibility),
//             comment: parseComment(object.comment)
//         };
//         return newEntry
//     }
//     throw new Error('Incorrect data: some fields are missing.')
// // }
export default toNewDiaryEntry
