import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
    ScaleIcon, SearchIcon,
} from '@heroicons/react/outline'

import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import Breadcrumbs from '/components/Breadcrumbs'

import cookies from 'next-cookies'
import { SchemeGetAssessments } from '/helpers/GraphQLSchemes'
import { SchemeGetServices } from '/helpers/GraphQLSchemes'


export default function Service({ profile, services }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const pages = [
        {
            name: 'Services', href: '#', current: true
        },
    ]

    const cards = [
        { name: 'Job Families & Career Fields', href: '/career_explorer/job_families', icon: ScaleIcon, amount: '$30,659.45' },
        { name: 'Course and University', href: '/career_explorer/course_and_university/top_universities', icon: ScaleIcon, amount: '$30,659.45' },
        // { name: 'Scholarship Program', href: '/career_explorer', icon: ScaleIcon, amount: '$30,659.45' },
        // { name: 'Magazine', href: '/career_explorer/magazine', icon: ScaleIcon, amount: '$30,659.45' },
        { name: 'Career Videos', href: '/career_explorer/career_video', icon: ScaleIcon, amount: '$30,659.45' },
    ]
    return (
        <>

            <MetaLayout title="Career Explorer" description="Career Explorer" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
                <NavigationLayout index="3" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <Breadcrumbs pages={pages} />
                        <div className="p-4 mx-4 bg-white shadow rounded">
                            <div className="sm:flex h-full w-full">
                                <div className="w-full">
                                    <label htmlFor="search_field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400 ">
                                        <div className="flex rounded bg-lgrey focus-within:text-gray-600 ">
                                            <div className="p-2 items-center pointer-events-none" aria-hidden="true">
                                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                            </div>
                                            <input
                                                id="search_field"
                                                name="search_field"
                                                className="block w-full h-full p-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent mr-10"
                                                placeholder="Search Services"

                                            />
                                            <button className="flex p-2 w-max absolute right-0 items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                                            >
                                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="m-4">
                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            {/* Card */}
                                            {services.map((card) => (
                                                <Link href={
                                                    card.cta == null ?
                                                        'service/' + card.id :
                                                        card.cta == 'CareerVideos' ?
                                                            'career_explorer/career_video' :
                                                            card.cta == 'Magazines' ?
                                                                'career_explorer/magazine' :
                                                                'service/' + card.id
                                                }>
                                                    <a>
                                                        <div key={card.id} className="relative bg-white overflow-hidden shadow rounded-lg"
                                                            style={{ height: '200px', }}
                                                        >

                                                            <div className="absolute h-full w-7/12 bg-gradient-to-r from-lblue via-lblue to-transparent"  >
                                                            </div>
                                                            <img src={card.image} className="rounded-lg" />
                                                            <div className="absolute p-5 top-0">
                                                                <div className="text-white w-9/12 font-medium text-xl">{card.title}</div>
                                                            </div>
                                                            <div className="absolute p-5 bottom-0 left-0">
                                                                <div className="mt-4 w-min rounded-2xl text-white py-1 px-3 bg-lyellow">Explore</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </Link>

                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

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

    const assessmentClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/services",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const services = await queryGraph(assessmentClient, {}, SchemeGetServices)
        .then((res) => {
            return res.servicesCategory
        }).catch((networkErr) => {
            return []
        })

    console.log(services)
    const profileClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        });
    return {
        props: { profile, services }
    }
}

