import Axios from '../config/axios'

export default async function deleteUsers(id: number): Promise<void> {
    await Axios.delete(`/users/${id}`)
}
