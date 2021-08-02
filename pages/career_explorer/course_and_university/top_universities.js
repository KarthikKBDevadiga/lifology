import Link from 'next/link'
import { Fragment, useState, useRef, useEffect } from 'react'
import {
    DotsVerticalIcon,
    SearchIcon,
    ArrowRightIcon,
    SortAscendingIcon
} from '@heroicons/react/solid'
import { Dialog, Menu, Transition, RadioGroup } from '@headlessui/react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile, SchemeGetVideos } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classNames from '/helpers/classNames'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'
import YoutubeDialog from '../../../components/dialog/YoutubeDialog'
import { SchemeGetTopUniversities } from '../../../helpers/GraphQLSchemes'

const headerSlide = [
    {
        id: 1,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open"
    },
    {
        id: 2,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open"
    },

    {
        id: 3,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open"
    }
]

export default function CareerVideo({ profile, universities }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [selectedSort, setSelectedSort] = useState('')

    const pages = [
        {
            name: 'Career Explorer', href: '/career_explorer/', current: false
        },
        { name: 'Top Universities', href: '#', current: true },
    ]

    return (
        <>

            <MetaLayout title="Top University" description="Top University" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Top University" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="" >

                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col">
                                    <Breadcrumbs pages={pages} />

                                    <Link href="/career_explorer/course_and_university">
                                        <a className="self-end w-max">
                                            <div className="mx-4 mb-4 hover:text-lblue duration-500 text-right w-max">View All Universities</div>
                                        </a>
                                    </Link>

                                    {
                                        universities.map(u => {
                                            const [sliderRef, slider] = useKeenSlider({
                                                initial: 0,
                                                loop: false,
                                                controls: true,
                                                duration: 500,
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
                                            return (<div className="shadow rounded bg-white py-4 mx-4 mb-4">
                                                <div className="text-black mx-4 block text-base font-bold">
                                                    {u.title}
                                                </div>
                                                <div className="relative flex items-center">
                                                    <a
                                                        onClick={(event) => {
                                                            slider.prev()
                                                        }}>
                                                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                            </svg>
                                                        </div>
                                                    </a>
                                                    <a
                                                        onClick={(event) => {
                                                            slider.next()
                                                        }}>
                                                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    </a>

                                                    <div className="navigation-wrapper w-full">
                                                        <div ref={sliderRef} className="keen-slider">
                                                            {u.university.map((card) => (
                                                                <div className="keen-slider__slide self-center">
                                                                    <Link href={{
                                                                        pathname: '/career_explorer/course_and_university/' + card.id,
                                                                    }}>
                                                                        <a>
                                                                            <div className="rounded bg-gray shadow p-2 mx-2 m-4 hover:shadow-lg hover:scale-105 duration-500">
                                                                                <img className="ml-auto mr-auto" src={Constants.baseUrlImage + card.logo} />
                                                                            </div>
                                                                        </a>
                                                                    </Link>

                                                                </div>
                                                            ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>)
                                        })
                                    }


                                    <div className="h-4"></div>
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
    const videosClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const universities = await queryGraph(videosClient, {}, SchemeGetTopUniversities)
        .then((res) => {
            return res.topUniversity
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
        props: { profile, universities }
    }
}


