import Link from 'next/link'
import { useState } from 'react'
import {
    ScaleIcon,
} from '@heroicons/react/outline'

import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile, SchemeGetAssessmentQuestion } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import { SchemeGetAssessment } from '../../../helpers/GraphQLSchemes'

const cards = [
    { name: 'Job Families & Career Fields', href: 'career_explorer/job_families', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Course and University', href: 'career_explorer/course_and_university', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Scholarship Program', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Magazine', href: 'career_explorer/magazine', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Career Videos', href: 'career_explorer/career_video', icon: ScaleIcon, amount: '$30,659.45' },
]

export default function Assessment({ profile, assessment, questions, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    return (
        <>

            <MetaLayout title="Career Explorer" description="Career Explorer" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer" authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4">
                                        <div className="flex">
                                            <div className="w-2/4 font-bold text-sm" >{assessment.title} Test</div>
                                            <div className="w-2/4 font-bold text-sm text-right" >View Instructions</div>
                                        </div>

                                        <div className="relative mt-4">
                                            <div className="relative w-14 h-14 z-50 ml-auto">
                                                <svg className="w-full h-full" >
                                                    <circle cx="24" cy="24" r="24" style={{
                                                        fill: 'none',
                                                        stroke: '#F3F3F3',
                                                        strokeWidth: '4',
                                                        strokeLinecap: 'round',
                                                        transform: 'translate(5px, 5px)'
                                                    }}></circle>
                                                    <circle cx="24" cy="24" r="24" style={{
                                                        stroke: '#02C77D',
                                                        fill: 'none',
                                                        strokeWidth: '4',
                                                        strokeLinecap: 'round',
                                                        transform: 'translate(5px, 5px)',
                                                        strokeDasharray: '440',
                                                        strokeDashoffset: '440'
                                                    }} transform="rotate(60, 50, 50)"
                                                    ></circle>
                                                </svg>
                                                <div className="absolute flex top-0 left-0 w-full h-full items-center justify-center font-bold text-sm">
                                                    1/{questions.length}
                                                </div>
                                            </div>

                                            <div className="absolute bottom-0">
                                                <div className="font-bold text-lg">I Find it difficult to sit still for long periods of time</div>
                                            </div>

                                        </div>
                                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-6 lg:grid-cols-6">
                                            <div className="shadow rounded px-4 py-8 text-center">
                                                Very True
                                            </div>
                                            <div className="shadow rounded px-4 py-8 text-center">
                                                True
                                            </div>
                                            <div className="shadow rounded px-4 py-8 text-center">
                                                Not Sure
                                            </div>
                                            <div className="shadow rounded px-4 py-8 text-center">
                                                Not True
                                            </div>
                                            <div className="shadow rounded px-4 py-8 text-center">
                                                Not True At All
                                            </div>
                                        </div>
                                        <Link
                                            href={{
                                                pathname: "/my_child/" + assessment.id + "/assessment",
                                                query: { token: token }
                                            }}>
                                            <a
                                                className="w-max mt-4 ml-auto flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue hover:bg-indigo-700 focus:outline-none">
                                                Submit
                                            </a>
                                        </Link>

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
    const assessmentClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/assessment",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const assessment = await queryGraph(assessmentClient, { id: parseInt(context.params.id) }, SchemeGetAssessment)
        .then((res) => {
            return res.assessmentDetails
        }).catch((networkErr) => {
            return {}
        })
    const questions = await queryGraph(assessmentClient, { assessment_type: 1, assessment_id: parseInt(context.params.id) }, SchemeGetAssessmentQuestion)
        .then((res) => {
            console.log(res.assessmentQuestions)
            return res.assessmentQuestions
        }).catch((networkErr) => {
            return []
        })

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
        });
    return {
        props: { profile, assessment, questions, token }
    }
}

