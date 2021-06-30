import React from 'react'
import { XCircleIcon, XIcon } from '@heroicons/react/solid'
import styles from '../../styles/Login.module.css'

const PhoneNumberTab = ({ submit, error, setError }) => {
    return (
        <div className="mt-6">
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <div className="mt-1 relative rounded-md shadow-sm">
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
                        <input
                            className={styles.inputField}
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            maxLength="10"
                            placeholder="9999999999"
                            className={styles.inputField}
                            style={{ paddingLeft: '3.75rem', marginTop: 0 }}
                            onKeyPress={() => {
                                setError('')
                                // clearError()
                            }}
                        />
                    </div>
                </div>
                {
                    error.length == 0 ? <></> :
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">Invalid Phone number</p>
                                </div>
                                <div className="ml-auto pl-3">
                                    <div className="-mx-1.5 -my-1.5">
                                        <button
                                            type="button"
                                            className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                                            onClick={() => { setError('') }}
                                        >
                                            <span className="sr-only">Dismiss</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                }


                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        style={{
                            borderRadius: 60
                        }}
                    >
                        Login with OTP
                    </button>
                </div>

                <div className="flex items-center">

                    <div className="text-sm" style={{ margin: 'auto' }}>
                        By accepting all <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            terms
                        </a> and <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            conditions
                        </a>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default PhoneNumberTab
