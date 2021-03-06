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
            this.#token = await response.headers.get('authentication')
            localStorage.setItem('user', email)
            localStorage.setItem('token', this.#token)
            return true
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
            filter: { title = '', keywords = [], genres = [], crew = [], cast = [], producers = [], releaseDate = '', status = ''} =
                { title: '', keywords: [], genres: [], crew: [], cast: [], producers: [], releaseDate: '', status: ''},
            sort,
            pagination: {page = 0, size = 10} = {page: 0, size: 10}
        } = {
            filter: { title: '', keywords: [], genres: [], crew: [], cast: [], producers: [], releaseDate: '', status: ''},
            sort: {},
            pagination: {page: 0, size: 10}
        }
    ) {
        let url = ('')

        // Filter
        if (title) url += 'title='+title
        if (keywords.length) {
            let aux = (url === '')? 'keywords=' : '&keywords='
            keywords.forEach((keyword) => aux += (aux === 'keywords=' || aux === '&keywords=') ? keyword : ','+keyword)
            url += aux
        }
        if (genres.length) {
            let aux = (url === '')? 'genres=' : '&genres='
            genres.forEach((keyword) => aux += (aux === 'genres=' || aux === '&genres=') ? keyword : ','+keyword)
            url += aux
        }
        if (crew.length) {
            let aux = (url === '')? 'crew=' : '&crew='
            crew.forEach((keyword) => aux += (aux === 'crew=' || aux === '&crew=') ? keyword : ','+keyword)
            url += aux
        }
        if (cast.length) {
            let aux = (url === '')? 'cast=' : '&cast='
            cast.forEach((keyword) => aux += (aux === 'cast=' || aux === '&cast=') ? keyword : ','+keyword)
            url += aux
        }
        if (producers.length) {
            let aux = (url === '')? 'producers=' : '&producers='
            producers.forEach((keyword) => aux += (aux === 'producers=' || aux === '&producers=') ? keyword : ','+keyword)
            url += aux
        }
        if (releaseDate) url += (url === '')? 'releaseDate='+releaseDate : '&releaseDate='+releaseDate
        if (status) url += (url === '')? 'status='+status : '&status='+status

        // Sort
        if (sort) {
            let aux = (url === '')? 'sort=' : '&sort='
            Object.keys(sort).forEach((keyword) => {
                if (sort[keyword] === 'ASC')
                    aux += (aux === 'sort=' || aux === '&sort=') ? '+'+keyword : ',+'+keyword
                if (sort[keyword] === 'DESC')
                    aux += (aux === 'sort=' || aux === '&sort=') ? '-'+keyword : ',-'+keyword
            })
            url += aux
        }

        // Pagination
        if (page) url += (url === '')? 'page='+page : '&page='+page
        if (size) url += (url === '')? 'size='+size : '&size='+size

        url = (url === '')? '/api/movies' : '/api/movies?'+url

        const data =  await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': this.#token,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        return await data.json()
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
        if ( id == null){
            return
        }
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
        if (!movie && ! user) return undefined

        let urlAux = ('')

        // Sort
        if (sort) {
            let aux = (urlAux === '')? 'sort=' : '&sort='
            Object.keys(sort).forEach((keyword) => {
                if (sort[keyword] === 'ASC')
                    aux += (aux === 'sort=' || aux === '&sort=') ? '+'+keyword : ',+'+keyword
                if (sort[keyword] === 'DESC')
                    aux += (aux === 'sort=' || aux === '&sort=') ? '-'+keyword : ',-'+keyword
            })
            urlAux += aux
        }

        // Pagination
        if (page) urlAux += (urlAux === '')? 'page='+page : '&page='+page
        if (size) urlAux += (urlAux === '')? 'size='+size : '&size='+size

        let url = (movie)? '/api/movies/'+movie+'/assessments' : '/api/users/'+user+'/assessments'
        if (user !== '') url += '?' + urlAux

        const data =  await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': this.#token,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        return await data.json()
    }

    //Create an assessment
    async createComment(comment = {id : 0, user : "test@test.com", movie : "111", movieTitle : "Moby Dick", rating : 5, comment : "I like it"}) {
        const url = "/api/movies/" + comment.movie + "/assessments";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': this.#token,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(comment)
        })

        if(response.ok) {
            return true
        }
        return false
    }

    //Create an user
    async createUser({email = '', name = '', password = '', birthday = {day: 0, month: 0, year: 0}}) {
        const url = "/api/users";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "name" : name,
                "country" : '',
                "picture" : '',
                "birthday" : birthday,
                "password": password,
                "roles" : [ "ROLE_USER"]
            })
        })

        if(response.ok) {
            this.#token = await response.headers.get('authentication')
            localStorage.setItem('user', email)
            localStorage.setItem('token', this.#token)
            return true
        }
        return false
    }

    //Update an user
    async updateUser(newUser) {
        const operations = []
        const user = await this.findUser(newUser.email)
        if (newUser.country != undefined && newUser.country !== user.country){
            operations.push({"op": "replace", "path" : "/country", "value" : newUser.country })
        }
        if (newUser.picture != undefined && newUser.picture !== user.picture){
            operations.push({"op": "replace", "path" : "/picture", "value" : newUser.picture })
        }
        if (newUser.name != undefined && newUser.name !== user.name){
            operations.push({"op": "replace", "path" : "/name", "value" : newUser.name })
        }
        if (operations === []){
            return false
        }
        const url = `/api/users/${newUser.email}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': this.#token,
                'Content-Type': 'application/json-patch+json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(operations)
        })

        return await response.json()
    }

    //Update a movie
    async updateMovie(newMovie) {
        const operations = []
        const movie = await this.findMovie(newMovie.id)
        if (newMovie.overview !== movie.overview){
            operations.push({"op": "replace", "path" : "/overview", "value" : newMovie.overview })
        }
        newMovie.resources.forEach( resource => {
            const position = newMovie.resources.findIndex(r => r === resource)
            if (position >= movie.resources.length) {
                operations.push({"op": "add", "path" : `/resources/-`, "value" : {
                        "url": newMovie.resources[position].url,
                        "type": newMovie.resources[position].type
                    } })
            }
            else if (movie.resources[position].url !== newMovie.resources[position].url) {
                if (newMovie.resources[position].url === '') {
                    operations.push({"op": "remove", "path" : `/resources/${position}`})
                }
                else {
                    operations.push({
                        "op": "replace", "path": `/resources/${position}`, "value": {
                            "url": newMovie.resources[position].url,
                            "type": newMovie.resources[position].type
                        }
                    })
                }
            }
        })

        if (operations === []){
            return false
        }
        const url = `/api/movies/${newMovie.id}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': this.#token,
                'Content-Type': 'application/json-patch+json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(operations)
        })

        return await response.json()
    }

    //Get friendships
    async findFriendships(userID = '') {
        const data =  await fetch(`/api/users/${userID}/friends`, {
            method: 'GET',
            headers: {
                'Authorization': this.#token,
                'Accepts': 'application/json'
            }
        })
        return await data.json()
    }

    //Update a friendship
    async acceptFriendship(userID = '', friendID = '') {
        const url = `/api/users/${friendID}/friends/${userID}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': this.#token,
                'Accepts': 'application/json'
            }
        })

        return await response.json()
    }

    //Update a friendship
    async deleteFriendship(userID = '', friendID = '') {
        const url = `/api/users/${friendID}/friends/${userID}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': this.#token
            }
        })
        return response;
    }
}