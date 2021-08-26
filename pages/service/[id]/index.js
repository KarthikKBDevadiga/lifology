import { useState, useEffect } from 'react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'

import classNames from '/helpers/classNames'

import "react-multi-carousel/lib/styles.css";

import { SchemeGetServicesCategory } from '/helpers/GraphQLSchemes'
import Breadcrumbs from '/components/Breadcrumbs'
import cookies from 'next-cookies'
import Link from 'next/link'

import {
    Link as MyLink,
    DirectLink,
    Element,
    Events,
    animateScroll as scroll,
    scrollSpy,
    scroller
} from "react-scroll";

export default function Service({ profile, services, id }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [openLS, setOpenLS] = useState(true)
    const [openWMY, setOpenWMY] = useState(false)
    const [openDWTW, setOpenDWTW] = useState(false)

    var carouselLS;
    var carouselWMY;
    var carouselDWTW;

    const [index, setIndex] = useState(services[0].id)

    const pages = [
        {
            name: 'Services', href: '/service/', current: false
        },
        {
            name: 'Service Details', href: '#', current: true
        },
    ]
    return (
        <>
            <MetaLayout title="Service" description="Service" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="3" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="MTI Report" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-1">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >

                                                {/* <SettingNavigationLayout index="5" /> */}

                                                <div className="space-y-4 shadow bg-white px-4 pb-4 pt-px rounded">
                                                    {
                                                        services.map((s) => (
                                                            <MyLink activeClass="active" className={'ss' + s.id} to={'ss' + s.id} spy={true} smooth={true} duration={500}>
                                                                <div
                                                                    onClick={
                                                                        (event) => {
                                                                            setIndex(s.id)
                                                                        }
                                                                    }
                                                                    className={classNames(
                                                                        s.id == index ? 'text-white bg-lblue' : 'text-black bg-white hover:bg-indigo-100 hover:text-lblue',
                                                                        "cursor-pointer mt-4 font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                                                    )}
                                                                >
                                                                    {s.title}
                                                                </div>
                                                            </MyLink>

                                                        ))
                                                    }

                                                </div>

                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-2 lg:col-span-3 overflow-auto w-full h-screen">
                                            <div className="bg-white px-4 pb-4 shadow rounded sm:px-4 w-full">
                                                {
                                                    services.map((s) => (
                                                        <Element name={'ss' + s.id} className="element">

                                                            <div>
                                                                <div className="text-base font-medium pt-4">{s.title}</div>
                                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 mt-4">
                                                                    {
                                                                        s.services.map(ss => {
                                                                            if (ss.is_cta_required) {
                                                                                return <Link href={
                                                                                    ss.cta == 'JobFamilies_CareerPools' ? '/career_explorer/job_families' :
                                                                                        ss.cta == 'UniversityFinder' ? '/career_explorer/course_and_university' :
                                                                                            "/career_explorer"
                                                                                }>
                                                                                    <a>
                                                                                        <div className="group h-24 relative bg-white overflow-hidden shadow rounded-lg hover:shadow-2xl hover:scale-105 duration-500"
                                                                                        >
                                                                                            <div className="absolute h-full w-full h-48 bg-gradient-to-r from-lblue via-lblue to-transparent" />
                                                                                            <div className="absolute p-5 top-0">
                                                                                                <div className="text-white font-medium text-xl">{ss.title}</div>

                                                                                                <div className="mt-2 w-12 h-1 rounded bg-lyellow group-hover:w-full duration-500"></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </Link>
                                                                            } else {
                                                                                return (
                                                                                    <Link href={"/service/" + id + '/serviceDetails/' + ss.id + '/' + ss.subcategory_id}>
                                                                                        <a>
                                                                                            {/* <img src={ss.image} className="w-full object-cover h-48 rounded mt-4" /> */}
                                                                                            <div className="group relative bg-white overflow-hidden shadow rounded-lg hover:shadow-2xl hover:scale-105 duration-500"
                                                                                            >
                                                                                                <div className="absolute h-full w-7/12 bg-gradient-to-r from-lblue via-lblue to-transparent" />
                                                                                                <img src={ss.image} className="rounded-lg w-full object-cover h-48 rounded " />
                                                                                                <div className="absolute p-5 top-0">
                                                                                                    <div className="text-white font-medium text-xl">{ss.title}</div>

                                                                                                    <div className="mt-2 w-12 h-1 rounded bg-lyellow group-hover:w-full duration-500"></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </a>
                                                                                    </Link>
                                                                                )
                                                                            }

                                                                        })
                                                                    }
                                                                </div>

                                                                <div className="w-full h-px bg-gray-200 mt-4 rounded"></div>
                                                            </div>
                                                        </Element>
                                                    ))
                                                }
                                                {/* {
                                                    services.map((s) => (
                                                        <Element name={s.id} className="element">
                                                            <div className="text-base font-medium px-4 pt-4">{s.title}</div>
                                                            {
                                                                s.services.map(ss => (
                                                                    <img className="h-96 object-cover w-full mt-4 rounded" src={ss.image} />
                                                                ))
                                                            }
                                                        </Element>
                                                    ))
                                                } */}

                                            </div>
                                        </section>
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
// JobFamilies.getInitialProps = async (context) => {
// const [authToken, setAuthToken] = useLocalStorage("authToken", "")
// }

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
    const serviceClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/services",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const services = await queryGraph(serviceClient, { id: parseInt(context.params.id) }, SchemeGetServicesCategory)
        .then((res) => {
            return res.servicesSubCategory
        }).catch((networkErr) => {
            return {};
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
        props: { profile, services, id: context.params.id }
    }
}