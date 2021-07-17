import { useState } from 'react'
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

export default function Profile({ profile, token }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    return (
        <>
            <MetaLayout title="Profile" description="Profile" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Profile" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4 p-4 shadow rounded bg-white">

                            <div className="relative">
                                <label className="text-black pb-2 block text-xl left-0 absolute">Personal Details</label>
                                <Link href={{
                                    pathname: '/profile/edit_personal_details',
                                    query: { token: token }
                                }}>
                                    <a
                                        className="py-2 px-8 border border-lblue rounded-full text-sm font-medium text-lblue bg-white hover:bg-lblue hover:text-white focus:outline-none absolute right-0 duration-500">
                                        Edit
                                    </a>
                                </Link>
                            </div>

                            <div className="mt-10 w-12 h-0.5 rounded bg-lblue"></div>
                            <div className="sm:flex mt-4">
                                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                    <img className="w-32 h-32 rounded-full"
                                        src={
                                            (profile.profile_image == null || profile.profile_image == "") ?
                                                "../img/upload.svg" : profile.profile_image
                                        }
                                        alt="" />
                                </div>
                                <div className="self-center">
                                    <div className="text-base font-bold">{profile.name}</div>
                                    <div className="flex mt-2">
                                        <div className="text-base text-gray-400">{profile.mobile_number}</div>
                                        <svg
                                            className="ml-4 mr-2 self-center"
                                            viewBox="0 0 32 32"
                                            width="16" height="16"
                                        >
                                            <path
                                                id="path"
                                                d="M 16 0 C 11.758 0 7.686 1.687 4.686 4.686 C 1.687 7.686 0 11.758 0 16 C 0 20.242 1.687 24.314 4.686 27.314 C 7.686 30.313 11.758 32 16 32 C 20.242 32 24.314 30.313 27.314 27.314 C 30.313 24.314 32 20.242 32 16 C 32 11.758 30.313 7.686 27.314 4.686 C 24.314 1.687 20.242 0 16 0 Z"
                                                fill="#02c77d"
                                                strokeWidth="1" />
                                            <path
                                                id="path_1"
                                                d="M 14.046 18.686 L 21.805 10.926 L 22.999 12.12 L 14.046 21.073 L 8.674 15.701 L 9.868 14.508 Z"
                                                fill="#ffffff"
                                                strokeWidth="1" />
                                        </svg>
                                        <span className="self-center inline-block text-sm">Verified</span>
                                    </div>
                                    <div className="flex mt-1">
                                        <div className="text-base text-gray-400">{profile.email}</div>
                                        <svg
                                            className="ml-4 mr-2 self-center"
                                            viewBox="0 0 32 32"
                                            width="16" height="16"
                                        >
                                            <path
                                                id="path"
                                                d="M 16 0 C 11.758 0 7.686 1.687 4.686 4.686 C 1.687 7.686 0 11.758 0 16 C 0 20.242 1.687 24.314 4.686 27.314 C 7.686 30.313 11.758 32 16 32 C 20.242 32 24.314 30.313 27.314 27.314 C 30.313 24.314 32 20.242 32 16 C 32 11.758 30.313 7.686 27.314 4.686 C 24.314 1.687 20.242 0 16 0 Z"
                                                fill="#02c77d"
                                                strokeWidth="1" />
                                            <path
                                                id="path_1"
                                                d="M 14.046 18.686 L 21.805 10.926 L 22.999 12.12 L 14.046 21.073 L 8.674 15.701 L 9.868 14.508 Z"
                                                fill="#ffffff"
                                                strokeWidth="1" />
                                        </svg>
                                        <span className="self-center inline-block text-sm">Verified</span>
                                    </div>

                                </div>
                            </div>

                            <div className="my-4 w-full h-0.5 rounded bg-lgrey-border"></div>

                            <div className="relative">
                                <label className="text-black pb-2 block text-xl left-0 absolute">Child Details</label>
                                <Link href={{
                                    pathname: '/profile/edit_child_details',
                                    query: { token: token }
                                }}>
                                    <a
                                        className="py-2 px-8 border border-lblue rounded-full text-sm font-medium text-lblue bg-white hover:bg-lblue hover:text-white focus:outline-none absolute right-0 duration-500">
                                        Edit
                                    </a>
                                </Link>
                            </div>

                            <div className="mt-14 w-12 h-0.5 rounded bg-lblue"></div>
                            <div className="sm:flex mt-4">
                                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                    <img className="w-32 h-32 rounded-full"
                                        src={
                                            (profile.profile_image == null || profile.profile_image == "") ?
                                                "../img/upload.svg" : profile.profile_image
                                        }
                                        alt="" />
                                </div>
                                <div className="self-center">
                                    <div className="text-base font-bold">{profile.child_details.child_name}</div>
                                    <div className="text-sm mt-1 text-gray-400">{profile.child_details.gender} | {profile.child_details.grade} Class</div>
                                </div>
                            </div>

                            <div className="mt-4 w-full h-0.5 rounded bg-lgrey-border"></div>

                            <label className="text-black mt-4 pb-2 block text-xl">Your Prefrences</label>
                            <div className="mt-1 w-12 h-0.5 rounded bg-lblue"></div>

                        </div>

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center font-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
                    </main>
                </div>


            </div >

        </>
    )
}

export async function getServerSideProps(context) {
    const { token } = context.query
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
    return {
        props: { profile, token }
    }
}