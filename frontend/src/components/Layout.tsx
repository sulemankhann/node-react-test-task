import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/solid'

const Layout: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-200">
            <header className="py-5 px-4 bg-purple-900 text-white md:px-14 xl:px-0">
                <div className="flex justify-between items-center lg:max-w-5xl lg:mx-auto">
                    <Link to="/">
                        <h1 className="text-2xl font-medium hover:text-gray-300">
                            Users
                        </h1>
                    </Link>
                    <Link to="/create">
                        <button
                            type="button"
                            className="inline-flex items-center space-x-1 uppercase font-semibold hover:text-gray-300"
                        >
                            <span>Create</span>
                            <span>
                                <PlusIcon className="h-5 w-5" />
                            </span>
                        </button>
                    </Link>
                </div>
            </header>

            <main className="mx-4 py-10 md:mx-14">
                <div className="lg:max-w-5xl lg:mx-auto">{children}</div>
            </main>
        </div>
    )
}

export default Layout
