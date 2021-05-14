import { useParams } from 'react-router-dom'
import {ArrowCircleLeftOutline as Back, AtSymbolOutline, SaveOutline as Save} from '@graywolfai/react-heroicons'
import ReactPlayer from 'react-player'
import Film from "../../components/icons/Film";

import {Shell, Link, TODO, Separator, Button, Input} from '../../components'

import {useMovie, useComments, useUser} from '../../hooks'


import Disney from './icons/disney_plus.png'
import Play from './icons/google_play.png'
import HBO from './icons/hbo.png'
import ITunes from './icons/itunes.png'
import Netflix from './icons/netflix.png'
import Prime from './icons/prime_video.png'
import Youtube from './icons/youtube.png'
import sampleData from "../../helper/sampleData";
import {createContext, useContext, useState} from "react";

const backdrop = movie => {
    const backdrop = movie?.resources?.find(res => res?.type === 'BACKDROP')?.url
    const poster = movie?.resources?.find(res => res?.type === 'POSTER')?.url

    return backdrop ? backdrop : poster
}
const poster = movie => movie?.resources?.find(res => res?.type === 'POSTER')?.url

export default function Profile() {
    const { id } = useParams()
    const {movie, updateMovie} = useMovie(id)
    const [overview, setOverview] = useState(movie.overview)
    const trailerAux = movie?.resources?.find(r => r.type === 'TRAILER')
    const trailerURL = trailerAux?.url
    const [trailer, setTrailer] = useState()

    async function update() {
        const newMovie = {...movie}
        newMovie.overview = overview
        if (trailerURL){
            const pos = movie.resources.findIndex(r => r.type === 'TRAILER')
            newMovie.resources[pos].url = trailer
        } else {
            newMovie["resources"].push({
                "url": trailer,
                "type": "TRAILER"
            })
        }
        const result = await updateMovie(newMovie)
    }


    function Links({ movie }) {
        const resources = movie?.resources?.filter(r => !['POSTER', 'BACKDROP', 'TRAILER'].includes(r.type))
        let links

        if(resources?.length === 0) {
            links = <span className = 'block p-8 text-center bg-gray-300 font-bold'>
            No se han encontrado enlaces!
        </span>
        } else {
            links = <ul className = 'space-y-4'>
                {
                    resources?.map(r => <PlatformLink key = { r.type } type = { r.type } url = { r.url } />)
                }
            </ul>
        }


        return <>
            <h2 className = 'font-bold text-2xl'>Ver ahora</h2>
            <Separator />
            { links }
        </>
    }

    function PlatformLink({ type = '', url = '', ...props }) {
        switch (type) {
            case 'DISNEY_PLUS':
                return <a target = '_blank'
                          rel = 'noreferrer'
                          href = { url }
                          className = {`flex items-center space-x-2 overflow-hidden h-16 w-full bg-white
                                    transform transition duration-200 
                                    hover:translate-x-8 hover:scale-105`}>
                    <img src = { Disney } alt = 'Disney+ logo'
                         className = 'rounded-lg w-16 h-16'
                    />
                    <span className = 'font-bold'>
                    Reproducir en
                </span>
                </a>
            case 'GOOGLE_PLAY':
                return <a target = '_blank'
                          rel = 'noreferrer'
                          href = { url }
                          className = {`flex items-center space-x-2 overflow-hidden h-16 w-full bg-white
                                    transform transition duration-200 
                                    hover:translate-x-8 hover:scale-105`}>
                    <img src = { Play } alt = 'Google Play logo'
                         className = 'rounded-lg w-16 h-16'
                    />
                    <span className = 'font-bold'>
                    Reproducir en Google Play
                </span>
                </a>
            case 'HBO':
                return <a target = '_blank'
                          rel = 'noreferrer'
                          href = { url }
                          className = {`flex items-center space-x-2 overflow-hidden h-16 w-full bg-white
                                    transform transition duration-200 
                                    hover:translate-x-8 hover:scale-105`}>
                    <img src = { HBO } alt = 'HBO logo'
                         className = 'rounded-lg w-16 h-16'
                    />
                    <span className = 'font-bold'>
                    Reproducir en HBO
                </span>
                </a>
            case 'ITUNES':
                return <a target = '_blank'
                          rel = 'noreferrer'
                          href = { url }
                          className = {`flex items-center space-x-2 overflow-hidden h-16 w-full bg-white
                                    transform transition duration-200 
                                    hover:translate-x-8 hover:scale-105`}>
                    <img src = { ITunes } alt = 'iTunes logo'
                         className = 'rounded-lg w-16 h-16'
                    />
                    <span className = 'font-bold'>
                    Reproducir en iTunes
                </span>
                </a>
            case 'NETFLIX':
                return <a target = '_blank'
                          rel = 'noreferrer'
                          href = { url }
                          className = {`flex items-center space-x-2 overflow-hidden h-16 w-full bg-white
                                    transform transition duration-200 
                                    hover:translate-x-8 hover:scale-105`}>
                    <img src = { Netflix } alt = 'Netflix logo'
                         className = 'rounded-lg w-16 h-16'
                    />
                    <span className = 'font-bold'>
                    Reproducir en Netflix
                </span>
                </a>
            case 'PRIME_VIDEO':
                return <a target = '_blank'
                          rel = 'noreferrer'
                          href = { url }
                          className = {`flex items-center space-x-2 overflow-hidden h-16 w-full bg-white
                                    transform transition duration-200 
                                    hover:translate-x-8 hover:scale-105`}>
                    <img src = { Prime } alt = 'Prime Video logo'
                         className = 'rounded-lg w-16 h-16'
                    />
                    <span className = 'font-bold'>
                    Reproducir en Prime Video
                </span>
                </a>
            case 'YOUTUBE':
                return <a target = '_blank'
                          rel = 'noreferrer'
                          href = { url }
                          className = {`flex items-center space-x-2 overflow-hidden h-16 w-full bg-white
                                    transform transition duration-200 
                                    hover:translate-x-8 hover:scale-105`}>
                    <img src = { Youtube } alt = 'YouTube logo'
                         className = 'rounded-lg w-16 h-16'
                    />
                    <span className = 'font-bold'>
                    Reproducir en YouTube
                </span>
                </a>
            default: return null
        }
    }

    return <Shell>
        <img style = {{ height: '36rem' }}
             src = { backdrop(movie) }
             alt = { `${movie.title} backdrop` }
             className = 'absolute top-2 left-0 right-0 w-full object-cover filter blur transform scale-105' />

        <Link variant = 'primary'
              className = 'rounded-full absolute text-white top-4 left-8 flex items-center pl-2 pr-4 py-2 gap-4'
              to ={`/movies/${id}`}
        >
            <Back className = 'w-8 h-8'/>
            <span>Volver</span>
        </Link>

        <button className = 'rounded-full absolute text-white top-4 right-8 flex items-center px-2 py-2 gap-4 text-white
                      bg-gradient-to-br from-pink-500 to-yellow-500 via-red-500
                      hover:from-green-500 hover:to-blue-500 hover:via-teal-500
                      focus:from-green-500 focus:to-blue-500 focus:via-teal-500'
             onClick={update} >
            <Save className = 'w-8 h-8'/>
        </button>

        <div className = 'mx-auto w-full max-w-screen-2xl p-8'>
            <Header movie = { movie } />
            <div className = 'grid grid-cols-5 gap-4'>
                <div className = 'col-span-4  mb-16'>
                    <h2 className = 'font-bold text-2xl text-white bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-4 shadow'>
                        Argumento
                    </h2>
                    <textarea name='newOverview' className = 'pt-8 p-4 w-full h-full' value={overview} defaultValue={movie.overview} onChange = { evt => setOverview(evt.target.value) } >
            </textarea>
                </div>
                <div className = 'text-right'>
                    <dl className = 'space-y-2'>
                        <CrewMember movie = { movie } job = 'Director' label = 'Dirección' />
                        <CrewMember movie = { movie } job = 'Producer' label = 'Producción' />
                        <CrewMember movie = { movie } job = 'Screenplay' label = 'Guión' />
                        <CrewMember movie = { movie } job = 'Original Music Composer' label = 'Banda sonora' />
                    </dl>
                </div>
            </div>
            <div className = 'flex gap-4 mt-8'>
                <div className = 'w-80 z-10'>
                    <Links movie = { movie } />
                </div>
                <div className = 'w-full bg-black flex p-12 items-center justify-center z-20'>
                    <textarea className= "w-full p-4"
                           value = { trailer } defaultValue={ trailerURL }
                           onChange = { evt => setTrailer(evt.target.value) }
                    />
                </div>
            </div>




            <Cast movie = { movie }/>
        </div>
    </Shell>
}

