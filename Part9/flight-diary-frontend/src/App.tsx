import { useState, useEffect, SyntheticEvent } from 'react'
import { DiaryEntry, Visibility, Weather } from './types'
import { getAllDiaries, createDairy } from './DiaryService'
import axios from 'axios'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState(null)


  useEffect(()=> {
      getAllDiaries().then(data => {
        setDiaries(data)
      })
  }, [])

const handleFormSubmit = (event: SyntheticEvent) => {
event.preventDefault()

const newDiary = {
  date,
  visibility: visibility as Visibility,
  weather: weather as Weather,
  comment
}

  createDairy(newDiary).then(data => {
    setDiaries(diaries.concat(data))
      setDate('')
      setComment('')
      setVisibility('')
      setWeather('')
  
  }
).catch(error => {
    if(axios.isAxiosError(error)){
      console.log(error.status)
      console.error(error.response)
      const errorMessage = error.response?.data
      setError(errorMessage)
      setTimeout(() => {
        setError(null)
        setDate('')
        setComment('')
        setVisibility('')
        setWeather('')
      }, 2000)
    
      }else{
        console.error(error)
      }
  }
  )
}

  return (
    <><div>
      {error && <p style={{color: 'red'}}>{error}</p>}
    <h2>Add new entry</h2>
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
        <label htmlFor="date">
        date<input type="date" id="date" value={date} onChange={(event)=> setDate(event.target.value)}/>
        </label>
        </div>
        <div>
        visibility&nbsp;&nbsp;
        <label htmlFor="great">great</label>
        <input type="radio" name="visibility" id="great" value='great' onChange={(event)=> setVisibility(event.target.value)}/>
        <label htmlFor="good">good</label>
        <input type="radio" name="visibility" id="good" value='good' onChange={(event)=> setVisibility(event.target.value)}/>
        <label htmlFor="ok">ok</label>
        <input type="radio" name="visibility" id="ok" value='ok' onChange={(event)=> setVisibility(event.target.value)}/>
        <label htmlFor="poor">poor</label>
       <input type="radio" name="visibility" id="poor" value='poor' onChange={(event)=> setVisibility(event.target.value)}/>
        </div>
        <div>
        weather&nbsp;&nbsp;
        <label htmlFor="sunny">sunny</label>
        <input type="radio" name="weather" id="sunny" value='sunny' onChange={(event)=> setWeather(event.target.value)}/>
        <label htmlFor="rainy">rainy</label>
        <input type="radio" name="weather" id="rainy" value='rainy' onChange={(event)=> setWeather(event.target.value)}/>
        <label htmlFor="cloudy">cloudy</label>
        <input type="radio" name="weather" id="cloudy" value='cloudy' onChange={(event)=> setWeather(event.target.value)}/>
        <label htmlFor="stormy">stormy</label>
       <input type="radio" name="weather" id="stormy" value='stormy' onChange={(event)=> setWeather(event.target.value)}/>
       <label htmlFor="stormy">windy</label>
       <input type="radio" name="weather" id="windy" value='windy' onChange={(event)=> setWeather(event.target.value)}/>
        </div>
        <div>
        <label htmlFor="comment">
        comment<input type="text" id="comment" value={comment} onChange={(event)=> setComment(event.target.value)} />
        </label>
        </div>
    <button>add</button>
      </form>
      </div>
     <h2>Diary entries</h2>
     <div>
   {diaries.map(d => 
   <div key={d.id}>
   <h3>{d.date}</h3>
    <p>visibility: {d.visibility}</p>
    <p>weather:{d.weather}</p>
   </div>)}
     </div>
    </div>
    </>
  )
}

export default App
