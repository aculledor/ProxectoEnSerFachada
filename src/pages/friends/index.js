import {Separator, Shell} from '../../components'
import {useFriendships, useUser} from "../../hooks";

const poster = user => user?.picture

export default function Friends() {
    const {user} = useUser()

    return <Shell>
        <img style = {{ height: '30rem' }}
             src = { poster(user) }
             alt = { `${user.name} backdrop` }
             className = 'absolute top-2 left-0 right-0 w-full object-cover filter blur transform scale-105' />

        <div className = 'mb-16 mx-auto w-full max-w-screen-2xl p-8'>
            <Header user = { user } />
            <FriendArea user = { user } />
        </div>
    </Shell>
}

function Header({ user }) {
    function Tagline({ user }) {
        return <div className="flex">
            <span className="py-4 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12  float-left" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
            </span>
            <p className={`block float-right text-2xl font-semibold text-black w-full px-4 py-6 text-left align-middle`}>
                {`${user?.birthday?.day}/${user?.birthday?.month}/${user?.birthday?.year}`}
            </p>
            <span className="flex py-3 text-center mr-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mr-2" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p className={`block float-right text-2xl font-semibold text-black w-full py-4`}>
                    {user.country}
                </p>
            </span>
            <p className={`block float-right text-3xl font-semibold text-black w-full px-6 py-6 text-right`}>
                {user.email}
            </p>
        </div>
    }

    return <header className = 'mt-96 relative flex items-end pb-8 mb-8'>
        <img src = { poster(user) }
             alt = { `${ user.name } poster` }
             className = 'w-80 h-80 ml-4 absolute rounded-full shadow-xl z-20 object-cover' />
        <hgroup className = 'z-10 w-3/4 float-end ml-80'>
            <h1 className = {`bg-black bg-opacity-50 backdrop-filter backdrop-blur 
                                          text-right text-white text-6xl font-bold
                                          p-8`}>
                { user.name }
            </h1>
            <Tagline user = { user } />
        </hgroup>
    </header>
}

function FriendArea({user}){
    const {friendships, acceptFriendship, deleteFriendship} = useFriendships()
    const solicitudes = friendships?.content?.filter(friendship => friendship["confirmed"] === false)
    const amistades = friendships?.content?.filter(friendship => friendship["confirmed"] === true)

    async function accept(friendId) {
        await acceptFriendship(friendId)
    }
    async function reject(friendId) {
        await deleteFriendship(friendId)
    }

    function Solicitud({ solicitud }) {
        return <li className = 'border-2 rounded-md p-8 shadow-md w-full '>
            <div className ="flex float-left">
                <span className = 'text-sm font-bold left-0'> { solicitud.user } </span>
            </div>
            <div className ="flex gap-1 float-right">
                <button className="h-6 w-6" onClick={() => reject(solicitud?.user)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="black">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                    </svg>
                </button>
                <button className="h-6 w-6" onClick={() => accept(solicitud?.user)}>
                    <svg xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </button>
            </div>
        </li>
    }

    function Amistad({ amistad }) {

        function getDay(stringDate) {
            const date = stringDate.split("-")
            return date[2].split("T")[0]
        }
        function getMonth(stringDate) {
            const date = stringDate.split("-")
            return date[1]
        }
        function getYear(stringDate) {
            const date = stringDate.split("-")
            return date[0]
        }

        return <li className = 'border-2 rounded-md p-8 shadow-md w-full mt-6 mb-12 grid grid-flow-col grid-cols-2'>
            <img src = { amistad?.userPicture }
                 alt = { `${ amistad.user } poster` }
                 className = 'w-24 h-24 rounded-full shadow-xl z-20 object-cover' />
            <div className ='relative'>
                <span className = 'text-lg font-bold float-top float-right'> { amistad.user } </span>
                <span className = 'text-sm absolute bottom-0 left-0 '> { `Sois amigos desde el ${getDay(amistad?.since)}/${getMonth(amistad?.since)}/${getYear(amistad?.since)}` } </span>
                <button className="absolute bottom-0 right-0 h-12 w-12 float-right" onClick={() => reject(amistad?.user)}>
                    <svg xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </button>
            </div>
        </li>
    }

    return <>
        <h2 className = 'mt-16 font-bold text-2xl'>Solicitudes de amistad</h2>
        <Separator />
        <ul className = 'grid grid-cols-3 gap-4 gap-y-8'>
            {
                solicitudes?.map(solicitud => <Solicitud key = { solicitud.id } solicitud = { solicitud }/>)
            }
        </ul>
        <h2 className = 'mt-16 font-bold text-2xl'>Amigos</h2>
        <Separator />
        <ul className = 'grid grid-cols-3 gap-4 gap-y-8'>
            {
                amistades?.map(amistad => <Amistad key = { amistad.id } amistad = { amistad }/>)
            }
        </ul>
    </>
}