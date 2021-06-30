import styles from '../styles/Signup.module.css'
import DownloadLayout from '../components/DownloadLayout';
import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useLocalStorage from '../components/useLocalStorage';
import Step from '../components/Step';

export default function SignUpStep1() {
    const [parentName, setParentName] = useLocalStorage("parentName", "");
    const [parentEmail, setParentEmail] = useLocalStorage("parentEmail", "");
    const router = useRouter()
    const submit = event => {
        event.preventDefault() // don't redirect the page
        // where we'll add our form logic
        // console.log('Login' + event.target.phone.value);
        // phoneNumber = event.target.phone.value;
        setParentName(event.target.name.value);
        setParentEmail(event.target.email.value);

        router.push({
            pathname: 'sign_up_step_2',
        });

    }
    const steps = [
        { id: 'Step 1', name: 'Parent\'s Detail', href: 'sign_up_step_1', status: 'current' },
        { id: 'Step 2', name: 'Child Detail', href: 'sign_up_step_2', status: 'upcoming' },
        { id: 'Step 3', name: 'Choose Grade', href: 'sign_up_step_3', status: 'upcoming' },
    ]

    return (
        <div className="min-h-screen bg-white flex font-roboto" >
            <div className="hidden lg:block relative w-0 flex-1 leftloginbg" style={{ background: '#21AAED', overflow: 'hidden' }}>

                <div className="mx-auto w-full" style={{ height: "25%" }}>
                    <div className="mt-1" style={{ width: 'fit-content', marginTop: 32, marginLeft: 'auto', marginRight: 'auto', display: 'flex' }}>
                        <img src="img/logoWhite.png" alt="Lifology" width="48px" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                        <span style={{
                            alignSelf: 'center', color: 'white',
                            fontWeight: 'bold',
                            letterSpacing: '4px',
                            fontSize: '20px',
                            paddingLeft: '16px'
                        }}>LIFOLOGY</span>
                    </div>
                    <p className="text-center text-white text-xl" style={{ marginTop: 32 }}>Building the world's best Super Parent Community</p>
                </div>
                <div className="text-center flex-1 flex flex-col " style={{ marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', height: '75%', alignItems: 'center' }}>
                    <img className="absolute glsignimg" src="img/signup-left-view.png" alt="" style={{ height: "70%" }} />
                </div>

            </div>

            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">

                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ textAlign: 'center' }}>Complete your profile</h2>

                        <Step index="1" />
                    </div>

                    <div className="mt-8">


                        <div className="mt-6">

                            <div>
                                <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ fontSize: 18 }}>1. Parent's Detail</h2>
                                <p className="mt-2 text-sm text-gray-600 font-roboto" style={{ fontSize: 14 }}>
                                    Please enter the following details
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6" style={{ marginTop: 16 }}>
                                <div>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="name"
                                            autoComplete="name"
                                            placeholder="Your Full Name"
                                            required
                                            className={styles.inputField}
                                        />
                                    </div>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="Email address"
                                            required
                                            className={styles.inputField}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        style={{
                                            borderRadius: 60
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <DownloadLayout />

            </div>
        </div>
    )
}