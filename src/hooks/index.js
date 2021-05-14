import { useEffect, useState } from 'react'

import API from '../api'

export function useMovies(query = {}) {
    const [data, setData] = useState({ content: [], pagination: { hasNext: false, hasPrevious: false }})
    const queryString = JSON.stringify(query)

    useEffect(() => {
        API.instance()
            .findMovies(JSON.parse(queryString))
            .then(setData)
    }, [queryString])

    return data
}

export function useMovie(id = '') {
    const [data, setData] = useState({})

    useEffect(() => {
        API.instance()
            .findMovie(id)
            .then(setData)
    }, [id])

    const update = movie => API.instance()
        .updateMovie(movie)
        .then(movie => setData(movie))

    return {
        movie: data,
        updateMovie: update
    }
}

export function useUser(id = null) {
    const [data, setData] = useState([])
    const userId = id === null ? localStorage.getItem('user') : id

    useEffect(() => {
        API.instance()
            .findUser(userId)
            .then(setData)
    }, [userId])

    const create = user => API.instance()
            .createUser(user)
            .then(user => setData(user))

    const update = user => API.instance()
            .updateUser(user)
            .then(user => setData(user))

    return {
        user: data,
        createUser: create,
        updateUser: update
    }
}

export function useComments(query = {}){
    const [data, setData] = useState({ content: [], pagination: { hasNext: false, hasPrevious: false }})
    const queryString = JSON.stringify(query)

    useEffect(() => {
        API.instance()
            .findComments(JSON.parse(queryString))
            .then(setData)
    }, [queryString])

    const create = comment => {
        API.instance()
            .createComment(comment)
            .then( () => {
                API.instance()
                    .findComments(query)
                    .then(setData)
            })
    }

    return {
        comments: data,
        createComment: create
    }
}

export function useFriendships(id = null) {
    const [data, setData] = useState([])
    const userId = id === null ? localStorage.getItem('user') : id

    useEffect(() => {
        API.instance()
            .findFriendships(userId)
            .then(setData)
    }, [userId])

    const accept = friendID => API.instance()
        .acceptFriendship(userId, friendID)
        .then( () => {
            API.instance()
                .findFriendships(userId)
                .then(setData)
        })

    const deleteF = friendID => API.instance()
        .deleteFriendship(userId, friendID)
        .then( () => {
            API.instance()
                .findFriendships(userId)
                .then(setData)
        })

    return {
        friendships: data,
        acceptFriendship: accept,
        deleteFriendship: deleteF
    }
}