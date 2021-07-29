import { Fragment, useState, useEffect } from 'react'
import {
    SelectorIcon
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile, SchemeGetAssessment, SchemeGetMIOReport } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'

import classNames from '/helpers/classNames'

import { Listbox, Transition, Dialog } from '@headlessui/react'

import styles from '/styles/Report.module.css'
import Expand from 'react-expand-animated';

import "react-multi-carousel/lib/styles.css";

import { Bar, Line, Pie } from 'react-chartjs-2';
import Breadcrumbs from '/components/Breadcrumbs'
import { SchemeGetMIOSCReport } from '/helpers/GraphQLSchemes'
import cookies from 'next-cookies'

export default function MIOReport({ profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)


    const index = 4;

    const pages = [
        {
            name: 'My Child', href: '/my_child/', current: false
        },
        {
            name: ' Report', href: '#', current: true
        },
    ]
    return (
        <>
            <MetaLayout title="MIO Assement Reports" description="MIO Assement Reports" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="MIO Report" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white rounded-md shadow h-30 p-4" style={{ height: "fit-content" }}>
                                                    <p className="font-medium">Assesment/MIO Assesment</p>

                                                    <div className="sm:flex mt-4">
                                                        <div className="relative flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            <img className="w-24 h-24 rounded" src="/img/test.png" />
                                                            <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white font-medium text-lg">Title</div>
                                                        </div>
                                                        <div className="flex">
                                                            <div>
                                                                <div className="text-base font-medium">Hello</div>
                                                                <div className="mt-1 text-xs font-normal text-justify">
                                                                    Hellodhsdfhdjffhdfhsfhsfhdfhsjksksfg;lnnios ihisdio sbi tk i wyotho
                                                                </div>
                                                            </div>
                                                            <img className="ml-4 w-16 object-contain" src="/img/fitment.png" alt="fitment" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white rounded-md shadow mt-4 p-4 relative">
                                                    <div className="flex h-52 text-xs">

                                                        <div className="w-1/5 px-4">
                                                            <div class="h-full bg-black rounded-t-full"></div>
                                                        </div>
                                                        <div className="w-1/5 px-4">
                                                            <div class="h-full bg-black rounded-t-full"></div>
                                                        </div>
                                                        <div className="w-1/5 px-4">
                                                            <div class="h-full bg-black rounded-t-full"></div>
                                                        </div>
                                                        <div className="w-1/5 px-4">
                                                            <div class="h-full bg-black rounded-t-full"></div>
                                                        </div>
                                                        <div className="w-1/5 px-4">
                                                            <div class="h-full bg-black rounded-t-full"></div>
                                                        </div>
                                                        <div className="w-1/5 px-4">
                                                            <div class="h-full bg-black rounded-t-full"></div>
                                                        </div>
                                                        <div className="w-1/5 px-4">
                                                            <div class="h-full bg-black rounded-t-full"></div>
                                                        </div>
                                                        <div className="w-1/5 px-4">
                                                            <div class="h-full bg-black rounded-t-full"></div>
                                                        </div>

                                                    </div>
                                                    <div className="absolute w-full">
                                                        <div className="h-px bg-black"></div>
                                                    </div>
                                                </div>


                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-2">

                                            <div className="bg-white rounded-md shadow p-4">
                                                <img src="/img/test.png" />
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
    function getOdListValue(title) {
        switch (title) {
            case 'kinesthetic':
                return openB.kinesthetic
            case 'naturalistic':
                return openB.naturalistic
            case 'interpersonal':
                return openB.interpersonal
            case 'intrapersonal':
                return openB.intrapersonal
            case 'logical':
                return openB.logical
            case 'visual':
                return openB.visual
            case 'rhythmic':
                return openB.rhythmic
            case 'linguistic':
                return openB.linguistic
        }
    }
    function toggleListValue(title) {
        switch (title) {
            case 'kinesthetic':
                openB.kinesthetic = !openB.kinesthetic
                break
            case 'naturalistic':
                openB.naturalistic = !openB.naturalistic
                break
            case 'interpersonal':
                openB.interpersonal = !openB.interpersonal
                break
            case 'intrapersonal':
                openB.intrapersonal = !openB.intrapersonal
                break
            case 'logical':
                openB.logical = !openB.logical
                break
            case 'visual':
                openB.visual = !openB.visual
                break
            case 'rhythmic':
                openB.rhythmic = !openB.rhythmic
                break
            case 'linguistic':
                openB.linguistic = !openB.linguistic
                break
        }
        setOpenB(openB)
        console.log(openB)
    }
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
        props: { profile, token }
    }
}


