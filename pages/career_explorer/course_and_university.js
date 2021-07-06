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
import { SchemeGetAllUniversity, SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile, SchemeGetUniversityCountry } from '../../helpers/GraphQLSchemes'
import Constants from '../../helpers/Constants.js'
import useLocalStorage from '../../helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import styles from '../../styles/Magazine.module.css'
import MetaLayout from '../../components/MetaLayout'
import Link from 'next/link'



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


export default function CourceAndUniversity({ profile, countries, universities, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")


    return (
        <>
            <MetaLayout title="Magazine" description="Magazine" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Course & University" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-lblue-light">
                                        <div className="sm:flex h-full w-full">
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8">
                                                <img src="/img/course-university-header.png" style={{ height: "250px" }} />
                                            </div>
                                            <div className="w-full self-center text-right p-4">
                                                <div className="font-bold text-xl text-white" >Explore Universities & their Courses</div>
                                                <div className="mt-4 text-sm text-white" >I’ve Never Been Much Of A “Ritual” Person When It Comes To Writing. If I Need To, I Can </div>
                                                <div className="mt-2 text-sm text-white">Write Anywhere, Anytime, About Anything</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                            {/* Description list*/}
                                            <ul className={styles.topicGroup}>
                                                {countries.map((c) => (
                                                    <li key={c.country} className="float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer bg-lgrey-bg border border-lgrey-border duration-500 hover:bg-lblue hover:text-white">{c.country}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                        <div className="sm:flex h-full w-full">
                                            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8" >
                                                <div className="self-center font-medium text-base w-full">
                                                    <h2 className="text-xl ">Explore Lists of all Universities</h2>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <form className="w-full flex md:ml-0" action="#" method="GET">
                                                    <label htmlFor="search_field" className="sr-only">
                                                        Search
                                                    </label>
                                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600 rounded bg-lgrey">
                                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
                                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                        </div>
                                                        <input
                                                            id="search_field"
                                                            name="search_field"
                                                            className="block w-full h-full pl-12 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                                                            placeholder="Search University"
                                                            type="search"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                                            {universities.map((u) => (
                                                <Link href={{
                                                    pathname: 'course_and_university/' + u.id,
                                                    query: { token: authToken }
                                                }}>
                                                    <a>
                                                        <div className="bg-white overflow-hidden shadow rounded p-4">
                                                            <img className="rounded-2xl w-full ml-auto mr-auto object-contain" src={Constants.baseUrlImage + '/' + u.logo} />
                                                            <div className="top-0 mt-4 text-center">
                                                                <div className="text-sm font-bold">{u.name}</div>
                                                                <div className="text-xs mt-2">{u.city}, {u.state}, {u.country}</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
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
    const careerClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const countries = await queryGraph(careerClient, {}, SchemeGetUniversityCountry)
        .then((res) => {
            return res.universityCountry
        }).catch((networkErr) => {
            return [];
            // console.log(networkErr);
        });
    const universities = await queryGraph(careerClient, {}, SchemeGetAllUniversity)
        .then((res) => {
            return res.allUniversity[0].university
        }).catch((networkErr) => {
            return []
        });

    console.log(countries);

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
        props: { profile, countries, universities, token }
    }
}


