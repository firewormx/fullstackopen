const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())
app.use(express.static('dist'))

  let anecdotes = [
      {
        "content": "If it hurts, do it more often",
        "id": "47145",
        "votes": 17
      },
      {
        "content": "Adding manpower to a late software project makes it later!",
        "id": "21149",
        "votes": 8
      },
      {
        "content": "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "id": "69581",
        "votes": 3
      },
      {
        "content": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "id": "36975",
        "votes": 2
      },
      {
        "content": "Premature optimization is the root of all evil.",
        "id": "25170",
        "votes": 1
      },
      {
        "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "id": "98312",
        "votes": 0
      },
      {
        "id": "64c1",
        "content": "so happy to render new note!",
        "votes": 0
      },
      {
        "id": "d73b",
        "content": "sending data to backend successfully!",
        "votes": 1
      },
      {
        "id": "f206",
        "content": "is it safe to save data to backend?",
        "votes": 0
      },
      {
        "id": "a19b",
        "content": "Feb is comming!",
        "votes": 0
      },
      {
        "id": "a2ed",
        "content": "test again! x 2",
        "votes": 1
      }
    ]

app.get('/', (req, res) => {
    res.send('<h1>Hello anecdotes!</h1>')
}
)
app.get('/anecdotes', (req, res) => {
    res.json(anecdotes)
})

app.get('/anecdotes/:id', (req, res) => {
    const id = req.params.id
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    res.json(anecdote)
}
)

app.post('/anecdotes', (req, res) => {
    const anecdote = req.body
    anecdote.id = Math.random().toString(36).substring(7)
    anecdotes = anecdotes.concat(anecdote)
    res.json(anecdote)
}
)

app.put('/anecdotes/:id', (req, res) => {       
    const id = req.params.id
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    anecdotes = anecdotes.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
    res.json(updatedAnecdote)
}
)

app.delete('/anecdotes/:id', (req, res) => {        
    const id = req.params.id
    anecdotes = anecdotes.filter(anecdote => anecdote.id !== id)
    res.status(204).end()
}       
)

const PORT = 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)