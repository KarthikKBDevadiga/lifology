import Link from 'next/link'
import { useState } from 'react'
import {
    ScaleIcon,
} from '@heroicons/react/outline'

import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '../components/MetaLayout'

const cards = [
    { title: 'Face', subtitle: 'Core Behaviour', href: '#', bg: '/img/my_child/face.png' },
    { title: 'MIO', subtitle: 'Intelligence Orientation', href: '#', bg: '/img/my_child/mio.png' },
    { title: 'MTI', subtitle: 'Environmental Interaction', href: '#', bg: '/img/my_child/mti.png' },
    { title: 'VAK', subtitle: 'Learning Style', href: '#', bg: '/img/my_child/vak.png' },
    { title: 'Care', subtitle: 'Learning Preferences', href: '#', bg: '/img/my_child/care.png' },
    { title: 'GRIT', subtitle: 'Passion & Perseverence', href: '#', bg: '/img/my_child/grit.png' },
    { title: 'Competancy', subtitle: '21st Century Skills', href: '#', bg: '/img/my_child/competancy.png' },
    // More items...
]

export default function MyChild({ profile, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    // if (authToken == "") {
    //     router.push({
    //         pathname: '/login',
    //     })
    // }


    return (
        <>

            <MetaLayout title="Career Explorer" description="Career Explorer" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 lg:grid-cols-5">
                                            {/* Card */}
                                            {cards.map((card) => (
                                                <div key={card.name} className="group relative bg-white overflow-hidden shadow hover:shadow-xl active:shadow-sm rounded-lg bg-cover duration-500"
                                                    style={{ backgroundImage: 'url(\'' + '\')', height: '200px', }}
                                                >
                                                    {/* <div className="absolute h-full w-7/12 bg-gradient-to-r from-lblue via-lblue to-transparent"  >
                                                    </div> */}
                                                    <img src={card.bg} className="rounded-lg w-full object-cover group-hover:scale-150 group-hover:rotate-12 duration-500" style={{ height: '200px' }} />
                                                    <div className="absolute p-4 top-0">
                                                        <div className="text-white w-9/12 font-medium text-xl">{card.title}</div>
                                                        <div className="text-white w-9/12 text-sm mt-2">{card.subtitle}</div>
                                                        <div className="mt-2 w-0 h-0.5 rounded bg-white group-hover:w-full duration-500"></div>
                                                    </div>
                                                    <div className="absolute p-4 bottom-0">
                                                        <Link
                                                            href={{
                                                                pathname: card.href,
                                                                query: { token: authToken }
                                                            }}>
                                                            <a>
                                                                <div className="mt-4 w-min rounded-full py-2 px-8 bg-white text-sm">Start</div>
                                                            </a>
                                                        </Link>

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
        props: { profile, token }
    }
}

