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

                        <div className="mt-8" style={{ margin: '16px' }}>

                            <div className="max-w-6xl mx-auto" style={{ marginTop: '16px' }}>
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
                                        style={{ padding: '16px', background: 'white' }}>
                                        <div className="sm:flex" style={{ height: '100%', width: '100%' }}>
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8 ">
                                                <img src="/img/test.png" style={{ borderRadius: '8px' }} />
                                            </div>
                                            <div style={{ width: '100%', alignSelf: 'center' }}>
                                                <div style={{ fontSize: '14px' }}>Zulie Rane in The Startup</div>
                                                <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '8px' }}>Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open</div>
                                                <div style={{ fontSize: '14px', marginTop: '8px' }}>I’ve Never Been Much Of A “Ritual” Person When It Comes To Writing. If I Need To, I Can Write Anywhere, Anytime, About Anything.</div>
                                                <div style={{ fontSize: '14px', color: '#9A9A9A', marginTop: '8px' }}>May 25 . 5 min read</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4"
                                        style={{ padding: '16px', background: 'white' }}>
                                        <div className="sm:flex" style={{ height: '100%', width: '100%' }}>
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8  " >
                                                <div style={{ alignSelf: 'center', fontWeight: '500', fontSize: '16px', width: '100%' }} >
                                                    <h2 className="text-xl ">Trending Magazines</h2>
                                                </div>
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <form className="w-full flex md:ml-0" action="#" method="GET">
                                                    <label htmlFor="search_field" className="sr-only">
                                                        Search
                                                    </label>
                                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600" style={{ background: '#F8F8F8', borderRadius: '4px' }}>
                                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
                                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                        </div>
                                                        <input
                                                            id="search_field"
                                                            name="search_field"
                                                            className="block w-full h-full pl-12 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                                                            placeholder="Search Job Families"
                                                            type="search"
                                                            style={{ background: 'transparent' }}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                                            {cards.map((card) => (
                                                <div className="bg-white overflow-hidden" style={{ position: 'relative', display: 'flex' }}
                                                >
                                                    <img src={card.image} width="80px" height="80px" style={{ margin: '8px', borderRadius: '16px', width: '80px', height: '80px' }} />
                                                    <div style={{ top: '0', marginTop: '16px', marginBottom: '16px' }}>
                                                        <div style={{ fontSize: '14px' }}>{card.subheading}</div>
                                                        <div style={{ marginTop: '8px', fontWeight: 'bold' }}>{card.heading}</div>
                                                        <div style={{ marginTop: '8px', fontSize: '14px', color: '#9A9A9A' }}>{card.date} . {card.read}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                    <div className="mt-4 max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white shadow sm:rounded-lg" style={{ padding: '16px' }}>
                                                    <ul className={styles.topicGroup}>
                                                        <li className={styles.topicItem} style={{ background: '#085CA4', color: 'white' }}>All</li>
                                                        <li className={styles.topicItem}>General</li>
                                                        <li className={styles.topicItem}>Parenting</li>
                                                        <li className={styles.topicItem}>Career</li>
                                                        <li className={styles.topicItem}>Trending Career</li>
                                                    </ul>
                                                </div>
                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    Discover More Topics
                                                </h2>

                                                <h3 style={{ fontSize: '16px', marginTop: '16px' }}>
                                                    Career Pools
                                                </h3>
                                                <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                    <li className={styles.topicItem}>Data Analytics, Mathematics, & Statistics</li>
                                                    <li className={styles.topicItem}>Architecture</li>
                                                    <li className={styles.topicItem}>Armed Forces and Security</li>
                                                    <li className={styles.topicItem}>Language & Linguistics</li>
                                                    <li className={styles.topicItem}>More</li>
                                                </ul>

                                                <h3 style={{ fontSize: '16px', marginTop: '16px' }}>
                                                    Career Fields
                                                </h3>
                                                <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                    <li className={styles.topicItem}>Computer Science and Applications</li>
                                                    <li className={styles.topicItem}>Statisctics</li>
                                                    <li className={styles.topicItem}>Data analysis</li>
                                                    <li className={styles.topicItem}>Mathematics</li>
                                                </ul>
                                            </div>
                                        </section>
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


