import React from 'react'
import { Link } from 'react-router-dom'
import { IdentificationIcon } from '@heroicons/react/solid'
import { SERVER_URL } from '../config/constants'

const ProfileCard: React.FC<IUser> = ({
  id,
  name,
  contactInformation,
  profilePhoto,
}) => (
  <div className="bg-white p-5 shadow-lg rounded-xl">
    <div className="flex border-b border-gray-200 pb-4">
      <span className="flex-shrink-0 w-20 h-20 rounded-full mr-5 overflow-hidden">
        <img
          alt="user profile"
          loading="lazy"
          className="w-full h-full bg-cover bg-center"
          src={`${SERVER_URL}/uploads/${profilePhoto}`}
        />
      </span>
      <div>
        <h4 className="pt-3 text-xl">{name}</h4>
        <p>{contactInformation}</p>
      </div>
    </div>

    <Link to={`/users/${id}`}>
      <button
        type="button"
        className="inline-flex items-center space-x-1 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 border border-blue-700 rounded"
      >
        <span> Detail</span>
        <IdentificationIcon className="h-5 w-5" />
      </button>
    </Link>
  </div>
)

export default ProfileCard
