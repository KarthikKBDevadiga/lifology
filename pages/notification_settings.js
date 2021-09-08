import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, Switch } from '@headlessui/react'
import {
    SelectorIcon
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '../components/MetaLayout'

import { Listbox, } from '@headlessui/react'

import "react-multi-carousel/lib/styles.css";
import SettingNavigationLayout from '../components/SettingNavigationLayout'
import cookies from 'next-cookies'
import { SchemeNotificationSettings, SchemeUpdateNotificationSettings } from '../helpers/GraphQLSchemes'
import { mutateGraph } from '../helpers/GraphQLCaller'
import LoadingDialog from '../components/dialog/LoadingDialog'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function NotificationSettings({ profile, notification, token }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loadingDialog, setLoadingDialog] = useState(false)

    const [allNotificationEnable, setAllNotificationEnable] = useState(notification?.find(n => n.key == 'all_notification').value)
    const [assessmentNotificationEnable, setAssessmentNotificationEnable] = useState(notification?.find(n => n.key == 'assessment_notification').value)
    const [coachingNotificationEnable, setCoachingNotificationEnable] = useState(notification?.find(n => n.key == 'coaching_notification').value)
    const [videoNotificationEnable, setVideoNotificationEnable] = useState(notification?.find(n => n.key == 'video_notification').value)
    const [jobNotificationEnable, setJobNotificationEnable] = useState(notification?.find(n => n.key == 'job_career_notification').value)
    const [courseNotificationEnable, setCourseNotificationEnable] = useState(notification?.find(n => n.key == 'course_university_notification').value)
    const [skillNotificationEnable, setSkillNotificationEnable] = useState(notification?.find(n => n.key == 'life_skill_notification').value)
    const [articleNotificationEnable, setArticleNotificationEnable] = useState(notification?.find(n => n.key == 'article_notification').value)
    const [lifologyHubNotificationEnable, setLifologyHubNotificationEnable] = useState(notification?.find(n => n.key == 'lifology_hub_notification').value)
    const [subscriptionNotificationEnable, setSubscriptionNotificationEnable] = useState(notification?.find(n => n.key == 'subscription_notification').value)

    const updateNotificationSettings = async () => {
        setLoadingDialog(true)
        const profileClient = new ApolloClient({
            uri: Constants.baseUrl + "/api/user",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        await mutateGraph(profileClient,
            {
                all_notification: allNotificationEnable,
                assessment_notification: assessmentNotificationEnable,
                coaching_notification: coachingNotificationEnable,
                video_notification: videoNotificationEnable,
                job_career_notification: jobNotificationEnable,
                course_university_notification: courseNotificationEnable,
                life_skill_notification: skillNotificationEnable,
                article_notification: articleNotificationEnable,
                lifology_hub_notification: lifologyHubNotificationEnable,
                subscription_notification: subscriptionNotificationEnable
            }, SchemeUpdateNotificationSettings)
            .then((res) => {
                setLoadingDialog(false)
            }).catch((networkErr) => {
                setLoadingDialog(false)
                console.log(networkErr)
            })
    }

    return (
        <>
            <MetaLayout title="Notification Settings" description="Notification Settings" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Settings / Notification" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-1">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <SettingNavigationLayout index="1" />
                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-2 lg:col-span-2">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <div className="text-lg text-center font-bold">
                                                    Notification Settings
                                                </div>

                                                {/* <div className="h-px w-full bg-lgrey-dark rounded-full mt-4"></div> */}
                                                <div className="mx-4">

                                                    <Switch.Group as="div" className="flex items-center mt-4">
                                                        <Switch
                                                            checked={allNotificationEnable}
                                                            onChange={setAllNotificationEnable}
                                                            className={classNames(
                                                                allNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    allNotificationEnable ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                        <Switch.Label as="span" className="ml-3">
                                                            <span className="text-base text-gray-900">All Notification</span>
                                                        </Switch.Label>
                                                    </Switch.Group>

                                                    <Switch.Group as="div" className="flex items-center mt-4">
                                                        <Switch
                                                            checked={assessmentNotificationEnable}
                                                            onChange={setAssessmentNotificationEnable}
                                                            className={classNames(
                                                                assessmentNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    assessmentNotificationEnable ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                        <Switch.Label as="span" className="ml-3">
                                                            <span className="text-base text-gray-900">Assessment Notification</span>
                                                        </Switch.Label>
                                                    </Switch.Group>

                                                    <Switch.Group as="div" className="flex items-center mt-4">
                                                        <Switch
                                                            checked={coachingNotificationEnable}
                                                            onChange={setCoachingNotificationEnable}
                                                            className={classNames(
                                                                coachingNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    coachingNotificationEnable ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                        <Switch.Label as="span" className="ml-3">
                                                            <span className="text-base text-gray-900">Coaching Notification</span>
                                                        </Switch.Label>
                                                    </Switch.Group>

                                                    <Switch.Group as="div" className="flex items-center mt-4">
                                                        <Switch
                                                            checked={videoNotificationEnable}
                                                            onChange={setVideoNotificationEnable}
                                                            className={classNames(
                                                                videoNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    videoNotificationEnable ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                        <Switch.Label as="span" className="ml-3">
                                                            <span className="text-base text-gray-900">Video Notification</span>
                                                        </Switch.Label>
                                                    </Switch.Group>

                                                    <Switch.Group as="div" className="flex items-center mt-4">
                                                        <Switch
                                                            checked={jobNotificationEnable}
                                                            onChange={setJobNotificationEnable}
                                                            className={classNames(
                                                                jobNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    jobNotificationEnable ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                        <Switch.Label as="span" className="ml-3">
                                                            <span className="text-base text-gray-900">Job and Career Notification</span>
                                                        </Switch.Label>
                                                    </Switch.Group>

                                                    <Switch.Group as="div" className="flex items-center mt-4">
                                                        <Switch
                                                            checked={courseNotificationEnable}
                                                            onChange={setCourseNotificationEnable}
                                                            className={classNames(
                                                                courseNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    courseNotificationEnable ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                        <Switch.Label as="span" className="ml-3">
                                                            <span className="text-base text-gray-900">Course And University Notification</span>
                                                        </Switch.Label>
                                                    </Switch.Group>

                                                    <Switch.Group as="div" className="flex items-center mt-4">
                                                        <Switch
                                                            checked={skillNotificationEnable}
                                                            onChange={setSkillNotificationEnable}
                                                            className={classNames(
                                                                skillNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    skillNotificationEnable ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                        <Switch.Label as="span" className="ml-3">
                                                            <span className="text-base text-gray-900">Life Skill Lesson Notification</span>
                                                        </Switch.Label>
                                                    </Switch.Group>
                                                    <Switch.Group as="div" className="flex items-center mt-4">
                                                        <Switch
                                                            checked={articleNotificationEnable}
                                                            onChange={setArticleNotificationEnable}
                                                            className={classNames(
                                                                articleNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    articleNotificationEnable ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                        <Switch.Label as="span" className="ml-3">
                                                            <span className="text-base text-gray-900">Article Notification</span>
                                                        </Switch.Label>
                                                    </Switch.Group>
                                                    <Switch.Group as="div" className="flex items-center mt-4">
                                                        <Switch
                                                            checked={lifologyHubNotificationEnable}
                                                            onChange={setLifologyHubNotificationEnable}
                                                            className={classNames(
                                                                lifologyHubNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    lifologyHubNotificationEnable ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                        <Switch.Label as="span" className="ml-3">
                                                            <span className="text-base text-gray-900">Lifology Hub Notification</span>
                                                        </Switch.Label>
                                                    </Switch.Group>
                                                    <Switch.Group as="div" className="flex items-center mt-4">
                                                        <Switch
                                                            checked={subscriptionNotificationEnable}
                                                            onChange={setSubscriptionNotificationEnable}
                                                            className={classNames(
                                                                subscriptionNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    subscriptionNotificationEnable ? 'translate-x-5' : 'translate-x-0',
                                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                )}
                                                            />
                                                        </Switch>
                                                        <Switch.Label as="span" className="ml-3">
                                                            <span className="text-base text-gray-900">Subscription Notification</span>
                                                        </Switch.Label>
                                                    </Switch.Group>


                                                </div>
                                                <button
                                                    onClick={updateNotificationSettings}
                                                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                                                    Apply
                                                </button>
                                            </div>

                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>


            </div >
            <LoadingDialog showDialog={loadingDialog} setShowDialog={setLoadingDialog} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { token } = cookies(context)
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
    })
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        })
    const notification = await queryGraph(profileClient, {}, SchemeNotificationSettings)
        .then((res) => {
            return res.notificationSettings
        }).catch((networkErr) => {
            return {};
        })
    return {
        props: { profile, notification, token }
    }
}


