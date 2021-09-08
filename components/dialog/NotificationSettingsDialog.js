import React from 'react'

import { Fragment, useState } from 'react'
import { Dialog, Transition, Switch } from '@headlessui/react'
import cookies from 'next-cookies'

import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from '/helpers/Constants';
import { mutateGraph } from '../../helpers/GraphQLCaller';
import { SchemeUpdateNotificationSettings } from '../../helpers/GraphQLSchemes';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const NotificationSettingsDialog = ({ showDialog, setShowDialog, notification, token }) => {
    // const [enabled, setEnabled] = useState(false)
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
        console.log('update')
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
                console.log('Response' + res)
                setShowDialog(false)
            }).catch((networkErr) => {
                console.log('error')
                console.log(networkErr)
            })
    }
    return (
        <Transition.Root show={showDialog} as={Fragment}>
            <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={showDialog} onClose={setShowDialog}>
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
                        <div className="group inline-block align-bottom bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-4">
                            <div>
                                <div className="text-lg text-center font-bold">
                                    Notification Settings
                                </div>

                                <div className="h-px w-full bg-lgrey-dark rounded-full mt-4"></div>
                                <div className="mx-4">


                                    <Switch.Group as="div" className="flex items-center justify-between mt-4">
                                        <span className="flex-grow flex flex-col">
                                            <Switch.Label as="span" className="text-base font-medium text-gray-900" passive>
                                                All Notification
                                            </Switch.Label>
                                            {/* <Switch.Description as="span" className="text-sm text-gray-500">
                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                        </Switch.Description> */}
                                        </span>
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
                                    </Switch.Group>
                                    <Switch.Group as="div" className="flex items-center justify-between mt-4">
                                        <span className="flex-grow flex flex-col">
                                            <Switch.Label as="span" className="text-base font-medium text-gray-900" passive>
                                                Assessment Notification
                                            </Switch.Label>
                                            {/* <Switch.Description as="span" className="text-sm text-gray-500">
                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                        </Switch.Description> */}
                                        </span>
                                        <Switch
                                            checked={assessmentNotificationEnable}
                                            onChange={setAssessmentNotificationEnable}
                                            className={classNames(
                                                assessmentNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
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
                                    </Switch.Group>
                                    <Switch.Group as="div" className="flex items-center justify-between mt-4">
                                        <span className="flex-grow flex flex-col">
                                            <Switch.Label as="span" className="text-base font-medium text-gray-900" passive>
                                                Coaching Notification
                                            </Switch.Label>
                                            {/* <Switch.Description as="span" className="text-sm text-gray-500">
                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                        </Switch.Description> */}
                                        </span>
                                        <Switch
                                            checked={coachingNotificationEnable}
                                            onChange={setCoachingNotificationEnable}
                                            className={classNames(
                                                coachingNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
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
                                    </Switch.Group>
                                    <Switch.Group as="div" className="flex items-center justify-between mt-4">
                                        <span className="flex-grow flex flex-col">
                                            <Switch.Label as="span" className="text-base font-medium text-gray-900" passive>
                                                Video Notification
                                            </Switch.Label>
                                            {/* <Switch.Description as="span" className="text-sm text-gray-500">
                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                        </Switch.Description> */}
                                        </span>
                                        <Switch
                                            checked={videoNotificationEnable}
                                            onChange={setVideoNotificationEnable}
                                            className={classNames(
                                                videoNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
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
                                    </Switch.Group>
                                    <Switch.Group as="div" className="flex items-center justify-between mt-4">
                                        <span className="flex-grow flex flex-col">
                                            <Switch.Label as="span" className="text-base font-medium text-gray-900" passive>
                                                Job and Career Notification
                                            </Switch.Label>
                                            {/* <Switch.Description as="span" className="text-sm text-gray-500">
                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                        </Switch.Description> */}
                                        </span>
                                        <Switch
                                            checked={jobNotificationEnable}
                                            onChange={setJobNotificationEnable}
                                            className={classNames(
                                                jobNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
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
                                    </Switch.Group>
                                    <Switch.Group as="div" className="flex items-center justify-between mt-4">
                                        <span className="flex-grow flex flex-col">
                                            <Switch.Label as="span" className="text-base font-medium text-gray-900" passive>
                                                Course And University Notification
                                            </Switch.Label>
                                            {/* <Switch.Description as="span" className="text-sm text-gray-500">
                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                        </Switch.Description> */}
                                        </span>
                                        <Switch
                                            checked={courseNotificationEnable}
                                            onChange={setCourseNotificationEnable}
                                            className={classNames(
                                                courseNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
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
                                    </Switch.Group>
                                    <Switch.Group as="div" className="flex items-center justify-between mt-4">
                                        <span className="flex-grow flex flex-col">
                                            <Switch.Label as="span" className="text-base font-medium text-gray-900" passive>
                                                Life Skill Lesson Notification
                                            </Switch.Label>
                                            {/* <Switch.Description as="span" className="text-sm text-gray-500">
                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                        </Switch.Description> */}
                                        </span>
                                        <Switch
                                            checked={skillNotificationEnable}
                                            onChange={setSkillNotificationEnable}
                                            className={classNames(
                                                skillNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
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
                                    </Switch.Group>
                                    <Switch.Group as="div" className="flex items-center justify-between mt-4">
                                        <span className="flex-grow flex flex-col">
                                            <Switch.Label as="span" className="text-base font-medium text-gray-900" passive>
                                                Article Notification
                                            </Switch.Label>
                                            {/* <Switch.Description as="span" className="text-sm text-gray-500">
                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                        </Switch.Description> */}
                                        </span>
                                        <Switch
                                            checked={articleNotificationEnable}
                                            onChange={setArticleNotificationEnable}
                                            className={classNames(
                                                articleNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
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
                                    </Switch.Group>
                                    <Switch.Group as="div" className="flex items-center justify-between mt-4">
                                        <span className="flex-grow flex flex-col">
                                            <Switch.Label as="span" className="text-base font-medium text-gray-900" passive>
                                                Lifology Hub Notification
                                            </Switch.Label>
                                            {/* <Switch.Description as="span" className="text-sm text-gray-500">
                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                        </Switch.Description> */}
                                        </span>
                                        <Switch
                                            checked={lifologyHubNotificationEnable}
                                            onChange={setLifologyHubNotificationEnable}
                                            className={classNames(
                                                lifologyHubNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
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
                                    </Switch.Group>
                                    <Switch.Group as="div" className="flex items-center justify-between mt-4">
                                        <span className="flex-grow flex flex-col">
                                            <Switch.Label as="span" className="text-base font-medium text-gray-900" passive>
                                                Subscription Notification
                                            </Switch.Label>
                                            {/* <Switch.Description as="span" className="text-sm text-gray-500">
                                            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                        </Switch.Description> */}
                                        </span>
                                        <Switch
                                            checked={subscriptionNotificationEnable}
                                            onChange={setSubscriptionNotificationEnable}
                                            className={classNames(
                                                subscriptionNotificationEnable ? 'bg-indigo-600' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
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
                                    </Switch.Group>

                                </div>
                                <div className="h-px w-full bg-lgrey-dark rounded-full mt-4"></div>
                            </div>
                            <div className="mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={updateNotificationSettings}
                                >
                                    Apply
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => setShowDialog(false)}
                                // ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
NotificationSettingsDialog.getInitialProps = async (ctx) => {
    console.log('data')
    return {}
}

export default NotificationSettingsDialog