import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
    ThumbUpIcon,
    ThumbDownIcon,
    ClockIcon,
} from '@heroicons/react/outline'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import styles from '/styles/Magazine.module.css'
import MetaLayout from '../../../components/MetaLayout'

import "react-multi-carousel/lib/styles.css";
import { SchemeGetRecommendedVideos, SchemeGetVideo, SchemeAddWatchLater, SchemeAddLike, SchemeAddDislike, SchemeVideoStatus, SchemeNoAction } from '../../../helpers/GraphQLSchemes'
import { mutateGraph } from '../../../helpers/GraphQLCaller'
import NextNProgress from 'nextjs-progressbar'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'
import VideoMinItem from '../../../components/item/VideoMinItem'

import classNames from '/helpers/classNames'
import ShareDialog from '/components/dialog/ShareDialog'
import createDynamicLink from '../../../helpers/DynamicLinkUtil'
// function getVideoId(url) {
//     var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/
//     var match = url.match(regExp);
//     if (match) {
//         return match[2]
//     }
//     return ''
// }

export default function CareerVideoDetail({ profile, video, recommended, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [videoStatus, setVideoStatus] = useState([])
    const [shareDialog, setShareDialog] = useState(false)
    const [shareUrl, setShareUrl] = useState('')

    const pages = [
        {
            name: 'Career Explorer', href: '/career_explorer/', current: false
        },
        {
            name: 'Career Videos', href: '/career_explorer/career_video', current: false
        },
        {
            name: 'Career Videos Details', href: '#', current: true
        },
    ]

    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })

    const getVideoStatus = () => {
        mutateGraph(client,
            {
                video_id: Number(video.id)
            }, SchemeVideoStatus)
            .then((res) => {
                console.log(res.checkVideoStatus)
                setVideoStatus(res.checkVideoStatus)

            }).catch((networkErr) => {
            });
    }

    useEffect(() => {
        getVideoStatus();
    }, [video.id])



    const addToWatchLater = (id) => {

        mutateGraph(client,
            {
                video_id: Number(id), bookmark_type: "WATCH_LATER"
            }, SchemeAddWatchLater)
            .then((res) => {
                console.log(res.videosBookmark)
                // setVideoStatus(res.checkVideoStatus);
            }).catch((networkErr) => {

            });
        getVideoStatus();

    }

    const addToLike = (id) => {
        if (videoStatus.like_status == 1) {
            mutateGraph(client,
                {
                    video_id: Number(id)
                }, SchemeNoAction)
                .then((res) => {
                }).catch((networkErr) => {
                });
        }
        else {
            mutateGraph(client,
                {
                    video_id: Number(id)
                }, SchemeAddLike)
                .then((res) => {
                }).catch((networkErr) => {
                });
        }

        getVideoStatus();
    }

    const addToDislike = (id) => {
        if (videoStatus.like_status == 0) {

            mutateGraph(client,
                {
                    video_id: Number(id)
                }, SchemeNoAction)
                .then((res) => {
                }).catch((networkErr) => {
                });
        }
        else {
            mutateGraph(client,
                {
                    video_id: Number(id)
                }, SchemeAddDislike)
                .then((res) => {
                }).catch((networkErr) => {
                });
        }

        getVideoStatus();
    }
    const videoType = getVideoType(video.video)

    const shareVideo = () => {
        setShareDialog(true)
        createDynamicLink('/career_explorer/career_video/' + video.id)
            .then((res) => {
                setShareUrl(res)
                console.log(res)
            })
    }
    return (
        <>

            <MetaLayout title={video.title} description={video.description} />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={video.title} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <Breadcrumbs pages={pages} />

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">


                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white shadow sm:rounded-lg p-4">
                                                    <div className="relative h-0" style={{ paddingBottom: '56.25%', paddingTop: '0px' }}>
                                                        <iframe title="vimeo-player" src=
                                                            {
                                                                videoType == 'youtube' ? 'https://www.youtube.com/embed/' + getYoutubeVideoId(video.video) + '?autoplay=0&rel=0&showinfo=0' : videoType == 'vimeo' ?
                                                                    "https://player.vimeo.com/video/" + getVimeoVideoId(video.video) : ''
                                                            } className="absolute rounded-lg top-0 left-0 w-full h-full" frameBorder="0" allowFullScreen>

                                                        </iframe>
                                                    </div>
                                                    <div className="sm:flex sm:items-start sm:justify-between py-2">
                                                        <div className="self-center">
                                                            <h3 className="text-base leading-6 font-bold text-gray-900">{video.title}</h3>
                                                        </div>
                                                        <div className="sm:flex-shrink-0 sm:flex sm:items-center self-center">
                                                            <div className="self-center flex ml-auto text-xs">
                                                                <div href="#" onClick={() => addToLike(video.id)}>
                                                                    <div className={
                                                                        classNames(
                                                                            "cursor-pointer flex hover:bg-gray-100 p-2 rounded-full duration-500 mr-2 active:scale-95",
                                                                            videoStatus.like_status == 1 ? "text-lblue bg-gray-100" : "text-gray-400 hover:text-lblue duration-500"
                                                                        )
                                                                    }>
                                                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" />
                                                                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div href="#" onClick={() => addToDislike(video.id)}>
                                                                    <div className={
                                                                        classNames(
                                                                            "cursor-pointer flex hover:bg-gray-100 p-2 rounded-full duration-500 mr-2 active:scale-95",
                                                                            videoStatus.like_status == 0 ? "text-lblue bg-gray-100" : "text-gray-400 hover:text-lblue duration-500"
                                                                        )
                                                                    }>
                                                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none" />
                                                                            <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                                                                        </svg>
                                                                    </div>
                                                                </div>

                                                                <div href="#" onClick={() => addToWatchLater(video.id)}>
                                                                    <div className={
                                                                        classNames(
                                                                            "cursor-pointer flex hover:bg-gray-100 p-2 rounded-full duration-500 mr-2 active:scale-95",
                                                                            videoStatus.bookmark_status == true ? "text-lblue bg-gray-100" : "text-gray-400 hover:text-lblue duration-500"
                                                                        )
                                                                    } >
                                                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                                                                            <g>
                                                                                <rect fill="none" height="24" width="24" />
                                                                            </g>
                                                                            <g><g><g><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.2,16.2L11,13V7h1.5v5.2l4.5,2.7L16.2,16.2z" /></g></g></g>
                                                                        </svg>
                                                                        Watch Later
                                                                    </div>
                                                                </div>

                                                                <div href="#">
                                                                    <div className="cursor-pointer flex hover:bg-gray-100 p-2 rounded-full duration-500 mr-2 active:scale-95 text-gray-400 hover:text-lblue duration-500"
                                                                        onClick={shareVideo}>
                                                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                                                                            <path d="M0 0h24v24H0z" fill="none" /><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-px bg-gray-200 mb-4"></div>
                                                    <div>
                                                        <div className="font-bold mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            Description
                                                        </div>
                                                        <div className="mt-2 mb-4 text-sm text-justify flex-shrink-0 sm:mb-0">
                                                            {video.description}
                                                        </div>
                                                    </div>
                                                </div>


                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white shadow sm:rounded-lg scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-lblue scrollbar-track-rounded scrollbar-track-white" style=
                                                {{
                                                    // height: '100vh', 
                                                    overflow: 'auto'
                                                }} >
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900 px-4 pt-4 pb-2">
                                                    Recommended Videos
                                                </h2>
                                                {recommended.map((video, index) => {
                                                    return (
                                                        <>
                                                            <VideoMinItem video={video} />
                                                            {
                                                                (index + 1) != recommended.length ?
                                                                    <div className="px-2">
                                                                        <div className="w-full h-px bg-gray-200"></div>
                                                                    </div>
                                                                    : <></>
                                                            }
                                                        </>

                                                    )
                                                }


                                                )}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>


            </div>
            <ShareDialog showDialog={shareDialog} setShowDialog={setShareDialog} url={shareUrl} video={video} />
        </>
    )
}
function getVideoType($url) {
    if ($url == null) {
        return 'unknown'
    } else if ($url.includes('youtu')) {
        return 'youtube'
    } else if ($url.includes('vimeo')) {
        return 'vimeo'
    } else {
        return 'unknown'
    }
}
function getVimeoVideoId(url) {
    var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/
    var match = url.match(regExp);
    if (match) {
        return match[2]
    }
    return ''
}
function getYoutubeVideoId(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}
export async function getServerSideProps(context) {
    const { token } = cookies(context)
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login?redirect=" + encodeURIComponent('/career_explorer/career_video/' + context.params.id)
            }
        }
    }
    const videoClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })

    const video = await queryGraph(videoClient, { id: parseInt(context.params.id) }, SchemeGetVideo)
        .then((res) => {
            return res.videoDetails
        }).catch((networkErr) => {
            return {};
        })
    const recommended = await queryGraph(videoClient, {}, SchemeGetRecommendedVideos)
        .then((res) => {
            return res.recommendedVideo
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
        props: { profile, video, recommended, token }
    }
}


