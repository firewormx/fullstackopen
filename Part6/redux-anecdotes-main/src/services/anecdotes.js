import axios from 'axios'

const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async() => {
const response = await axios.get(baseUrl)
return response.data
}

const createNew = async(content)=>{
const newOne = {content, votes: 0}
const response = await axios.post(baseUrl, newOne)
return response.data
}


export default {getAll, createNew}