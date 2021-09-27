import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'

import classNames from '/helpers/classNames'

import { SchemeGetServicesCategory } from '/helpers/GraphQLSchemes'
import Breadcrumbs from '/components/Breadcrumbs'
import cookies from 'next-cookies'
import Link from 'next/link'
import React, { useState } from 'react'
import {
    Link as ScrollLink
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
            <div className="flex overflow-hidden bg-gray-100 font-roboto">

                <div >
                    <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'space-around' }}>
                        <li><ScrollLink activeClass="active" to="home" spy={true} smooth={true}>Home</ScrollLink></li>
                        <li><ScrollLink to="about" spy={true} smooth={true}>About</ScrollLink></li>
                        <li><ScrollLink to="contact" spy={true} smooth={true}>Contact</ScrollLink></li>
                        <li><ScrollLink to="service" spy={true} smooth={true}>Service</ScrollLink></li>
                    </ul>
                    <>
                        <div id="home" style={{ height: 500 }}>
                            <h1>This is Home section</h1>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellendus. Totam nihil similique a repellat minus dolor amet quasi. Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
                        </div>
                        <div id="about" style={{ height: 500 }}>
                            <h1>This is About section</h1>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellendus. Totam nihil similique a repellat minus dolor amet quasi. Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
                        </div>
                        <div id="contact" style={{ height: 500 }}>
                            <h1>This is Contact section</h1>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellendus. Totam nihil similique a repellat minus dolor amet quasi. Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
                        </div>
                        <div id="service" style={{ height: 500 }}>
                            <h1>This is Service section</h1>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellendus. Totam nihil similique a repellat minus dolor amet quasi. Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
                        </div>
                    </>
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