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

export default function Page93({ profile }) {
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

                        <div className="m-4 p-4 shadow rounded bg-white">

                            <h2 className="text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate">Subscription Details</h2>
                            <div className="flex mt-4 items-center">
                                <div className="text-sm text-gray-900 sm:truncate mr-4">Current Plan</div>
                                <div
                                    className="py-2 px-4 rounded-full text-sm font-medium focus:outline-none bg-opacity-25" style={{ backgroundColor: 'rgba(243, 169, 95, 0.25)', color: '#F3A95F' }}>
                                    Free trial expired in 5 days
                                </div>
                            </div>

                            <div className="text-sm text-gray-900 sm:truncate mt-4">Expires on 16 Oct 2021, 10: 40 AM</div>
                            <div className="flex mt-4">
                                <div className="mt-4 flex md:mt-0">
                                    <Link href='/profile'>
                                        <a
                                            className="py-2 px-8 border border-lblue rounded-full text-sm font-medium text-lblue bg-white hover:bg-lblue hover:text-white focus:outline-none duration-500">
                                            Cancel Plan
                                        </a>
                                    </Link>
                                </div>
                                <div className="mt-4 flex md:mt-0 md:ml-4">
                                    <Link href='/profile'>
                                        <a
                                            className="py-2 px-8 border border-lblue rounded-full text-sm font-medium text-lblue bg-white hover:bg-lblue hover:text-white focus:outline-none duration-500">
                                            Renew Plan
                                        </a>
                                    </Link>
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