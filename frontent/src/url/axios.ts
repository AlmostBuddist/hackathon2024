import axios from 'axios'

export const defaultQuery = axios.create({
    baseURL: 'http://localhost:5000'
})