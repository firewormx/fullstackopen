import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => axios.get(baseUrl).then(res => res.data)

export const createNew = (newAnecdote) => {
    axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const updateOne =(updatedAnecdote) => {
axios.put(`${baseUrl}/${updatedAnecdote.id}`).then(res => res.data)
}
