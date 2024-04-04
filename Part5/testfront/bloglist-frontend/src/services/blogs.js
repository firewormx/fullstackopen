// import axios from 'axios'
// const baseUrl = '/api/blogs'

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

// export default { getAll }
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObj) => {
 const config = {
  headers: {Authorization: token}
 }
 const response = await axios.post(baseUrl, newObj, config)
 return response.data
}

const update = async(id, newObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObj)
return response.data
}

export default { getAll , create, update, setToken}