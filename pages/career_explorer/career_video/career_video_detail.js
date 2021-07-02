import { useState } from 'react'
import {
    CreditCardIcon,
    ScaleIcon,
    UserGroupIcon,
    ThumbUpIcon,
    ThumbDownIcon,
    ClockIcon,
} from '@heroicons/react/outline'
import {
    ArrowNarrowLeftIcon,
    CheckIcon,
    HomeIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    UserIcon,
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import styles from '/styles/Magazine.module.css'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const cards = [
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    { heading: 'FACT CHECK: Is Bitcoin mining environmentally unfriendly?', subheading: 'Coin base in the Coin Blog', image: '/img/career-guidence.png', date: 'May 25', read: '5 min read' },
    // More items...
]
const attachments = [
    { name: 'resume_front_end_developer.pdf', href: '#' },
    { name: 'coverletter_front_end_developer.pdf', href: '#' },
]
const eventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
    {
        id: 1,
        type: eventTypes.applied,
        content: 'Applied to',
        target: 'Front End Developer',
        date: 'Sep 20',
        datetime: '2020-09-20',
    },
    {
        id: 2,
        type: eventTypes.advanced,
        content: 'Advanced to phone screening by',
        target: 'Bethany Blake',
        date: 'Sep 22',
        datetime: '2020-09-22',
    },
    {
        id: 3,
        type: eventTypes.completed,
        content: 'Completed phone screening with',
        target: 'Martha Gardner',
        date: 'Sep 28',
        datetime: '2020-09-28',
    },
    {
        id: 4,
        type: eventTypes.advanced,
        content: 'Advanced to interview by',
        target: 'Bethany Blake',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
    {
        id: 5,
        type: eventTypes.completed,
        content: 'Completed interview with',
        target: 'Katherine Snyder',
        date: 'Oct 4',
        datetime: '2020-10-04',
    },
]

export default function CareerVideoDetail({ profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    return (
        <>
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Magazines" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="mt-4 max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
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
        props: { profile }
    }
}


