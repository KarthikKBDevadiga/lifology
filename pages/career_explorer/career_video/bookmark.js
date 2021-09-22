import Link from 'next/link'
import { Fragment, useState, useRef, useEffect } from 'react'
import {
    DotsVerticalIcon,
    SearchIcon,
    ArrowRightIcon
} from '@heroicons/react/solid'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetWatchLaterVideos, SchemeGetProfile, SchemeRemoveWatchLater } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classNames from '/helpers/classNames'
import { mutateGraph } from '../../../helpers/GraphQLCaller'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'
import styles from '/styles/Item.module.css'

export default function CareerVideo({ token, profile, videos }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [watchLaterVideo, setWatchLaterVideo] = useState([])
    const [watchLater, setWatchLater] = useState(videos)

    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const getWatchLaterVideos = () => {

        mutateGraph(client,
            {

            }, SchemeGetWatchLaterVideos)
            .then((res) => {
                setWatchLaterVideo(res);
                console.log("remove watch later api", res);
            }).catch((networkErr) => {

                console.log(networkErr)
            });

    }

    useEffect(() => {
        getWatchLaterVideos();
    }, [])

    const removeVideo = (video) => {
        const v = Array.from(watchLater)
        const index = v.indexOf(video);
        console.log(index)
        if (index > -1) {
            v.splice(index, 1);
            setWatchLater(v)
            console.log('Updated')
        }

        mutateGraph(client,
            {
                video_id: Number(video.id)
            }, SchemeRemoveWatchLater)
            .then((res) => {
                console.log("remove watch later api", res);
            }).catch((networkErr) => {
                console.log(networkErr)
            })


        // getWatchLaterVideos();
    }

    return (
        <>

            <MetaLayout title="Career Videos" description="Career Videos" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Career Videos / Watch Later" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <div className="grid grid-cols-1 m-4 rounded shadow bg-white">
                            <p className="text-xl font-medium m-4">Watch Later Videos</p>
                            {
                                watchLater.length > 0 ?
                                    watchLater.map((video, index) => (

                                        <div
                                            className=" relative w-full px-4 pt-4 text-left sm:text-sm hover:bg-gray-100 duration-500"
                                        >
                                            <Link href={{
                                                pathname: '/career_explorer/career_video/' + video.id
                                            }}>
                                                <a>
                                                    <div className="flex mr-8">
                                                        <img className="rounded group-hover:filter-none duration-500 w-56 h-32 object-cover" src={video.thumbnail} />
                                                        <div className="flex-1 flex justify-between ">
                                                            <div className="flex-1 px-4 py-2 text-sm ">
                                                                <div className={styles.heading}>
                                                                    {video.title}
                                                                </div>
                                                                <div className={styles.subheading}>{video.description}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>

                                            <span className="absolute inset-y-0 right-0 flex items-center pl-1 pr-1 bg-red-700 h-6 w-6 rounded-full text-white top-2/4 -translate-y-1/2 right-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                    onClick={() => removeVideo(video)}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </span>
                                            {
                                                index + 1 != watchLater.length ?
                                                    <div className="w-full mt-4 h-px bg-gray-200" /> : <div className="mt-4" />
                                            }

                                        </div>
                                    ))
                                    : <div className="text-gray-400">
                                        No Data Found
                                    </div>
                            }
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}




export async function getServerSideProps(context) {

    const { token } = cookies(context)
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    const videosClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const videos = await queryGraph(videosClient, {}, SchemeGetWatchLaterVideos)
        .then((res) => {
            return res.videosWatchLater
        }).catch((networkErr) => {
            return []
        })

    const profileClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        })

    return {
        props: { token, videos, profile }
    }
}


