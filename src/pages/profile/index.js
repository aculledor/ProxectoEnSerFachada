import { useParams } from 'react-router-dom'
import { ArrowCircleLeftOutline as Back, PencilAltOutline as Edit } from '@graywolfai/react-heroicons'
import ReactPlayer from 'react-player'
import Film from "../../components/icons/Film";

import { Shell, Link, Separator } from '../../components'

import sampleData from "../../helper/sampleData";
import {useState} from "react";
import {useComments, useUser} from "../../hooks";

const poster = user => user?.picture

export default function Profile() {
    const {user} = useUser()

    return <Shell>
        <img style = {{ height: '30rem' }}
             src = { poster(user) }
             alt = { `${user.name} backdrop` }
             className = 'absolute top-2 left-0 right-0 w-full object-cover filter blur transform scale-105' />

        <div className = 'mx-auto w-full max-w-screen-2xl p-8'>
            <Header user = { user } />
            <Comments user = { user } />
        </div>
    </Shell>
}

function Header({ user }) {
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
function Comments({ user }) {
    const { comments, createComment } = useComments({ filter: { user : user.email } } )

    function ArrayRating(rating = 0) {
        let ratingIcons = []
        for(let i = 0; i < 10-rating; i++){
            ratingIcons.push({
                className: "h-5 w-5 bg-gray-300 rounded-full p-0.5 transform -rotate-6",
                strokeWidth: 3 ,
                strokeColor: "white"
            })
        }
        for(let i = 0; i < rating; i++){
            ratingIcons.push({
                className: "rounded-full h-5 w-5 bg-gradient-to-br from-pink-500 via-red-500 p-0.5 to-yellow-500 transform -rotate-6",
                strokeWidth: 3,
                strokeColor: "white"
            })
        }
        return ratingIcons
    }

    function Comment({ comment }) {
        let ratingIcons = ArrayRating(comment.rating)
        return <li className = 'border-2 rounded-md p-8 shadow-md w-full mt-6 mb-12'>
            <div className ="flex float-left">
                <span className = 'text-sm font-bold left-0'> { comment?.movieTitle } </span>
            </div>
            <div className ="flex gap-1 float-right">
                {
                    ratingIcons?.map(icon => <Film key = {ratingIcons.indexOf(icon)} className={icon.className} strokeWidth={icon.strokeWidth} strokeColor={icon.strokeColor}/>)
                }
            </div>
            <br/><br/>
            <div className ="break-words">
                <p> { comment?.comment } </p>
            </div>
        </li>
    }

    return <>
        <h2 className = 'font-bold text-2xl'>Últimos Comentarios</h2>
        <Separator />
        <ul className = 'overflow-y-auto'>
            {
                comments?.content?.map(comment => <Comment key = { comment.id } comment = { comment }/>)
            }
        </ul>
    </>
}

