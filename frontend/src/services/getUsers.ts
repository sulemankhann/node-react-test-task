import Axios from '../config/axios'
import { USERS_PER_PAGE_LIMIT } from '../config/constants'

export default async function getUsers(skip = 0): Promise<Paginate<IUser>> {
    const { data } = await Axios.get<Paginate<IUser>>(
        `/users?$skip=${skip}&$limit=${USERS_PER_PAGE_LIMIT}`
    )
    return data
}
