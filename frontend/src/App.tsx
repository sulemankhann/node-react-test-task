import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import CreateUser from './pages/create'
import User from './pages/user'

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/users/:id" element={<User />} />
        </Routes>
    )
}

export default App
