import { NewDiaryEntry} from "./types";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    console.log(object)//fake the return value to avoid broken state
const newEntry : NewDiaryEntry = {
    date:'2024-11-13',
    weather:'sunny',
    visibility:'good',
    comment:'fake news'
};
return newEntry
}

const isString = (text: unknown): text is string => {
return typeof text === 'string' || text instanceof String;
}

const parseComment = (comment: unknown): string | undefined => {
if(!comment || !isString(comment)){
    throw new Error('Incorrect or missing comment!')
}
return comment;
}

export default toNewDiaryEntry

