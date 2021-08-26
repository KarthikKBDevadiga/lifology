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

import Draggable from 'react-draggable';

import SortableContainer from 'react-drag-sort'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import TestNa from '../components/TestNa'


export default function MIOReport({ profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const index = 4;


    return (
        <>
            <MetaLayout title="MIO Assement Reports" description="MIO Assement Reports" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <TestNa index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="MIO Report" />

                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <div className="m-4">

                            <Element name="test1" className="element h-screen" >
                                test 1
                            </Element>

                            <Element name="test2" className="element h-screen">
                                test 2
                            </Element>

                            <Element name="test3" className="element h-screen">
                                test 3
                            </Element>

                            <Element name="test4" className="element h-screen">
                                test 4
                            </Element>

                            <Element name="test5" className="element h-screen">
                                test 5
                            </Element>

                            <div id="anchor" className="element h-screen">
                                test 6 (anchor)
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


