import Link from 'next/link'
import { useState } from 'react'
import {
    BookmarkIcon
} from '@heroicons/react/outline'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import "react-multi-carousel/lib/styles.css";
import { SchemeCareerPools, SchemeCareerFields, SchemeGetProfile } from '/helpers/GraphQLSchemes'
import VideoDialog from '/components/dialog/VideoDialog'
import styles from '/styles/careerField.module.css'
import { SchemeGetUniversities } from '../../../../../helpers/GraphQLSchemes'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
}

export default function CareerFields({ profile, jobFamily, careerField, topics, skills, employment_areas, universities, token }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const [openVideo, setOpenVideo] = useState(false)
    return (
        <>
            <MetaLayout title={jobFamily.name} description={jobFamily.description} />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={"Career Explorer / Course & University / " + jobFamily.name} authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="lg:col-start-1 lg:col-span-2">
                                            <div className="bg-white align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg p-4">
                                                <div className="sm:flex h-full w-full">
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4 self-center">
                                                        <img className="object-contain rounded" src={jobFamily.image} style={{ maxHeight: '14rem', maxWidth: '14rem' }} />
                                                    </div>
                                                    <div className="w-full self-center text-left">

                                                        <div className="flex">
                                                            <div className="py-2 font-bold text-xl w-2/4" >{careerField.name}</div>

                                                            <div className="relative w-2/4">
                                                                <div className="absolute text-sm py-2 flex items-center right-0">
                                                                    <BookmarkIcon className="w-5 h-5 mr-2" />
                                                                    Add to bookmark
                                                                </div>
                                                            </div>

                                                        </div>





                                                        <div className="mt-2 text-sm text-justify" >{careerField.description}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">

                                                <h2 className="text-lg font-medium text-gray-900">
                                                    Universities
                                                </h2>

                                                <Carousel
                                                    swipeable={false}
                                                    draggable={false}
                                                    responsive={responsive}
                                                    ssr={true}
                                                    infinite={false}
                                                    autoPlaySpeed={1000}
                                                    keyBoardControl={true}
                                                    customTransition="all .5"
                                                    transitionDuration={500}
                                                    containerClass="carousel-container"
                                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                                    dotListClass="custom-dot-list-style"
                                                    itemClass="carousel-item-padding-40-px self-center"
                                                >
                                                    {universities.map((u) => {
                                                        console.log(u)
                                                        return (
                                                            <div className="self-center">
                                                                <img src={Constants.baseUrlImage + u.logo} />
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>

                                            </div>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    University Video
                                                </h2>
                                                <div className="relative">
                                                    <img className=" rounded mt-2" src={careerField.thumbnail} />
                                                    <a href="#" onClick={(event) => { setOpenVideo(true) }}>
                                                        <svg
                                                            className="absolute h-12 w-12 top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 hover:h-14 hover:w-14  duration-500"
                                                            viewBox="0 0 24 24"
                                                            id="vector">
                                                            <path
                                                                id="path"
                                                                d="M 12 2 C 6.48 2 2 6.48 2 12 C 2 17.52 6.48 22 12 22 C 17.52 22 22 17.52 22 12 C 22 6.48 17.52 2 12 2 Z"
                                                                fill="#ffc107"
                                                                strokeWidth="1" />
                                                            <path
                                                                id="path_1"
                                                                d="M 9.5 14.67 L 9.5 9.33 C 9.5 8.54 10.38 8.06 11.04 8.49 L 15.19 11.16 C 15.8 11.55 15.8 12.45 15.19 12.84 L 11.04 15.51 C 10.38 15.94 9.5 15.46 9.5 14.67 Z"
                                                                fill="#ffffff" />
                                                        </svg>
                                                    </a>

                                                </div>
                                            </div>
                                            <div className="mt-4 bg-white p-2 shadow sm:rounded-lg">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900 px-2 pt-2">
                                                    Topics of Study
                                                </h2>

                                                <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                    {
                                                        topics.map((t) => {
                                                            return (
                                                                <li className={"flex float-left px-1 py-1 text-xs rounded-full m-1 cursor-pointer bg-opacity-10 bg-" + t.color + "-500 hover:bg-opacity-100 duration-500"} key={t.name}>
                                                                    <div className={"self-center p-1 rounded-full h-6 w-6 bg-" + t.color + "-500"} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="self-center ml-2 mr-2 text-xs text-justify">{t.name}</span>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                <h2 id="timeline-title" className="pl-2 mt-4 text-lg font-medium text-gray-900">
                                                    Skills Required
                                                </h2>
                                                <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                    {
                                                        skills.map((s) => (
                                                            <li className={"flex float-left px-1 py-1 text-xs rounded-full m-1 cursor-pointer bg-opacity-10 bg-" + s.color + "-500 hover:bg-opacity-100 duration-500"} key={s.name}>
                                                                <div className={"self-center p-1 rounded-full h-6 w-6 bg-" + s.color + "-500"} >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                </div>
                                                                <span className="self-center ml-2 mr-2 text-xs text-justify">{s.name}</span>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                <h2 id="timeline-title" className="p-2 mt-4 text-lg font-medium text-gray-900">
                                                    Employment Areas
                                                </h2>
                                                <ul className={styles.topicGroup} style={{ marginTop: '8px' }}>
                                                    {
                                                        employment_areas.map((e) => (
                                                            <li className={"flex float-left px-1 py-1 text-xs rounded-full m-1 cursor-pointer bg-opacity-10 bg-" + e.color + "-500 hover:bg-opacity-100 duration-500"} key={e.name}>
                                                                <div className={"self-center p-1 rounded-full h-6 w-6 bg-" + e.color + "-500"} >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                </div>
                                                                <span className="self-center ml-2 mr-2 text-xs text-justify">{e.name}</span>
                                                            </li>
                                                        ))
                                                    }
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
            <VideoDialog showDialog={openVideo} setShowDialog={setOpenVideo} url={careerField.video} />
        </>
    )
}

const getColor = () => {
    const colors = ['blue', 'green', 'yellow', 'gray', 'indigo']
    var color = colors[Math.floor(Math.random() * colors.length)]
    return 'gray'
}

export async function getServerSideProps(context) {
    const { token } = context.query
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
    })
    const datas = await queryGraph(careerClient, {}, SchemeCareerPools)
        .then((res) => {
            return res.careerPools
        }).catch((networkErr) => {
            return {}
        })
    const jobFamily = datas.filter(x => x.id == context.params.id)[0]

    const careerFields = await queryGraph(careerClient, { pool_id: parseInt(context.params.id) }, SchemeCareerFields)
        .then((res) => {
            return res.careerFields
        }).catch((networkErr) => {
            return {}
        })
    const careerField = careerFields.filter(x => x.id == context.params.cfid)[0]

    var topics = []
    careerField.topics.map((t) => {
        topics.push(
            {
                name: t.name,
                color: getColor()
            }
        )
    })
    var skills = []
    careerField.skills.map((s) => {
        skills.push(
            {
                name: s.name,
                color: getColor()
            }
        )
    })
    var employment_areas = []
    careerField.employment_areas.map((ea) => {
        employment_areas.push(
            {
                name: ea.name,
                color: getColor()
            }
        )
    })

    const universitiesRaw = await queryGraph(careerClient, { pool_id: parseInt(context.params.id), field_id: parseInt(context.params.cfid) }, SchemeGetUniversities)
        .then((res) => {
            return res.allUniversity
        }).catch((networkErr) => {
            return {}
        })
    const universities = universitiesRaw[0].university
    console.log(universitiesRaw)

    const profileClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })

    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        })
    return {
        props: { profile, jobFamily, careerField, topics, skills, employment_areas, universities, token }
    }
}


