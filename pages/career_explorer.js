import { useState } from 'react'
import {
    ScaleIcon,
} from '@heroicons/react/outline'

import { queryGraph } from '../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '../helpers/GraphQLSchemes'
import Constants from '../helpers/Constants.js'
import useLocalStorage from '../helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../components/NavigationLayout'
import HeaderLayout from '../components/HeaderLayout'

const cards = [
    { name: 'Job Families & Career Fields', href: 'career_explorer/job_families', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Course and University', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Scholarship Program', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Magazine', href: 'career_explorer/magazine', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Career Videos', href: 'career_explorer/career_video', icon: ScaleIcon, amount: '$30,659.45' },
    // More items...
]

export default function CareerExplorer({ profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    // if (authToken === '') {
    //     router.push({
    //         pathname: '/login',
    //     })
    // }

    return (
        <>
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            {/* Card */}
                                            {cards.map((card) => (
                                                <div key={card.name} className="relative bg-white overflow-hidden shadow rounded-lg"
                                                    style={{ backgroundImage: 'url(\'/img/test.png\')', height: '200px', }}
                                                >
                                                    <div className="absolute h-full w-7/12 bg-gradient-to-r from-indigo-800 via-indigo-800 to-transparent"  >
                                                    </div>
                                                    <div className="absolute p-5 top-0">
                                                        <div className="text-white w-9/12 font-medium text-xl">{card.name}</div>
                                                    </div>
                                                    <div className="absolute p-5 bottom-0 right-0">
                                                        <a href="#" onClick={() => {

                                                            router.push({
                                                                pathname: card.href,
                                                                query: { token: authToken }
                                                            })
                                                        }}>
                                                            <div className="mt-4 w-min rounded-2xl text-white py-1 px-3 bg-yellow-400">Explore</div>
                                                        </a>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center font-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
                    </main>
                </div>


            </div >
        </>
    )
}


export async function getServerSideProps(context) {
    const { token } = context.query;
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
            // console.log(networkErr);
        });
    return {
        props: { profile }
    }
}
