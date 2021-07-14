import Link from 'next/link'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import {
    ScaleIcon,
} from '@heroicons/react/outline'

import { queryGraph, mutateGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile, SchemeGetAssessmentQuestion, SchemeAnswerAssessmentQuestion, SchemeGetAssessment } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import classNames from '../../../helpers/classNames'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import LoadingDialog from '/components/dialog/LoadingDialog'


import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const cards = [
    { name: 'Job Families & Career Fields', href: 'career_explorer/job_families', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Course and University', href: 'career_explorer/course_and_university', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Scholarship Program', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Magazine', href: 'career_explorer/magazine', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Career Videos', href: 'career_explorer/career_video', icon: ScaleIcon, amount: '$30,659.45' },
]

export default function Assessment({ profile, assessment, questions, token }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const [questionNo, setQuestionNo] = useState(1)
    const [percentageCompleted, setPercentageCompleted] = useState(1 / questions.length)

    const [selectedQuestion, setSelectedQuestion] = useState({})
    const [selectedOption, setSelectedOption] = useState({})

    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, slider] = useKeenSlider({
        initial: 0,
        controls: false,
        duration: 0,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide)
            setQuestionNo(s.details().relativeSlide + 1)
            setPercentageCompleted((s.details().relativeSlide) / questions.length)
            setSelectedQuestion(questions[s.details().relativeSlide])
        },
    })

    const answer = event => {
        if (selectedOption.score == null) return
        console.log('answer')
        const assessmentClient = new ApolloClient({
            uri: Constants.baseUrl + "/api/assessment",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        setLoadingDialog(true)

        mutateGraph(assessmentClient,
            {
                assessment_type: 2,
                assessment_id: parseInt(assessment.id),
                question_id: parseInt(selectedQuestion.id),
                scores: [parseInt(selectedOption.score)]
            },
            SchemeAnswerAssessmentQuestion)
            .then((res) => {
                setLoadingDialog(false)
                slider.next()
                console.log('Success')
            }).catch((networkErr) => {
                setLoadingDialog(false)
                console.log('Error')
            });
    }

    return (
        <>

            <MetaLayout title={"My Child / " + assessment.title + " Assesment"} description={"My Child / " + assessment.title + " Assesment"} />
            <div className="min-h-screen flex overflow-hidden bg-gray-100 font-roboto">
                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={"My Child / " + assessment.title + " Assesment"} authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4 h-screen">
                                        <div className="flex">
                                            <div className="w-2/4 font-bold text-sm" >{assessment.title} Test</div>
                                            <div className="w-2/4 font-bold text-sm text-right" >View Instructions</div>
                                        </div>

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
                                                    strokeDasharray: '150',
                                                    animation: 'dash 5s linear',
                                                    strokeDashoffset: 'calc(150 - 150 * ' + percentageCompleted + ')'
                                                }} transform="rotate(60, 50, 50)"
                                                ></circle>
                                            </svg>
                                            <div className="absolute flex top-0 left-0 w-full h-full items-center justify-center font-bold text-sm">
                                                {questionNo}/{questions.length}
                                            </div>
                                        </div>

                                        <div className="navigation-wrapper">
                                            <div ref={sliderRef} className="keen-slider">
                                                {
                                                    questions.map((question) => {
                                                        return (
                                                            <div className="keen-slider__slide number-slide1 py-4 px-2">
                                                                <div className="mb-8">
                                                                    <div className="font-bold text-lg">{question.question_title}</div>
                                                                </div>
                                                                <RadioGroup value={selectedOption} onChange={setSelectedOption}>
                                                                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                                                                        {question.score_options.map((option) => (
                                                                            <RadioGroup.Option
                                                                                key={option.label}
                                                                                value={option}
                                                                                className="my-4 cursor-pointer"
                                                                            // className={({ active }) =>
                                                                            //     classNames(
                                                                            //         active ? ' bg-lgreen' : 'bg-white',
                                                                            //         'my-4 cursor-pointer '
                                                                            //     )
                                                                            // }
                                                                            >
                                                                                {({ checked }) => (
                                                                                    <>
                                                                                        <div className={
                                                                                            classNames(
                                                                                                checked ? 'bg-lgreen shadow-xl text-white' : 'bg-white shadow text-gray-900',
                                                                                                "w-full h-full items-center px-4 py-4 rounded-lg hover:bg-lgreen hover:text-white hover:shadow-xl duration-500"
                                                                                            )
                                                                                        }>
                                                                                            <div className="text-sm z-50">
                                                                                                <RadioGroup.Label as="div" className=
                                                                                                    "font-medium text-center"
                                                                                                >
                                                                                                    {option.label}
                                                                                                </RadioGroup.Label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                )}
                                                                            </RadioGroup.Option>
                                                                        ))}
                                                                    </div>
                                                                </RadioGroup>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                        <a
                                            onClick={answer}
                                            className="w-max mt-4 ml-auto flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue hover:bg-indigo-700 focus:outline-none">
                                            Submit
                                        </a>

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
            <LoadingDialog showDialog={loadingDialog} setShowDialog={setLoadingDialog} />

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
    console.log(assessment)
    const questions = await queryGraph(assessmentClient, { assessment_type: 2, assessment_id: parseInt(context.params.id) }, SchemeGetAssessmentQuestion)
        .then((res) => {
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

