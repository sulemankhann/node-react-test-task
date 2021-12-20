import Axios from '../config/axios'

export default async function updateUser(
    id: number,
    userData: any
): Promise<IUser> {
    const { data } = await Axios.patch(`/users/${id}`, userData)
    return data
}
