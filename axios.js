import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/',
  // timeout: 7000,
})

export default axiosClient
