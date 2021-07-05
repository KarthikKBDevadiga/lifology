import { useState } from 'react'
import {
    ThumbUpIcon,
    ThumbDownIcon,
    ClockIcon,
} from '@heroicons/react/outline'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import styles from '/styles/Magazine.module.css'
import MetaLayout from '../../../components/MetaLayout'

import "react-multi-carousel/lib/styles.css";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const popularVideos = [
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    // More items...
]


export default function CareerVideoDetail({ profile, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")


    return (
        <>

            <MetaLayout title="Career Videos Details" description="Career Videos Details" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Career VideCareer Explorer / Career Videos / Career Videos Details" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white shadow sm:rounded-lg p-4">
                                                    <img src="/img/test.png" className="rounded w-full" />

                                                    <div className="sm:flex mt-4">
                                                        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            Career In Veterinary Science
                                                        </div>
                                                        <div className="self-center grid grid-cols-3 gap-4 ml-auto">
                                                            <div className="flex">
                                                                <ThumbUpIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                                                                Like
                                                            </div>
                                                            <div className="flex">
                                                                <ThumbDownIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                                                                Dislike
                                                            </div>
                                                            <div className="flex">
                                                                <ClockIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                                                                Watch Later
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-px bg-gray-200 my-4"></div>
                                                    <div>
                                                        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            Description
                                                        </div>
                                                        <div className="mb-4 text-sm text-justify flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel turpis nunc eget lorem. Massa vitae tortor condimentum lacinia. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Pellentesque nec nam aliquam sem et tortor consequat id.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel turpis nunc eget lorem. Massa vitae tortor condimentum lacinia. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Pellentesque nec nam aliquam sem et tortor consequat id.
                                                        </div>
                                                    </div>
                                                </div>


                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    Popular Videos
                                                </h2>
                                                <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">All</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Science</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">General</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Mathematics</li>
                                                </ul>
                                                {popularVideos.map((card) => (
                                                    <div className="flex">
                                                        <div className="mr-4 flex-shrink-0 self-start">
                                                            <img className="h-16 w-16 m-2 rounded object-cover" src={card.image} />
                                                        </div>
                                                        <div className="self-center">
                                                            <h4 className="text-sm font-bold">{card.heading}</h4>
                                                            <p className="mt-1 text-xs">
                                                                {card.subheading}
                                                            </p>
                                                            <div className="mt-2 text-xs text-gray-400">May 25 . 5 min read</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center front-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
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


