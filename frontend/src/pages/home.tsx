import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Layout from '../components/Layout'
import ProfileCard from '../components/ProfileCard'
import getUsers from '../services/getUsers'
import Loading from '../components/Loading'

const Home: React.FC = () => {
    const [users, setUsers] = useState<Paginate<IUser> | null>(null)
    const [loading, setLoading] = useState(false)
    const { ref, inView } = useInView({
        threshold: 1,
        rootMargin: '20px',
    })

    useEffect(() => {
        ;(async () => {
            const usersData = await getUsers()
            setUsers(usersData)
        })()
    }, [])

    useEffect(() => {
        const loadMoreUsers = async (): Promise<void> => {
            if (users && users.total > users.data.length && !loading) {
                setLoading(true)
                const currUsers = await getUsers(users.data.length)
                setUsers({
                    ...currUsers,
                    data: [...users.data, ...currUsers.data],
                })
                setLoading(false)
            }
        }

        if (inView) {
            loadMoreUsers()
        }
    }, [inView, users, loading])

    return (
        <Layout>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users &&
                    users.data.map((user) => (
                        <ProfileCard {...user} key={user.id} />
                    ))}
                {loading && (
                    <>
                        <Loading />
                        <Loading />
                        <Loading />
                        <Loading />
                    </>
                )}
                <div ref={ref} />
            </div>
        </Layout>
    )
}

export default Home
