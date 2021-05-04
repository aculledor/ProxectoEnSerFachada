import DATA from './data'

let __instance = null

export default class API {
    #token = localStorage.getItem('token') || null

    //Singleton constructor
    static instance() {
        if(__instance == null)
            __instance = new API()

        return __instance
    }

    //Login fetch
    async login(email = '', pass = '') {
        const url = "/api/login";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": pass
            })
        })

        if(response.ok) {
            const body = await response.headers.get('authentication')
            this.#token = body
            localStorage.setItem('user', email)
            localStorage.setItem('token', this.#token)
            return true


            //console.log(body)
            //const promise = await this.findUser('pruba@uno.com')
            //const data = await promise.json()
            //console.log(data)
        }
        return false

    }

    //Logout from client side
    async logout() {
        this.#token = null
        localStorage.clear()

        return true
    }

    //Get all movies
    async findMovies(
        {
            filter: { title= '', keywords = [''], genre= '', genres = [''], crew = [''], cast = [''], producers = [''], releaseDate = '', status= ''} =
                {  title: '', keywords: [], genre: '', genres: [], crew: [], cast: [], producers: [], releaseDate: '', status: '' },
            sort = [''],
            pagination: {page = 0, size = 10} = { page: 0, size: 10 }
        } = {
            filter: {  title: '', keywords: [], genre: '', genres: [], crew: [], cast: [], producers: [], releaseDate: '', status: '' },
            sort: [],
            pagination: { page: 0, size: 10 }
        }
    ) {
        const data =  await fetch('/api/movies', {
            method: 'GET',
            headers: {
                'Authorization': this.#token,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        return await data.json()

        return new Promise(resolve => {
            const filtered = DATA.movies
                ?.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase() || ''))
                ?.filter(movie => genre !== '' ? movie.genres.map(genre => genre.toLowerCase()).includes(genre.toLowerCase()) : true)
                ?.filter(movie => movie.status.toLowerCase().includes(status.toLowerCase() || ''))

            const data = {
                content: filtered?.slice(size * page, size * page + size),
                pagination: {
                    hasNext: size * page + size < filtered.length,
                    hasPrevious: page > 0
                }
            }

            resolve(data)
        })

    }

    //Get one movie
    async findMovie(id) {
        const data =  await fetch(`/api/movies/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': this.#token,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        return await data.json()
    }

    //Get one user
    async findUser(id = '') {
        const data =  await fetch(`/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': this.#token,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        return await data.json()
    }

    //Get assessments by movie or user
    async findComments(
        {
            filter: { movie = '', user = '' } = { movie: '', user: '' },
            sort,
            pagination: {page = 0, size = 10} = { page: 0, size: 10}
        } = {
            filter: { movie: '', user: '' },
            sort: {},
            pagination: { page: 0, size: 10}
        }
    ) {
        return new Promise(resolve => {
            const filtered = DATA.comments
                ?.filter(comment => comment?.movie?.id === movie)

            const data = {
                content: filtered?.slice(size * page, size * page + size),
                pagination: {
                    hasNext: size * page + size < filtered.length,
                    hasPrevious: page > 0
                }
            }

            resolve(data)
        })
    }

    //Create an assessment
    async createComment(comment) {
        return new Promise(resolve => {
            DATA.comments.unshift(comment)

            resolve(true)
        })
    }

    //Create an user
    async createUser(user) {
        console.log(user)
    }

    //Update an user
    async updateUser(id, user) {
        console.log(user)
    }
}