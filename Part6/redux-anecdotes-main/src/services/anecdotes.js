import axios from 'axios'

const baseUrl = '/anecdotes'

const getAll = async() => {
const response = await axios.get(baseUrl)
return response.data
}

const createNew = async(content)=>{
const newOne = {content, votes: 0}
const response = await axios.post(baseUrl, newOne)
return response.data
}

const updateVotes = async(anecdote) => {
    const changedItem = {...anecdote, votes: anecdote.votes +1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, changedItem)
    return response.data
}


export default {getAll, createNew, updateVotes }