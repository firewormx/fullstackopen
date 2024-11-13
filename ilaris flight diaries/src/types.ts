export type Weather = 'sunny'|'rainy'|'cloudy'|'windy'|'stormy';

export type Visibility = 'great' | 'good' | 'ok' |'poor';

export interface DiaryEntry {
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment?: string
}

// const getNonSensitiveEntries = ():Pick<DiaryEntry, 'id'| 'date'| 'weather'|'visibility'>[] => {
// }
// const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
// }

export type NonSensitiveDairyEntry = Omit<DiaryEntry, 'comment'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>