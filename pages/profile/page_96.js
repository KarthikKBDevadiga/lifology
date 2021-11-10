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

export default function Page96({ profile }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <MetaLayout title="Subscription" description="Subscription" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Subscription" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <div className="flex px-4 justify-center">
                            <div className="mt-4 mb-4 max-w-3xl w-full grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

                                <div className='space-y-4 lg:col-start-1 lg:col-span-2'>
                                    <div className='sm:flex bg-white shadow rounded-lg p-4 min-w-full'>
                                        <div className="md:flex md:items-center md:justify-between w-full">
                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate">News Feed</h2>
                                            </div>
                                            <div className="mt-4 flex md:mt-0 md:ml-4">
                                                <Link href='/profile'>
                                                    <a
                                                        className="text-lblue bg-white focus:outline-none duration-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                        </svg>
                                                    </a>
                                                </Link>
                                                <Link href='/profile'>
                                                    <a
                                                        className="ml-4 text-lblue bg-white focus:outline-none duration-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                        </svg>
                                                    </a>
                                                </Link>
                                                <Link href='/profile'>
                                                    <a
                                                        className="ml-4 text-lblue bg-white focus:outline-none duration-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                                        </svg>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-2 bg-white shadow rounded-lg p-4 min-w-full'>
                                        <div className="md:flex md:items-center md:justify-between w-full">
                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate">News Post</h2>
                                            </div>
                                        </div>
                                        <div className="flex mt-2">
                                            <div className="mr-4 flex-shrink-0">
                                                <img className="w-12 h-12 rounded-full"
                                                    src="../img/upload.svg"
                                                    alt="" />
                                            </div>
                                            <div className="w-full mt-2">
                                                <input className="w-full outline-none resize-none" placeholder="Write here or use @ to mention someone." />
                                            </div>
                                        </div>
                                        <div className="md:flex md:items-center md:justify-between">
                                            <div className="flex min-w-0">
                                                <div className="text-base font-bold text-gray-900 sm:text-sm sm:truncate">Post in: Profile </div>
                                                <div className="ml-4 text-base font-bold text-gray-900 sm:text-sm sm:truncate"> Upload photo</div>
                                            </div>
                                            <div className="mt-4 flex md:mt-0 md:ml-4">
                                                <Link href='/profile'>
                                                    <a
                                                        className="py-2 px-8 border border-lblue rounded-full text-sm font-medium text-lblue bg-white hover:bg-lblue hover:text-white focus:outline-none duration-500">
                                                        Cancel
                                                    </a>
                                                </Link>
                                                <Link href='/profile'>
                                                    <a
                                                        className="ml-4 py-2 px-8 border border-lblue rounded-full text-sm font-medium text-lblue bg-white hover:bg-lblue hover:text-white focus:outline-none duration-500">
                                                        Post
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-2 sm:flex bg-white shadow rounded-lg p-4 min-w-full'>
                                        <div className="md:flex md:items-center md:justify-between w-full">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex">
                                                    <h2 className="text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate">All Updates</h2>
                                                    <h2 className="ml-4 text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate">Likes</h2>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex md:mt-0 md:ml-4">
                                                <div className="w-full">
                                                    <div className="relative rounded-md shadow-sm">
                                                        <input
                                                            id="name"
                                                            name="name"
                                                            type="name"
                                                            autoComplete="name"
                                                            placeholder="Search Feeds"
                                                            className="border-gray-200 focus:border-indigo-700 rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border  duration-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-2 sm:flex bg-white shadow rounded-lg p-4 min-w-full'>
                                        <div>
                                            <div className="flex">
                                                <div className="mr-4 flex-shrink-0">
                                                    <img className="w-12 h-12 rounded-full"
                                                        src="../img/upload.svg"
                                                        alt="" />
                                                </div>
                                                <div className="w-full self-center">
                                                    <div className="test-sm font-bold">Johnathan</div>
                                                    <div className="text-xs text-gray-400">2 Days Ago</div>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                Go from uninspiring sketches to powerful interactive prototypes and watch people buy into your vision instantly.
                                            </div>
                                            <div className="mt-2 flex">
                                                <div className="cursor-pointer flex hover:bg-gray-100 px-4 py-2 rounded-full duration-500 mr-2 active:scale-95 text-gray-400 hover:text-lblue duration-500 self-center">
                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" />
                                                        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                                                    </svg>
                                                    <div className="ml-2 text-sm">Like</div>
                                                </div>

                                                <div className="ml-4 cursor-pointer flex hover:bg-gray-100 px-4 py-2 rounded-full duration-500 mr-2 active:scale-95 text-gray-400 hover:text-lblue duration-500 self-center">

                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
                                                    <div className="ml-2 text-sm">Comment</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='mt-2 sm:flex bg-white shadow rounded-lg p-4 min-w-full'>
                                        <div>
                                            <div className="flex">
                                                <div className="mr-4 flex-shrink-0">
                                                    <img className="w-12 h-12 rounded-full"
                                                        src="../img/upload.svg"
                                                        alt="" />
                                                </div>
                                                <div className="w-full self-center">
                                                    <div className="test-sm font-bold">Johnathan</div>
                                                    <div className="text-xs text-gray-400">2 Days Ago</div>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                Go from uninspiring sketches to powerful interactive prototypes and watch people buy into your vision instantly.
                                            </div>
                                            <div className="mt-2">
                                                <img className="w-full rounded-xl" src="../img/test.png" />
                                            </div>
                                            <div className="mt-2 flex">
                                                <div className="cursor-pointer flex hover:bg-gray-100 px-4 py-2 rounded-full duration-500 mr-2 active:scale-95 text-gray-400 hover:text-lblue duration-500 self-center">
                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" />
                                                        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                                                    </svg>
                                                    <div className="ml-2 text-sm">Like</div>
                                                </div>

                                                <div className="ml-4 cursor-pointer flex hover:bg-gray-100 px-4 py-2 rounded-full duration-500 mr-2 active:scale-95 text-gray-400 hover:text-lblue duration-500 self-center">

                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
                                                    <div className="ml-2 text-sm">Comment</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div aria-labelledby="" className="lg:col-start-3 lg:col-span-1">
                                    <div className="bg-white shadow sm:rounded-lg scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-lblue scrollbar-track-rounded scrollbar-track-white" style=
                                        {{
                                            // height: '100vh', 
                                            overflow: 'auto'
                                        }} >
                                        <h2 id="timeline-title" className="text-lg font-medium text-gray-900 px-4 pt-4 pb-2">
                                            Trending Articles

                                        </h2>
                                        <div className="group relative mx-2 my-4 rounded m-1 ">
                                            <div>
                                                <img className="rounded-t group-hover:filter-none duration-500 w-full h-32 object-cover" src='../img/career-guidence.png' />
                                                {/* <img className=" rounded-t " src={card.thumbnail} /> */}
                                                <div className="flex-1 flex items-center justify-between ">
                                                    <div className="flex-1 px-3 pb-2 text-sm  ">
                                                        <div >
                                                            George Aye In Surviving IDEO
                                                        </div>
                                                        <div >Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </main>
                </div>


            </div >

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
    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const profile = await queryGraph(client, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        });
    console.log(profile);
    return {
        props: { profile, token }
    }
}