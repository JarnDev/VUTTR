import axios from 'axios'
import { environment } from '../config/private'

const backend = axios.create({
    baseURL: environment.API_URL
})

export default backend