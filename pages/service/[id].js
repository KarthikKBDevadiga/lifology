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

export default function Service({ profile, services }) {
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
            <MetaLayout title="MTI Assement Reports" description="MTI Assement Reports" />
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
                                                                    // onClick={
                                                                    //     (event) => {
                                                                    //         setIndex(s.id)
                                                                    //     }
                                                                    // }
                                                                    className={classNames(
                                                                        s.id == index ? 'text-white bg-lblue' : 'text-black bg-white hover:bg-indigo-100 hover:text-lblue',
                                                                        "mt-4 font-medium text-sm p-2 rounded-md items-center flex duration-500"
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
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4 w-full">
                                                {
                                                    services.map((s) => (
                                                        <Element name={'ss' + s.id} className="element">
                                                            <div>
                                                                <div className="text-base font-medium px-4 pt-4">{s.title}</div>
                                                                {
                                                                    s.services.map(ss => {
                                                                        if (ss.image.startsWith('http'))
                                                                            return <img src={ss.image} className="w-full object-cover h-48 rounded mt-4" />
                                                                        else
                                                                            return <></>
                                                                    })
                                                                }
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
        props: { profile, services }
    }
}