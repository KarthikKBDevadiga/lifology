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

export default function Profile({ profile, serviceDetails }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const content = JSON.parse(serviceDetails.templete_content)
    return (
        <>
            <MetaLayout title="Services Details" description="Service Details" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="w-full max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            <div className="m-4 p-4 shadow rounded bg-white lg:col-start-1 lg:col-span-2">
                                <div className="relative h-0" style={{ paddingBottom: '56.25%', paddingTop: '0px' }}>
                                    <iframe title="vimeo-player" src={'https://www.youtube.com/embed/' + getyoutubeId(content.video)} className="absolute rounded-lg top-0 left-0 w-full h-full" frameBorder="0" allowFullScreen>
                                    </iframe>

                                </div>

                                <div className="mt-4" dangerouslySetInnerHTML={{ __html: content.html_body }}>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        </>
    )
}
function getyoutubeId($url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = $url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
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
                destination: "/login"
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
        props: { profile, token, serviceDetails }
    }
}