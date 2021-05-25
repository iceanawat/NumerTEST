const axios = require('axios')

const api = axios.create({
    baseURL : "https://my-json-server.typicode.com/iceanawat/Numerical-Main/"
})

const getAllroot = () => api.get('/root-of-equation')

const apis = {
    getAllroot
}

export default apis