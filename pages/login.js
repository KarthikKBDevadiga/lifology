import { ApolloClient, InMemoryCache } from "@apollo/client"
import Constants from '../helpers/Constants'
import { SchemeCheckSocial, SchemeMyLifologyCareerPools, SchemeSendOTP, SchemeVerifyOTP } from '../helpers/GraphQLSchemes'
import { queryGraph, mutateGraph } from '../helpers/GraphQLCaller'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import PhoneNumberTab from '../components/login/PhoneNumberTab'
import OTPVerifyTab from '../components/login/OTPVerifyTab'
import DownloadLayout from '../components/DownloadLayout'
import useLocalStorage from '../helpers/useLocalStorage'
import MetaLayout from '../components/MetaLayout'
import LoadingDialog from '../components/dialog/LoadingDialog'
import NextNprogress from 'nextjs-progressbar';
import localforage from "localforage"
import { signIn, signOut, useSession } from "next-auth/client";
import ErrorDialog from "../components/dialog/ErrorDialog"
import { route } from "next/dist/server/router"

import login from './assets/login.json';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const client = new ApolloClient({
    uri: Constants.baseUrl + "/api/auth",
    cache: new InMemoryCache(),
});

const languages = [
    {
        id: 'English',
        title: 'English',
        locale: 'en-US'
    },
    {
        id: 'Hindi',
        title: 'हिन्दी',
        locale: 'hi'
    },
    {
        id: 'Tamil',
        title: 'தமிழ்',
        locale: 'ta'
    },
    {
        id: 'Telgu',
        title: 'తెలుగు',
        locale: 'te'
    },
    {
        id: 'Gujrathi',
        title: 'ગુજરાતી',
        locale: 'gu'
    },
    {
        id: 'Bengali',
        title: 'বাংলা',
        locale: 'ben'
    },
]

