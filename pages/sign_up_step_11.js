
import { RadioGroup } from '@headlessui/react'
import { useState } from 'react';
import styles from '../styles/Signup.module.css'
import progressStyles from '../styles/Progress.module.css'
import DownloadLayout from '../components/DownloadLayout';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function SignUpStep2() {

    const login = event => {
        event.preventDefault() // don't redirect the page
        // where we'll add our form logic
        console.log('Login' + event.target.phone.value);
        phoneNumber = event.target.phone.value;
    }
    const steps = [
        { id: 'Step 1', name: 'Parent\'s Detail', href: 'sign_up_step_1', status: 'current' },
        { id: 'Step 2', name: 'Child Detail', href: 'sign_up_step_2', status: 'complete' },
        { id: 'Step 3', name: 'Choose Grade', href: 'sign_up_step_3', status: 'upcoming' },
    ]

    return (
        <div className="min-h-screen bg-white flex font-roboto" >
            <div className="hidden lg:block relative w-0 flex-1 leftloginbg" style={{ background: '#21AAED', overflow: 'hidden' }}>

                <div className="mx-auto w-full" style={{ height: "25%" }}>
                    <div className="mt-1" style={{ width: 'fit-content', marginTop: 32, marginLeft: 'auto', marginRight: 'auto' }}>

                        <img src="img/logo.svg" alt="Lifology" width="200px" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                        {/* <span className=" font-extrabold text-white-900" style={{ margin: 'auto', color: 'white' }}>L I F O L O G Y</span> */}
                    </div>
                    <p className="text-center text-white text-xl" style={{ marginTop: 32 }}>Building the world's best Super Parent Community</p>
                </div>
                <div className="text-center flex-1 flex flex-col " style={{ marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', height: '75%', alignItems: 'center' }}>
                    <img className="absolute glsignimg" src="img/signup-left-view.png" alt="" style={{ height: "70%" }} />
                </div>

            </div>

            <div className="wds42 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">

                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-black text-center">Complete your profile</h2>

                        <nav aria-label="Progress" style={{ marginTop: 32 }}>
                            <ol className="space-y-4 md:flex md:space-y-0 md:space-x-0"
                                style={{
                                    position: 'relative'
                                }}
                            >
                                <li key='1' className="md:flex-1 posrel secstep" className={progressStyles.completed}>
                                    <a
                                        href='#'
                                        className="group pl-4 text-right py-2 flex flex-col border-l-4 border-gray-200 md:pl-0 md:pt-6 md:pb-0 md:border-l-0 md:border-t-4"
                                    >
                                        <span className="text-base font-medium"
                                            style={{ textAlign: 'left' }}>Parent's Detail</span>
                                        <span
                                            style={{
                                                textAlign: 'center',
                                                position: 'absolute',
                                                left: '0',
                                                top: '-15px',
                                                width: '30px',
                                                height: '30px',
                                                color: 'white',
                                                lineHeight: '30px',
                                                borderRadius: '50%',
                                                backgroundColor: '#02C77D',
                                                zIndex: 1
                                            }}
                                        >1</span>
                                    </a>
                                </li>
                                <li key='2' className="md:flex-1 posrel secstep">
                                    <a
                                        href='#'
                                        className="group pl-4 text-right py-2 flex flex-col border-l-4 border-gray-200 md:pl-0 md:pt-6 md:pb-0 md:border-l-0 md:border-t-4"
                                    >
                                        <span className="text-base font-medium"
                                            style={{ textAlign: 'center' }}
                                        >Child Detail</span>
                                        <span class="stepnumcir text-center"
                                            style={{
                                                textAlign: 'center',
                                                position: 'absolute',
                                                transform: 'translateX(-50%)',
                                                left: '50%',
                                                top: '-15px',
                                                width: '30px',
                                                height: '30px',
                                                color: '#02C77D',
                                                lineHeight: '30px',
                                                borderRadius: '50%',
                                                borderColor: '#02C77D',
                                                borderWidth: '2px',
                                                backgroundColor: 'white',
                                                zIndex: 1
                                            }}
                                        >2</span>
                                    </a>
                                </li>
                                <li key='3' className="md:flex-1 posrel secstep" >
                                    <a
                                        href='#'
                                        className="group pl-4 text-right py-2 flex flex-col border-l-4 border-gray-200 md:pl-0 md:pt-6 md:pb-0 md:border-l-0 md:border-t-4"
                                    >
                                        <span className="text-base font-medium"
                                        >Choose Grade</span>
                                        <span class="stepnumcir text-center"
                                            style={{
                                                textAlign: 'center',
                                                position: 'absolute',
                                                right: '0',
                                                top: '-15px',
                                                width: '30px',
                                                height: '30px',
                                                color: '#02C77D',
                                                lineHeight: '30px',
                                                borderRadius: '50%',
                                                borderColor: '#02C77D',
                                                borderWidth: '2px',
                                                backgroundColor: 'white',
                                                zIndex: 1
                                            }}
                                        >3</span>
                                    </a>
                                </li>
                                {/* {steps.map((step) => (
                                    <li key={step.name} className="md:flex-1 posrel secstep">
                                        {step.status === 'complete' ? (
                                            <a
                                                href={step.href}
                                                className="group pl-4 py-2 text-center flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-6 md:pb-0 md:border-l-0 md:border-t-4"
                                                style={{
                                                    borderColor: '#02C77D'
                                                }}
                                            >
                                                <span className="text-base font-medium">{step.name}</span>
                                                <span class="stepnumcir text-center"></span>
                                            </a>
                                        ) : step.status === 'current' ? (
                                            <a
                                                href={step.href}
                                                className="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 text-left md:pl-0 md:pt-6 md:pb-0 md:border-l-0 md:border-t-4"
                                                aria-current="step"
                                                style={{
                                                    borderColor: '#02C77D'
                                                }}
                                            >
                                                <span className="text-base font-medium">{step.name}</span>
                                                <span class="stepnumcir text-center"></span>
                                            </a>
                                        ) : (
                                            
                                        )}
                                    </li>
                                ))} */}
                            </ol>

                        </nav>
                        <div style={{ width: '100%' }}>
                            <ul className={progressStyles.progressbar}>
                                <li className={progressStyles.active}>Step 1</li>
                                <li className={progressStyles.active}>Step 2</li>
                                <li>Step 3</li>
                            </ul>
                        </div>

                    </div>

                    <div className="mt-8">


                        <div className="mt-6">

                            <div>
                                <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ fontSize: 18 }}>2. Child Detail</h2>
                                <p className="mt-2 text-sm text-gray-600 font-roboto" style={{ fontSize: 14 }}>
                                    Please enter the following details
                                </p>
                            </div>

                            <form onSubmit={login} className="space-y-6" style={{ marginTop: 16 }}>
                                <div>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="name"
                                            autoComplete="name"
                                            placeholder="Child Full Name"
                                            required
                                            className="appearance-none block w-full px-4 py-3 rounded-3xl inputbgCol placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="mt-6 text-xl text-gray-900 text-align-center font-roboto" style={{ fontSize: 16 }}>Gender</h2>
                                    <div>
                                        <label for="male" className={styles.radioField}>
                                            <input type="radio" id="male" name="selector" tabindex="1" />
                                            <span>Male</span>
                                        </label>
                                        <label for="female" className={styles.radioField}>
                                            <input type="radio" id="female" name="selector" tabindex="2" />
                                            <span>Female</span>
                                        </label>
                                        <label for="other" className={styles.radioField}>
                                            <input type="radio" id="other" name="selector" tabindex="3" />
                                            <span>Other</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="mt-1 grid grid-cols-2 gap-3" style={{ marginTop: 16 }}>

                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-3xl text-lg font-medium text-white loginbtnbg nextbtn focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-3xl text-lg font-medium text-white loginbtnbg nextbtn focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        </div >
    )
}