import { useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import styles from '../styles/Profile.module.css'
import { mutateGraph, queryGraph } from '../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeEditProfile, SchemeGetProfile } from '../helpers/GraphQLSchemes'
import Constants from '../helpers/Constants.js'
import useLocalStorage from '../components/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../components/NavigationLayout'
import HeaderLayout from '../components/HeaderLayout'
import ProgressBar from '../components/ProgressBar'
import { Fragment } from 'react'

export default function Profiles({ profile }) {
    const router = useRouter()
    const [loadingDialog, setLoadingDialog] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    const submit = async (event) => {
        event.preventDefault()
        var formData = new FormData()
        formData.append('file', event.target.file.files[0])

        setLoadingDialog(true)
        var profilePic = "";
        await fetch(Constants.baseUrl + '/api/fileUploading', {
            method: 'POST',
            body: formData,
            headers: new Headers({
                'Authorization': 'Bearer ' + authToken,
                'Accept': 'application/json'
            })
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            profilePic = data.url
        }).catch(function (error) {
            console.log('error');
        })
        console.log('ProfilePic ' + profilePic)
        console.log('Name ' + event.target.name.value)
        console.log('Email ' + event.target.email.value)
        const client = new ApolloClient({
            uri: Constants.baseUrl + "/api/user",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + authToken,
            },
        });
        await mutateGraph(client,
            {
                name: event.target.name.value,
                email: event.target.email.value
            }, SchemeEditProfile)
            .then((res) => {
                console.log(res)
            }).catch((networkErr) => {

                console.log('error')
            });
        setLoadingDialog(false)
    }
    return (
        <>
            <div className="h-screen flex overflow-hidden bg-gray-100">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >

                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Profile / Edit Profile" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="mt-8" style={{ margin: '16px' }}>

                            <div className="max-w-6xl mx-auto shadow"
                                style={{ padding: '16px', background: 'white', height: '100%' }}>
                                <form onSubmit={submit}>
                                    <div className="flex flex-col mt-2">
                                        <div className="align-middle min-w-full overflow-x-auto  overflow-hidden sm:rounded-lg"
                                            style={{ padding: '16px', background: 'white' }}>

                                            <div className="mt-2">
                                                <div className="sm:flex" style={{ height: '100%' }}>
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8  " >
                                                        <div style={{ position: 'relative', width: '140px', height: '140px' }}>
                                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', height: '100%' }}>
                                                                <img src="../img/upload.svg" alt="" style={{ width: '100%', height: '100%' }} />
                                                            </div>
                                                            <input id="file" name="file" type="file" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0 }} />
                                                        </div>
                                                        <div style={{ padding: '20px 0px', fontSize: '17px' }}>Upload New Photo</div>
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <div style={{ paddingTop: '10px', float: 'right', width: '100%' }}>
                                                            <div style={{ paddingBottom: '20px' }}>
                                                                <label style={{ fontSize: '18px', paddingBottom: '10px', color: '#000', display: 'block' }}>Full Name</label>
                                                                <input id="name" name="name" type="text" placeholder="Juliana Dsoza"
                                                                    className={styles.inputField} defaultValue={profile.name} />
                                                            </div>
                                                            <div style={{ paddingBottom: '20px' }}>

                                                                <label style={{ fontSize: '18px', paddingBottom: '10px', color: '#000', display: 'block' }}>Phone Number</label>
                                                                <div style={{ position: 'relative' }}>
                                                                    <div className="absolute inset-y-0 left-0 pl-3 pr-3 flex items-center pointer-events-none"
                                                                        style={{
                                                                            backgroundColor: '#F2F2F2',
                                                                            borderTopLeftRadius: 60,
                                                                            borderBottomLeftRadius: 60,
                                                                            margin: 1,
                                                                        }}
                                                                    >
                                                                        <span className="text-gray-500 sm:text-sm">+91</span>
                                                                    </div>
                                                                    <input type="text" placeholder="9999999999"
                                                                        maxLength="10"
                                                                        className={styles.inputField}
                                                                        style={{ paddingLeft: '3.75rem' }} defaultValue={profile.mobile_number} />
                                                                    <div className="absolute inset-y-0 right-0 pl-3 pr-3 flex items-center pointer-events-none"
                                                                        style={{
                                                                            // backgroundColor: '#F2F2F2',
                                                                            // borderTopLeftRadius: 60,
                                                                            // borderBottomLeftRadius: 60,
                                                                            margin: 1,
                                                                        }}
                                                                    >
                                                                        <svg
                                                                            viewBox="0 0 32 32"
                                                                            width="16" height="16"
                                                                            style={{
                                                                                display: 'initial',
                                                                                verticalAlign: 'text-bottom',
                                                                                marginRight: '8px'
                                                                            }}
                                                                        >
                                                                            <path
                                                                                id="path"
                                                                                d="M 16 0 C 11.758 0 7.686 1.687 4.686 4.686 C 1.687 7.686 0 11.758 0 16 C 0 20.242 1.687 24.314 4.686 27.314 C 7.686 30.313 11.758 32 16 32 C 20.242 32 24.314 30.313 27.314 27.314 C 30.313 24.314 32 20.242 32 16 C 32 11.758 30.313 7.686 27.314 4.686 C 24.314 1.687 20.242 0 16 0 Z"
                                                                                fill="#02c77d"
                                                                                strokeWidth="1" />
                                                                            <path
                                                                                id="path_1"
                                                                                d="M 14.046 18.686 L 21.805 10.926 L 22.999 12.12 L 14.046 21.073 L 8.674 15.701 L 9.868 14.508 Z"
                                                                                fill="#ffffff"
                                                                                strokeWidth="1" />
                                                                        </svg>
                                                                        <span style={{ display: 'inline-block', alignSelf: 'center', fontSize: '14px' }}>Verified</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{ paddingBottom: '20px' }}>
                                                                <label style={{ fontSize: '18px', paddingBottom: '10px', color: '#000', display: 'block' }}>Email</label>
                                                                <input id="email" name="email" type="email" placeholder="something@lifology.com"
                                                                    className={styles.inputField} defaultValue={profile.email} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense" style={{ width: 'fit-content' }}>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                                                    style={{ borderRadius: 60, width: 'fit-content', backgroundColor: '#085CA4' }}
                                                >
                                                    Save Profile
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                                    style={{ borderRadius: 60, width: 'fit-content', marginLeft: 'auto', color: '#085CA4', borderColor: '#085CA4' }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <footer style={{ boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)', padding: '16px' }}>
                            <div style={{ textAlign: 'center', fontWeight: '500' }}>Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
                    </main>
                </div>


            </div >

            <Transition.Root show={loadingDialog} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={loadingDialog} onClose={setLoadingDialog}>
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
                            <div
                                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                                style={{ width: 'fit-content' }}
                            >

                                <div className="sm:flex sm:items-start" style={{ margin: '16px' }}>

                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        {/* <Step /> */}
                                        <ProgressBar />
                                    </div>
                                    <button className="h-0 w-0 overflow-hidden" />

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
    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const profile = await queryGraph(client, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        });
    return {
        props: { profile }
    }
}