import { useState } from 'react'
import {
    ClockIcon,
    CreditCardIcon,
    ScaleIcon,
    UserGroupIcon,
} from '@heroicons/react/outline'
import {
    ArrowNarrowLeftIcon,
    CheckIcon,
    HomeIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    ThumbUpIcon,
    UserIcon,
} from '@heroicons/react/solid'
import { queryGraph } from '../../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile } from '../../helpers/GraphQLSchemes'
import Constants from '../../helpers/Constants.js'
import useLocalStorage from '../../helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import styles from '../../styles/Magazine.module.css'

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

export default function Magazine({ profile }) {
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
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="sm:flex h-full w-full">
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8">
                                                <img src="/img/test.png" className="rounded-lg" />
                                            </div>
                                            <div className="w-full self-center">
                                                <div className="text-sm">Zulie Rane in The Startup</div>
                                                <div className="font-bold mt-2 text-xl" >Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open</div>
                                                <div className="mt-2 text-sm" >I’ve Never Been Much Of A “Ritual” Person When It Comes To Writing. If I Need To, I Can Write Anywhere, Anytime, About Anything.</div>
                                                <div className="mt-2 text-sm text-gray-400">May 25 . 5 min read</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                        <div className="sm:flex h-full w-full">
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8  " >
                                                <div className="self-center font-medium text-base w-full">
                                                    <h2 className="text-xl ">Trending Magazines</h2>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <form className="w-full flex md:ml-0" action="#" method="GET">
                                                    <label htmlFor="search_field" className="sr-only">
                                                        Search
                                                    </label>
                                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600 rounded bg-gray-100">
                                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
                                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                        </div>
                                                        <input
                                                            id="search_field"
                                                            name="search_field"
                                                            className="block w-full h-full pl-12 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                                                            placeholder="Search Job Families"
                                                            type="search"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                                            {cards.map((card) => (
                                                <div className="bg-white overflow-hidden flex relative">
                                                    <img className="m-2 rounded-2xl w-20 h-20" src={card.image} />
                                                    <div className="top-0 mt-4 mb-4">
                                                        <div className="text-sm">{card.subheading}</div>
                                                        <div className="mt-2 font-bold">{card.heading}</div>
                                                        <div className="mt-2 text-sm text-gray-400">{card.date} . {card.read}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                    <div className="mt-4 max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white shadow sm:rounded-lg p-4">
                                                    <ul className={styles.topicGroup}>
                                                        <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 text-white bg-indigo-700">All</li>
                                                        <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">General</li>
                                                        <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Parenting</li>
                                                        <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Career</li>
                                                        <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Trending Career</li>
                                                    </ul>

                                                    <Carousel
                                                        swipeable={false}
                                                        draggable={false}
                                                        responsive={responsive}
                                                        ssr={true} // means to render carousel on server-side.
                                                        infinite={true}
                                                        autoPlaySpeed={1000}
                                                        keyBoardControl={true}
                                                        customTransition="all .5"
                                                        transitionDuration={500}
                                                        containerClass="carousel-container"
                                                        removeArrowOnDeviceType={["tablet", "mobile"]}
                                                        dotListClass="custom-dot-list-style"
                                                        itemClass="carousel-item-padding-40-px"
                                                    >
                                                        <div className="bg-red-100" style={{ height: '300px', }}>Item 1</div>
                                                        <div className="bg-red-200" style={{ height: '300px', }}>Item 2</div>
                                                        <div className="bg-red-300" style={{ height: '300px', }}>Item 3</div>
                                                        <div className="bg-red-400" style={{ height: '300px', }}>Item 4</div>
                                                    </Carousel>
                                                </div>
                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    Discover More Topics
                                                </h2>

                                                <h3 className="text-base mt-4">
                                                    Career Pools
                                                </h3>
                                                <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Data Analytics, Mathematics, & Statistics</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Architecture</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Armed Forces and Security</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Language & Linguistics</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">More</li>
                                                </ul>

                                                <h3 className="text-base mt-4">
                                                    Career Fields
                                                </h3>
                                                <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Computer Science and Applications</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Statisctics</li>
                                                    <li className="float-left bg-gray-200 px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 hover:text-white hover:bg-indigo-700">Data analysis</li>
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


