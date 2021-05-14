import { useParams } from 'react-router-dom'
import {
    ArrowCircleLeftOutline as Back,
    PencilAltOutline as Edit,
    SaveOutline as Save
} from '@graywolfai/react-heroicons'
import ReactPlayer from 'react-player'
import Film from "../../components/icons/Film";

import { Shell, Link, Separator } from '../../components'

import sampleData from "../../helper/sampleData";
import {useState} from "react";
import {useComments, useUser} from "../../hooks";

const poster = user => user?.picture

export default function EditProfile() {
    const {user, updateUser} = useUser()
    const [picture, setPicture] = useState()
    const [country, setCountry] = useState()
    const [name, setName] = useState()
    const [showPictureInput, setShowPictureInput] = useState(false)

    function swapShowInput(){
        const status = showPictureInput
        setShowPictureInput(!status)
    }

    async function update() {
        const newUser = {...user}
        newUser.name = name
        newUser.country = country
        newUser.picture = picture
        const result = await updateUser(newUser)
    }



    return <Shell>
        <img style={{height: '30rem'}}
             src={poster(user)}
             alt={`${user.name} backdrop`}
             className='absolute top-2 left-0 right-0 w-full object-cover filter blur transform scale-105'/>

        <Link variant = 'primary'
              className = 'rounded-full absolute text-white top-4 left-8 flex items-center pl-2 pr-4 py-2 gap-4'
              to = '/profile'
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

        <div className='mx-auto w-full max-w-screen-2xl p-8 relative'>
            <header className='mt-96 relative flex items-end pb-8 mb-8'>
                <textarea className={`p-4 border-2 border-black rounded-md w-1/4 h-24 absolute -top-24 ${showPictureInput ? '':'hidden'}` }
                            defaultValue={user.picture} value={picture} onChange={ evt => setPicture(evt.target.value) }/>
                <img src={poster(user)}
                     alt={`${user.name} poster`}
                     className='w-80 h-80 ml-4 absolute rounded-full shadow-xl z-20 object-cover' onClick={swapShowInput}/>
                <hgroup className='z-10 w-3/4 float-end ml-80'>
                    <textarea className={`mt-24 h-32 bg-black bg-opacity-50 backdrop-filter backdrop-blur 
                                          text-right text-white text-6xl font-bold
                                          p-8 w-full inline-block align-bottom`}
                              defaultValue={user.name}
                              value={name}
                              onChange={ evt => setName(evt.target.value) }/>
                    <div className="flex">

                        <span className="py-4 ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12  float-left" fill="none"
                                 viewBox="0 0 24 24"
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
                            <textarea className={`block float-right text-2xl font-semibold text-black w-full py-4`}
                                      defaultValue={user.country}
                                      value={country}
                                      onChange={ evt => setCountry(evt.target.value) }/>
                        </span>

                        <p className={`block float-right text-3xl font-semibold text-black w-full px-6 py-6 text-right`}>
                            {user.email}
                        </p>
                    </div>
                </hgroup>
            </header>
        </div>
    </Shell>
}

