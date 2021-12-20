import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import Layout from '../components/Layout'
import ProfileCard from '../components/ProfileCard'
import { SERVER_URL } from '../config/constants'
import deleteUser from '../services/deleteUser'
import getUser from '../services/getUser'
import getUsers from '../services/getUsers'

const User: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [users, setUsers] = useState<Paginate<IUser> | null>(null)
  const navigate = useNavigate()

  const userId = useParams().id

  useEffect(() => {
    ;(async () => {
      const usersData = await getUsers()
      setUsers(usersData)
    })()
  }, [])

  useEffect(() => {
    if (userId) {
      ;(async () => {
        const userDetail = await getUser(+userId)
        setUser(userDetail)
      })()
    }
  }, [userId])

  return (
    <Layout>
      {user && (
        <section>
          <div className="bg-white p-5 shadow-lg rounded-xl">
            <img
              loading="lazy"
              alt="user profile"
              className="w-80 h-full bg-cover bg-center"
              src={`${SERVER_URL}/uploads/${user.profilePhoto}`}
            />
            <div className="border-b border-gray-200 pb-4">
              <h1 className="pt-3 text-xl">{user.name}</h1>
              <p className="italic">{user.contactInformation}</p>
            </div>

            <div className="mt-5 space-x-5">
              <Link to={`/create?edit=${user.id}`}>
                <button
                  type="button"
                  className="inline-flex items-center space-x-1 bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 border border-blue-700 rounded"
                >
                  <span>Edit</span>
                  <PencilIcon className="h-5 w-5" />
                </button>
              </Link>
              <button
                type="button"
                className="inline-flex items-center space-x-1 bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-3 border border-red-700 rounded"
                onClick={async () => {
                  await deleteUser(user.id)
                  navigate('/')
                }}
              >
                <span>Delete</span>
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <h2 className="mt-10 text-2xl">More Users</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users &&
              users.data
                .filter((currUser) => currUser.id !== user.id)
                .map((userData) => (
                  <ProfileCard {...userData} key={userData.id} />
                ))}
          </div>
        </section>
      )}
    </Layout>
  )
}

export default User
