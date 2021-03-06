import { useState, useEffect } from 'react'
import Link from 'next/link'

import { Dialog, Transition } from '@headlessui/react'
import { mutateGraph, queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeEditProfile, SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import ProgressBar from '/components/ProgressBar'
import { Fragment } from 'react'
import MetaLayout from '/components/MetaLayout'
import cookies from 'next-cookies'
import { SchemeGetServiceDetails } from '../../../../../helpers/GraphQLSchemes'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import MagazineItem from '/components/item/MagazineItem'
import VideoItem from '/components/item/VideoItem'
import ShareDialog from '/components/dialog/ShareDialog'
import createDynamicLink from '/helpers/DynamicLinkUtil'

export default function Profile({ profile, serviceDetails, q }) {

    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [shareDialog, setShareDialog] = useState(false)
    const [shareUrl, setShareUrl] = useState('')

    const content = JSON.parse(serviceDetails.templete_content)
    console.log(content)

    const [sliderVideoRef, sliderVideo] = useKeenSlider({
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
    })
    const [sliderMagRef, sliderMag] = useKeenSlider({
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
    })

    const shareVideo = () => {
        setShareDialog(true)
        createDynamicLink('/service/' + q.id + '/serviceDetails/' + q.sid + '/' + q.scid)
            .then((res) => {
                setShareUrl(res)
                console.log(res)
            })
    }

    return (
        <>
            <MetaLayout title="Services Details" description="Service Details" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="" />

                    <main className="flex-1 relative z-0 overflow-y-auto ">

                        <div className=" m-4 p-4  shadow rounded bg-white">
                            {
                                content.video ?
                                    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="lg:col-start-1 lg:col-span-2">
                                            <div className="relative h-0" style={{ paddingBottom: '56.25%', paddingTop: '0px' }}>
                                                <iframe title="vimeo-player" src={'https://www.youtube.com/embed/' + getyoutubeId(content?.video)} className="absolute rounded-lg top-0 left-0 w-full h-full" frameBorder="0" allowFullScreen>
                                                </iframe>
                                            </div>
                                        </div>
                                    </div>
                                    : <></>
                            }

                            <div className="sm:flex-shrink-0 sm:flex sm:items-center self-center">
                                <div className="mt-4 text-xs">
                                    <div>
                                        <div className="cursor-pointer flex hover:bg-gray-100 p-2 rounded-full duration-500 mr-2 active:scale-95 text-gray-400 hover:text-lblue duration-500" onClick={shareVideo}>
                                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                                                <path d="M0 0h24v24H0z" fill="none" /><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                            </svg>
                                            Share
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-4" dangerouslySetInnerHTML={{ __html: content.html_body }}>
                            </div>
                        </div>

                        {
                            content.videos.length > 0 ?
                                <div className="mx-4 mt-4 pt-4  align-middle  overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="text-black mx-4 block text-base font-bold">
                                            Recommended Videos for you
                                        </div>
                                    </div>
                                    <div className="relative flex items-center">
                                        <a
                                            onClick={(event) => {
                                                sliderVideo.prev()
                                            }}>
                                            <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a
                                            onClick={(event) => {
                                                sliderVideo.next()
                                            }}>
                                            <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </a>
                                        <div className="navigation-wrapper w-full">
                                            <div ref={sliderVideoRef} className="keen-slider">
                                                {
                                                    content.videos.map((video) => (
                                                        <div className="keen-slider__slide">
                                                            <VideoItem video={video} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                        }


                        {
                            content.magazines.length > 0 ?
                                <div className="mx-4 mt-4 pt-4  align-middle  overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="text-black mx-4 block text-base font-bold">
                                            Recommended Articles for you
                                        </div>
                                    </div>
                                    <div className="relative flex items-center">
                                        <a
                                            onClick={(event) => {
                                                sliderMag.prev()
                                            }}>
                                            <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </div>
                                        </a>
                                        <a
                                            onClick={(event) => {
                                                sliderMag.next()
                                            }}>
                                            <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </a>
                                        <div className="navigation-wrapper w-full">
                                            <div ref={sliderMagRef} className="keen-slider">
                                                {
                                                    content.magazines.map((magazine) => (
                                                        <div className="keen-slider__slide">
                                                            <MagazineItem
                                                                magazine={magazine} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                        }
                        <div className="h-4"></div>

                    </main>
                </div>
            </div >
            <ShareDialog showDialog={shareDialog} setShowDialog={setShareDialog} url={shareUrl} title={serviceDetails.title} />
        </>
    )
}
function getyoutubeId($url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    var match = $url.match(regExp)
    if (match && match[2].length == 11) {
        return match[2]
    } else {
        //error
    }
}

export async function getServerSideProps(context) {
    const { token } = cookies(context)
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login?redirect=" + encodeURIComponent('/service/' + context.params.id + '/serviceDetails/' + context.params.sid + '/' + context.params.scid)
            }
        }
    }
    const servicesClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/services",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const serviceDetails = await queryGraph(servicesClient, {
        subcategory_id: parseInt(context.params.scid),
        id: parseInt(context.params.sid),
    }, SchemeGetServiceDetails)
        .then((res) => {
            console.log(res)
            return res.serviceDetails
        }).catch((networkErr) => {
            return {};
        })
    console.log(serviceDetails)

    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const profile = await queryGraph(client, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        })
    return {
        props: { profile, token, serviceDetails, q: context.params }
    }
}