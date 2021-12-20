import Axios from '../config/axios'

export default async function createUser(userData: any): Promise<IUser> {
    const { data } = await Axios.post(`/users`, userData)
    return data
}
