import Link from 'next/link'
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import {
    ScaleIcon,
    CheckIcon,
    ExclamationIcon
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

import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";

export default function Assessment({ profile, assessment, questions, token }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [successDialog, setSuccessDialog] = useState(false)
    const [errorDialog, setErrorDialog] = useState(false)

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const [questionNo, setQuestionNo] = useState(1)
    const [percentageCompleted, setPercentageCompleted] = useState(1 / questions.length)

    const [orderedOptions, setOrderedOptions] = useState(questions)
    const [selectedQuestion, setSelectedQuestion] = useState({})
    const [selectedOption, setSelectedOption] = useState({})

    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, slider] = useKeenSlider({
        initial: 0,
        controls: false,
        duration: 0,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide)
            setQuestionNo(assessment.attempted_questions + s.details().relativeSlide + 1)
            setPercentageCompleted((assessment.attempted_questions + s.details().relativeSlide) / (assessment.attempted_questions + questions.length))
            setSelectedQuestion(questions[s.details().relativeSlide])
            setOrderedOptions(questions[s.details().relativeSlide].score_options)
        },
    })

    const answer = event => {
        var scores = []

        if (assessment.assessment_type == 1) {
            orderedOptions.map((option) => {
                scores.push(parseInt(option.score))
            })
        }
        else if (assessment.assessment_type == 2) {
            if (selectedOption.score == null) {
                setErrorDialog(true)
                return
            }
            scores.push(parseInt(selectedOption.score))
            setSelectedOption({})
        }
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
                assessment_type: assessment.assessment_type,
                assessment_id: parseInt(assessment.id),
                question_id: parseInt(selectedQuestion.id),
                scores: scores
            },
            SchemeAnswerAssessmentQuestion)
            .then((res) => {
                setLoadingDialog(false)
                console.log(questionNo + ' ' + questions.length)
                if (questionNo == (assessment.attempted_questions + questions.length)) {
                    setSuccessDialog(true)
                    setTimeout(() => {
                        setSuccessDialog(false)
                        router.push({
                            pathname: '/my_child/' + assessment.id + '/report/' + assessment.title.toLowerCase(),
                            query: { token: authToken }
                        })
                    }, 1000)
                } else {
                    slider.next()
                }
                console.log('Success')
            }).catch((networkErr) => {
                setLoadingDialog(false)
                console.log('Error')
            });
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            orderedOptions,
            result.source.index,
            result.destination.index
        );

        setOrderedOptions(items)
    }
    resetServerContext()

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
                                                {questionNo}/{assessment.attempted_questions + questions.length}
                                            </div>
                                        </div>



                                        <div className="navigation-wrapper">
                                            <div ref={sliderRef} className="keen-slider">
                                                {
                                                    questions.map((question) => {
                                                        return (
                                                            <div className="keen-slider__slide number-slide1 py-4 px-2">
                                                                <div className="mb-8">
                                                                    <div className="font-bold text-lg ml-5">{question.question_title}</div>
                                                                </div>
                                                                <div className="flex">
                                                                    {
                                                                        assessment.assessment_type == 2 ?
                                                                            <>
                                                                                <RadioGroup value={selectedOption} onChange={setSelectedOption}>
                                                                                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                                                                                        {question.score_options.map((option) => (
                                                                                            <RadioGroup.Option
                                                                                                key={option.label}
                                                                                                value={option}
                                                                                                className="my-4 cursor-pointer"
                                                                                            >
                                                                                                {({ checked }) => (
                                                                                                    <>
                                                                                                        <div className={
                                                                                                            classNames(
                                                                                                                checked ? 'bg-lgreen shadow-xl text-white' : 'bg-white shadow text-gray-900',
                                                                                                                "w-full h-full items-center px-4 py-4 rounded-lg hover:bg-lgreen hover:text-white hover:shadow-xl duration-500"
                                                                                                            )
                                                                                                        }>
                                                                                                            <div className="text-base z-50">
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
                                                                            </> : <>
                                                                                <img className="mr-5 " src="/img/assessment_left.svg"></img>
                                                                                <DragDropContext onDragEnd={onDragEnd}>
                                                                                    <Droppable droppableId="droppable">
                                                                                        {(provided, snapshot) => (
                                                                                            <div
                                                                                                className=" "
                                                                                                {...provided.droppableProps}
                                                                                                ref={provided.innerRef}
                                                                                            >
                                                                                                {orderedOptions.map((item, index) => (
                                                                                                    <Draggable key={item.label} draggableId={item.label + "" + item.score + "" + index} index={index}>
                                                                                                        {(provided, snapshot) => (
                                                                                                            <div
                                                                                                                className="shadow p-4 mb-4 bg-white"
                                                                                                                ref={provided.innerRef}
                                                                                                                {...provided.draggableProps}
                                                                                                                {...provided.dragHandleProps}
                                                                                                            >
                                                                                                                {item.label}
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </Draggable>
                                                                                                ))}
                                                                                                {provided.placeholder}
                                                                                            </div>
                                                                                        )}
                                                                                    </Droppable>
                                                                                </DragDropContext>

                                                                                <div className="flex flex-col">
                                                                                    <img className="ml-32 mt-20 w-10 h-20" src="/img/assessment_right.svg"></img>
                                                                                    <p className="mt-2 ml-20 text-xs font-light">Re Order (Drag & Drop) the choices bases <br /> on your preferences </p>
                                                                                </div>
                                                                            </>
                                                                    }

                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>

                                        <a
                                            onClick={answer}
                                            className="w-max mt-4 ml-auto flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue hover:bg-indigo-700 focus:outline-none cursor-pointer">
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

            <Transition.Root show={successDialog} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={successDialog} onClose={setSuccessDialog}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-4">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Assessment Completed
                                        </Dialog.Title>
                                        <button className="absolute h-0 w-0 overflow-hidden" />
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={errorDialog} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={errorDialog} onClose={setErrorDialog}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Please Select An Answer
                                        </Dialog.Title>
                                        <button className="absolute h-0 w-0 overflow-hidden" />
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

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
    const questions = await queryGraph(assessmentClient, { assessment_type: assessment.assessment_type, assessment_id: parseInt(context.params.id) }, SchemeGetAssessmentQuestion)
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

