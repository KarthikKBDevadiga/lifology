import React from 'react'
import styles from '../../styles/Signup.module.css'

const SignUpTab1 = () => {
    return (
        <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
                <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ textAlign: 'center' }}>Complete your profile</h2>
                <nav aria-label="Progress" style={{ marginTop: 32 }}>
                    <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                        <li key="1" className="md:flex-1">
                            <a
                                href="#"
                                className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                                <span className="text-sm font-medium">Parent's Detail</span>
                            </a>
                        </li>
                        <li key="2" className="md:flex-1">
                            <a
                                href="#"
                                className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                                <span className="text-sm font-medium">Child Detail</span>
                            </a>
                        </li>
                        <li key="3" className="md:flex-1">
                            <a
                                href="#"
                                className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                                <span className="text-sm font-medium">Choose Grade</span>
                            </a>
                        </li>

                    </ol>
                </nav>
            </div>

            <div className="mt-8">

                <div className="mt-6">

                    <div>
                        <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ fontSize: 18 }}>1. Parent's Detail</h2>
                        <p className="mt-2 text-sm text-gray-600 font-roboto" style={{ fontSize: 14 }}>
                            Please enter the following details
                        </p>
                    </div>

                    <form onSubmit={() => { }} className="space-y-6" style={{ marginTop: 16 }}>
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
    )
}

export default SignUpTab1
