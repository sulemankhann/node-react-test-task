declare interface BaseResponse {
    createdAt: string
    updatedAt: string
    id: number
}

declare interface BaseUser {
    name: string
    profilePhoto?: string
    file?: string
    contactInformation: string
}

declare interface IUser extends BaseResponse, BaseUser {}

declare interface Paginate<T> {
    skip: number
    total: number
    limit: number
    data: T[]
}