function Header({ movie }) {
    return <header className = 'mt-64 relative flex items-end pb-8 mb-8'>
        <img style = {{ aspectRatio: '2/3' }}
             src = { poster(movie) }
             alt = { `${ movie.title } poster` }
             className = 'w-64 rounded-lg shadow-xl z-20' />
        <hgroup className = 'flex-1'>
            <h1 className = {`bg-black bg-opacity-50 backdrop-filter backdrop-blur 
                                          text-right text-white text-6xl font-bold
                                          p-8`}>
                { movie.title }
            </h1>
            <Tagline movie = { movie } />
        </hgroup>
    </header>
}

function Cast({ movie }) {
    return <>
        <h2 className = 'mt-16 font-bold text-2xl'>Reparto principal</h2>
        <Separator />
        <ul className = 'w-full grid grid-cols-10 gap-2 overflow-hidden'>
            {
                movie?.cast?.slice(0, 10).map(person => <CastMember key = { person.name } person = { person }/>)
            }
        </ul>
    </>
}

function Tagline({ movie }) {
    if(movie.tagline) {
        return <q className={`block text-3xl font-semibold text-black italic w-full px-8 py-4 text-right`}>
            {movie.tagline}
        </q>
    } else {
        return <span className = 'block text-3xl font-semibold py-4'>&nbsp;</span>
    }
}
function CrewMember({ movie, job, label }) {
    const people = movie?.crew?.filter(p => p.job === job)

    if(people?.length !== 0)
        return <div>
            <dt className = 'font-bold text-sm'>{ label }</dt>
            { people?.map(p => <dd className = 'text-sm' key = { `${ job }/${ p.id }` }>{ p.name }</dd>) }
        </div>
    else return null
}
function CastMember({ person }) {
    return <li className = 'overflow-hidden'>
        <img src = { person?.picture || sampleData.avatar }
             alt = { `${person.name} profile` }
             className = 'w-full object-top object-cover rounded shadow'
             style = {{ aspectRatio: '2/3' }}/>
        <span className = 'font-bold block'> { person?.name } </span>
        <span className = 'text-sm block'> { person?.character } </span>
    </li>
}
