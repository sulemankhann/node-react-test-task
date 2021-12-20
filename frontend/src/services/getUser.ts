import Axios from '../config/axios'

export default async function getUser(id: number): Promise<IUser> {
    const { data } = await Axios.get<IUser>(`/users/${id}`)
    return data
}
