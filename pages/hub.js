import { useState } from 'react'
import Link from 'next/link'

import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import cookies from 'next-cookies'
import { SchemeGetAvailablePackage, SchemeGetCoachesList, SchemeGetPackagesList } from '../helpers/GraphQLSchemes'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Coaching({ profile,token }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

   
    const pages = [
        {
            name: 'Coaching', href: '/coaching', current: true
        },
    ]
    return (
        <>
            <MetaLayout title="Services / Personal Coaching" description="Services / Personal Coaching" />
            <div className="flex h-screen overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="5" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Services / Personal Coaching" />

                    <main className="relative z-0 flex-1 overflow-y-auto">
                    <iframe className='w-full h-screen' src={"https://hubm.lifology.com/wp-login.php?sso="+token+"&output=embed"} width="100%" ></iframe>

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
    return {
        props: { profile, token }
    }
}