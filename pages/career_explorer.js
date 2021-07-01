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
    { name: 'Career Videos', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
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

                        <div className="mt-8" style={{ margin: '16px' }}>

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
                                        style={{ padding: '16px', background: 'white' }}>
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            {/* Card */}
                                            {cards.map((card) => (
                                                <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg"
                                                    style={{ backgroundImage: 'url(\'/img/test.png\')', height: '200px', position: 'relative' }}
                                                >
                                                    <div style={{ position: 'absolute', height: '100%', width: '60%', backgroundImage: 'linear-gradient(to right,#085CA4,#085CA4, transparent)' }} >
                                                    </div>
                                                    <div className="p-5" style={{ position: 'absolute', top: '0' }}>
                                                        <div style={{ fontSize: '22px', color: 'white', width: '70%', fontWeight: '500' }}>{card.name}</div>
                                                        <div style={{ width: '40px', height: '2px', background: '#FFC400', borderRadius: '1px', marginTop: '8px' }}></div>
                                                    </div>
                                                    <div className="p-5" style={{ position: 'absolute', bottom: '0', right: '0' }}>
                                                        <a href="#" onClick={() => {

                                                            router.push({
                                                                pathname: card.href,
                                                                query: { token: authToken }
                                                            })
                                                        }}>
                                                            <div style={{ color: 'white', background: '#FFC400', padding: '0.25rem 0.75rem', borderRadius: '30px', width: 'fit-content', marginTop: '16px' }}>Explore</div>
                                                        </a>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <footer style={{ boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)', padding: '16px' }}>
                            <div style={{ textAlign: 'center', fontWeight: '500' }}>Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
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
