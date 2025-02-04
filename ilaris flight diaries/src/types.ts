import { z } from 'zod';
import { newEntrySchema } from './utils'

//enums type
export enum Weather{
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy'
}

export enum Visibility {
Great = 'great',
Good = 'good',
OK = 'ok',
Poor = 'poor'
} 

export interface DiaryEntry {
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment?: string
}

export type NonSensitiveDairyEntry = Omit<DiaryEntry, 'comment'>

// export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

// infer the type from schema
export type NewDiaryEntry = z.infer<typeof newEntrySchema>; 


// export interface DiaryEntry extends NewDiaryEntry {
//     id: number
// }