/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import cn from 'classnames'
import { Formik } from 'formik'
import createUser from '../services/createUser'
import getUser from '../services/getUser'
import PreviewPhoto from './PreviewPhoto'
import { SERVER_URL } from '../config/constants'
import updateUser from '../services/updateUser'

const inputStyle =
    'appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
const labelStyle =
    'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'

interface IErrorFields {
    name?: string
    contactInformation?: string
    file?: string
}

const UserForm: React.FC = () => {
    const [editUser, setEditUser] = useState<IUser | null>(null)
    const navigate = useNavigate()

    const editUserId = useLocation().search

    useEffect(() => {
        const id = new URLSearchParams(editUserId).get('edit')
        if (id) {
            ;(async () => {
                const user = await getUser(+id)
                setEditUser(user)
            })()
        } else {
            setEditUser(null)
        }
    }, [editUserId])

    const handleCreateUser = async (
        userData: Record<any, any>
    ): Promise<void> => {
        const userFormData = new FormData()

        Object.entries(userData).forEach(([key, value]: any) =>
            userFormData.append(key, value)
        )

        if (editUser) {
            const updatedUser = await updateUser(editUser.id, userFormData)
            if (updatedUser) navigate('/')
            return
        }

        const createdUser = await createUser(userFormData)
        if (createdUser) {
            navigate('/')
        }
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: editUser?.name || '',
                contactInformation: editUser?.contactInformation || '',
                file: editUser?.profilePhoto || undefined,
            }}
            validate={(values) => {
                const errors: IErrorFields = {}
                if (!values.name.trim()) {
                    errors.name = 'Required'
                } else if (!values.contactInformation.trim()) {
                    errors.contactInformation = 'Required'
                } else if (!values.file) {
                    errors.file = 'Required'
                }
                return errors
            }}
            onSubmit={handleCreateUser}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
            }) => (
                <div className="pt-10 pb-4 px-4 w-full max-w-lg bg-white mx-auto mt-16">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6">
                            <label className={labelStyle} htmlFor="name">
                                Name
                                <input
                                    className={cn(inputStyle, {
                                        'border-red-500':
                                            errors.name && touched.name,
                                    })}
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                            </label>

                            {errors.name && touched.name && (
                                <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p>
                            )}
                        </div>

                        <div className="w-full px-3 mb-6">
                            <label
                                className={labelStyle}
                                htmlFor="contactInformation"
                            >
                                Contact Information
                                <input
                                    className={cn(inputStyle, {
                                        'border-red-500':
                                            errors.contactInformation &&
                                            touched.contactInformation,
                                    })}
                                    id="contactInformation"
                                    type="text"
                                    name="contactInformation"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.contactInformation}
                                />
                            </label>
                            {errors.contactInformation &&
                                touched.contactInformation && (
                                    <p className="text-red-500 text-xs italic">
                                        Please fill out this field.
                                    </p>
                                )}
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label
                                className={labelStyle}
                                htmlFor="profilePhoto"
                            >
                                Profile Image
                                <input
                                    className="w-full"
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    onBlur={handleBlur}
                                    onChange={(event) => {
                                        if (event.currentTarget.files)
                                            setFieldValue(
                                                'file',
                                                event.currentTarget.files[0]
                                            )
                                    }}
                                />
                            </label>
                            {errors.file && touched.file && (
                                <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p>
                            )}
                            <div className="mt-4">
                                {values.file &&
                                typeof values.file !== 'string' ? (
                                    <PreviewPhoto file={values.file} />
                                ) : editUser?.profilePhoto ? (
                                    <img
                                        alt="user profile"
                                        loading="lazy"
                                        src={`${SERVER_URL}/uploads/${editUser.profilePhoto}`}
                                        className="mt-4 md:mr-4 lg:mr-6 xl:mr-9 md:mt-0 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full object-cover"
                                    />
                                ) : null}
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full mx-3 bg-purple-900 text-white py-4"
                            onClick={() => handleSubmit()}
                        >
                            {editUser ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default UserForm
