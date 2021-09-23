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
import { SchemeSearch } from '../../helpers/GraphQLSchemes'

import classNames from '../../helpers/classNames'

export default function Service({ profile, services, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const pages = [
        {
            name: 'Services', href: '#', current: true
        },
    ]
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const [searchList, setSearchList] = useState([])

    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/services",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const searchService = (e) => {
        setLoading(true)
        setSearchText(e.target.value)
        queryGraph(client, {
            title: e.target.value
        }, SchemeSearch)
            .then((res) => {
                setLoading(false)
                setSearchList(res.searchServices)
            }).catch((networkErr) => {
                setLoading(false)
                console.log(networkErr)
            })
    }

    return (
        <>

            <MetaLayout title="Services" description="Services" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
                <NavigationLayout index="3" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Services" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <Breadcrumbs pages={pages} />
                        <div className="mx-4 bg-white shadow rounded-lg">
                            <div className="sm:flex h-full w-full">
                                <div className="w-full">
                                    <label htmlFor="search_field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400">
                                        <div className={
                                            classNames(
                                                searchText ? 'rounded-t-lg' : 'rounded-lg',
                                                "flex focus-within:text-black duration-500 relative"
                                            )
                                        }>

                                            <div className=" p-4 items-center pointer-events-none z-50" aria-hidden="true">
                                                <SearchIcon className="h-4 w-4" aria-hidden="true   " />
                                            </div>
                                            <input
                                                id="search_field"
                                                name="search_field"
                                                className={
                                                    classNames(
                                                        searchText ? 'rounded-t-lg' : 'rounded-lg',
                                                        "absolute pl-12 block w-full h-full py-4 pr-4 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:bg-gray-100 sm:text-sm bg-transparent duration-500"
                                                    )
                                                }
                                                placeholder="Search Services"
                                                type="search"
                                                value={searchText}
                                                onChange={searchService}

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                searchText ?
                                    searchList.length > 0 ?
                                        <div>
                                            {
                                                searchList.map((m, i) => (
                                                    <Link href={
                                                        m.is_cta_required ?
                                                            m.cta == 'JobFamilies_CareerPools' ? '/career_explorer/job_families' :
                                                                matchMedia.cta == 'UniversityFinder' ? '/career_explorer/course_and_university' :
                                                                    "/career_explorer" :
                                                            '/service/-1/serviceDetails/' + m.id + '/' + m.subcategory_id
                                                    }>
                                                        <a>
                                                            <div className={
                                                                classNames(
                                                                    searchList.length == i + 1 ? 'rounded-b-lg' : '',
                                                                    "p-4 hover:bg-lgrey-light duration-500"
                                                                )
                                                            }>{m.title}</div>
                                                        </a>
                                                    </Link>

                                                ))
                                            }
                                        </div> :
                                        <div className="p-4 text-gray-400">{loading ? 'Loading...' : 'No Data'}</div>
                                    : <></>
                            }

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
                                                        '/service/' + card.id :
                                                        card.cta == 'CareerVideos' ?
                                                            '/career_explorer/career_video' :
                                                            card.cta == 'Magazines' ?
                                                                '/career_explorer/magazine' :
                                                                '/service/' + card.id
                                                }>
                                                    <a>
                                                        <div key={card.id} className="relative bg-white overflow-hidden shadow rounded-lg hover:scale-105 hover:shadow-2xl duration-500"
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
        props: { profile, services, token }
    }
}

