import Axios from 'axios'
import { SERVER_URL } from './constants'

export default Axios.create({
    baseURL: SERVER_URL,
})