export default function Login({ cs }) {

    const [parentName, setParentName] = useLocalStorage("parentName", "")
    const [parentEmail, setParentEmail] = useLocalStorage("parentEmail", "")

    const { push, query, locale, locales, asPath } = useRouter()
    // const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [successDialog, setSuccessDialog] = useState(false)
    const [languageDialog, setLanguageDialog] = useState(false)
    // const [exampleDialog, setExampleDialog] = useState(true)
    const [successDialogString, setSuccessDialogString] = useState('Login Successful')
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogString, setErrorDialogString] = useState('Login Failed')
    const [signupDialog, setSignupDialog] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState(languages.find(l => l.locale == locale));
    const [error, setError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [tab, setTab] = useState(1)

    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const [mobile, setMobile] = useLocalStorage("mobile", "");

    const [timeLeft, setTimeLeft] = useState(0);

    const [selectedCountry, setSelectedCountry] = useState(cs[0])

    // login.filter(l => l.locale == locale)[0]
    const data = login.filter(l => l.locale == locale)[0]
    useEffect(async () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        const data = await fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => (data))
        const sel = cs.find(cs => cs.callingCodes == data.country_calling_code.replace("+", ""));
        setSelectedCountry(sel)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (tab == 1) {
                // setTimeLeft(0);
            } else
                if (timeLeft > 0)
                    setTimeLeft(timeLeft - 1);
        }, 1000);
    });

    const sendOTP = event => {
        event.preventDefault()
        var regex = /^[0]?[6789]\d{9}$/
        if (!regex.test(event.target.phone.value)) {
            setError('Invalid Phone Number')
            return false
        }
        // setTimeLeft(0)
        setPhoneNumber(event.target.phone.value)
        setLoadingDialog(true)
        mutateGraph(client, { country_code: ('91'), mobile_number: event.target.phone.value }, SchemeSendOTP)
            .then((res) => {
                if (res.sendOtp) {
                    setLoadingDialog(false)
                    setTab(2)
                    setTimeLeft(15)
                }
            }).catch((networkErr) => {
                setLoadingDialog(false)
                console.log(networkErr)
            });
    }

    const resendOTP = event => {
        event.preventDefault()
        setLoadingDialog(true)
        mutateGraph(client, { country_code: ('91'), mobile_number: phoneNumber }, SchemeSendOTP)
            .then((res) => {
                if (res.sendOtp) {
                    setLoadingDialog(false)
                    // setTab(2)
                    setTimeLeft(15)
                    setSuccessDialogString('OTP Sent Successful')
                    setSuccessDialog(true)
                }
            }).catch((networkErr) => {
                setLoadingDialog(false)
                console.log(networkErr)
            });
    }

    const verifyOTP = event => {
        event.preventDefault()
        const otp = event.target.one.value + event.target.two.value
            + event.target.three.value + event.target.four.value
            + event.target.five.value + event.target.six.value
        console.log({ country_code: ('91'), mobile_number: phoneNumber, otp: otp })
        setLoadingDialog(true)
        queryGraph(client, { country_code: ('91'), mobile_number: phoneNumber, otp: otp }, SchemeVerifyOTP)
            .then((res) => {
                console.log(res.otpVerification)
                setLoadingDialog(false)
                if (res.otpVerification.is_user_exist) {
                    setSuccessDialogString('Login Successful')
                    setSuccessDialog(true)
                    setTimeout(() => {
                        setSuccessDialog(false)
                        localforage.setItem('token', res.otpVerification.auth_token)
                        document.cookie = 'token=' + res.otpVerification.auth_token + ';expires=3600;'
                        push({
                            pathname: query?.redirect ? query?.redirect : '/',
                        })
                    }, 1000)
                    setAuthToken(res.otpVerification.auth_token);
                } else {
                    setSignupDialog(true)
                }
            }).catch((networkErr) => {
                setLoadingDialog(false)
                setErrorDialog(true)
                setErrorDialogString(networkErr)
                console.log(networkErr)
            });
    }

    const socialLogin = (social_id, email, name) => {
        queryGraph(client, { social_id: social_id, email: email, }, SchemeCheckSocial)
            .then((res) => {
                console.log(res.checkSocial)
                if (res.checkSocial.is_user_exist) {
                    setSuccessDialogString('Login Successful')
                    setSuccessDialog(true)
                    setTimeout(() => {
                        setSuccessDialog(false)
                        localforage.setItem('token', res.checkSocial.auth_token)
                        document.cookie = 'token=' + res.checkSocial.auth_token + ';expires=3600;'
                        push({
                            pathname: router?.query?.redirect ? router?.query?.redirect : '/',
                        })
                    }, 1000)
                    setAuthToken(res.checkSocial.auth_token)
                } else {
                    setParentName(name);
                    setParentEmail(email);
                    push({
                        pathname: 'sign_up_step_2',
                    })
                    // signOut()
                }
            }).catch((networkErr) => {
                console.log(networkErr)
            })
    }

    return (

        <>
            <MetaLayout title="Login" description="Login" />
            <div className="min-h-screen bg-white flex font-roboto" >
                <div className="hidden lg:block relative w-0 flex-1 leftloginbg overflow-hidden" style={{ background: '#21AAED' }}>

                    <div className="mx-auto w-full h-1/4" >
                        <div className="mt-8 ml-auto mr-auto w-min flex">
                            <img src="img/logoWhite.png" alt="Lifology" width="48px" className="ml-auto mr-auto" />
                            <span className="self-center text-white font-bold pl-4 text-xl tracking-widest">LIFOLOGY</span>
                        </div>
                        <p className="text-center text-white text-xl mt-8">
                            {
                                data.heading
                            }
                        </p>
                    </div>
                    <div className="text-center flex-1 flex flex-col mt-auto ml-auto mr-auto h-3/4 items-center" >
                        {
                            tab === 1 ?
                                <img className="absolute glsignimg h-3/4" src="img/login-left-view.png" alt="" /> :
                                <img className="absolute glsignimg h-3/4" src="img/otp-left-view.png" alt="" />
                        }
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-screen">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div
                            onClick={() => {
                                setLanguageDialog(true)
                            }}
                            className="ml-auto flex px-4 py-2 bg-lgrey-bg w-min rounded-full border border-lgrey-border cursor-pointer hover:bg-lgrey-border duration-500">
                            <svg className="text-lblue-light mr-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#085ca4"><path d="M0 0h24v24H0z" fill="none" /><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" /></svg>
                            {selectedLanguage ? selectedLanguage.title : 'English'}
                            <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></svg>
                        </div>
                        <div>
                            <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center text-center">{tab === 1 ? data.lets_get_started : data.verify_your_mobile}</h2>
                            <p className="mt-2 text-xs text-gray-600 text-center">
                                {tab === 1 ? <span>{data.worlds_leading_career}</span> : timeLeft == 0 ? <span></span> : <span>We have sent a 6-digit OTP to +91 {phoneNumber}. Enter it below.</span>}
                            </p>
                        </div>
                        <div className="mt-8">
                            {
                                tab === 1 ?
                                    <PhoneNumberTab locale={data} submit={sendOTP} error={error} setError={(error) => {
                                        setError(error)
                                    }} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} countries={cs} socialLogin={socialLogin} /> :
                                    <OTPVerifyTab locale={data} verifyOTP={verifyOTP} resendOTP={resendOTP} timeLeft={timeLeft} selectTab={
                                        () => {
                                            setTimeLeft(0)
                                            setTab(1)
                                        }} loading={loadingDialog} />
                            }
                        </div>
                    </div>

                    <DownloadLayout locale={data} />

                </div>
            </div>

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
                                            {successDialogString}
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
                                            {errorDialogString}
                                        </Dialog.Title>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="rounded-full inline-flex justify-center w-full border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                        onClick={() => {
                                            setErrorDialog(false)
                                            setTimeLeft(0)
                                            setTab(1)
                                        }}
                                    >
                                        Go To Login
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={signupDialog} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    open={signupDialog}
                    onClose={setSignupDialog}
                >
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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Login Failed
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Phone Number Does Not Exists
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="button"
                                        className="rounded-full w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                                        onClick={() => {
                                            setSignupDialog(false)
                                            setMobile(phoneNumber)
                                            push({
                                                pathname: 'sign_up_step_1',
                                            })
                                        }}
                                    >
                                        Signup
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-full mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => {
                                            setSignupDialog(false)
                                            setTab(1)
                                            setTimeLeft(0)
                                        }}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={languageDialog} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setLanguageDialog}>
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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        <div className="text-lg leading-6 font-medium text-gray-900 flex">

                                            <div className="bg-gray-100 mr-2 p-2 rounded-full">
                                                <svg className="text-lblue-light " xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#085ca4"><path d="M0 0h24v24H0z" fill="none" /><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" /></svg>
                                            </div>
                                            <div className="self-center">
                                                Select your language
                                            </div>

                                        </div>
                                        <div className="mt-4">
                                            <ul role="list" className="mt-3 grid grid-cols-1 gap-2 sm:gap-2 sm:grid-cols-4 lg:grid-cols-6">
                                                {languages.map((language) => (
                                                    <li key={language.id} className="col-span-1 flex shadow-sm rounded-md">
                                                        <div
                                                            onClick={
                                                                () => {
                                                                    setSelectedLanguage(language)
                                                                    console.log(selectedLanguage)
                                                                }
                                                            }
                                                            className={
                                                                classNames(
                                                                    (selectedLanguage != null && selectedLanguage.id == language.id) ? 'bg-lblue text-white' : 'bg-gray-300 text-black',
                                                                    'cursor-pointer flex-shrink-0 flex items-center justify-center w-full h-18 text-sm font-medium rounded-lg px-6 py-6 hover:bg-lblue hover:text-white duration-500')
                                                            }
                                                        >
                                                            {language.title}
                                                        </div>

                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-8 sm:flex">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-full border border-lblue shadow-sm px-4 py-2  text-base font-medium text-lblue hover:bg-lblue hover:text-white duration-500 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            setLanguageDialog(false)
                                            push(asPath, asPath, { locale: selectedLanguage.locale })
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>


            {/* <ErrorDialog showDialog={exampleDialog} setShowDialog={setExampleDialog} title="Title" description="Description" /> */}
        </>
    )
}
export async function getServerSideProps(context) {
    const cs = await fetch(Constants.WEB_URL + '/api/countries')
        .then(response => response.json())
        .then(data => (data))
    return {
        props: { cs }
    }
}