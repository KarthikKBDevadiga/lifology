import React from 'react'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ProgressBar from '../ProgressBar'
import { ExclamationIcon } from '@heroicons/react/outline'

const ErrorDialog = ({ showDialog, setShowDialog, title, description }) => {
    return (
        <Transition.Root show={showDialog} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setShowDialog}>
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
                        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                            <div className="sm:items-center p-4">
                                {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div> */}
                                <div>
                                    <div className=" bg-green-100 rounded-full w-max m-auto">
                                        <svg className="w-28 h-28 text-green-400" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                                            {/* <path d="M0 0h24v24H0V0z" fill="none" />
                                            <path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z" /> */}
                                            {/* <path
                                                id="path"
                                                d="M 15.5 8 C 15.102 8 14.721 8.158 14.439 8.439 C 14.158 8.721 14 9.102 14 9.5 C 14 9.898 14.158 10.279 14.439 10.561 C 14.721 10.842 15.102 11 15.5 11 C 15.898 11 16.279 10.842 16.561 10.561 C 16.842 10.279 17 9.898 17 9.5 C 17 9.102 16.842 8.721 16.561 8.439 C 16.279 8.158 15.898 8 15.5 8 Z M 8.5 8 C 8.102 8 7.721 8.158 7.439 8.439 C 7.158 8.721 7 9.102 7 9.5 C 7 9.898 7.158 10.279 7.439 10.561 C 7.721 10.842 8.102 11 8.5 11 C 8.898 11 9.279 10.842 9.561 10.561 C 9.842 10.279 10 9.898 10 9.5 C 10 9.102 9.842 8.721 9.561 8.439 C 9.279 8.158 8.898 8 8.5 8 Z"
                                                strokeWidth="1" /> */}
                                            <path
                                                id="path_1"
                                                d="M 16.41 13.89 C 16.06 13.67 15.59 13.78 15.38 14.13 C 14.64 15.3 13.38 16 12 16 C 10.62 16 9.36 15.3 8.62 14.12 C 8.4 13.77 7.94 13.66 7.59 13.88 C 7.24 14.1 7.13 14.56 7.35 14.91 C 8.37 16.54 10.1 17.5 12 17.5 C 13.9 17.5 15.63 16.53 16.65 14.92 C 16.87 14.57 16.76 14.11 16.41 13.89 Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-4 text-center sm:text-center">
                                    <div className="text-2xl leading-6 font-medium text-gray-900">
                                        Login Success
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute w-6 h-6 top-0 right-0 m-2">
                                <button
                                    type="button"
                                    className="shadow hover:shadow-xl active:shadow-sm bg-gray-400 rounded-full w-full h-full focus:outline-none duration-500 text-white bg-opacity-50 hover:bg-opacity-100"
                                    onClick={() => setShowDialog(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-5 sm:mt-4">
                                <div className="text-center p-4 bg-green-400 text-lg font-medium text-white cursor-pointer bg-opacity-50 hover:bg-opacity-100 duration-500">
                                    CLOSE
                                </div>
                                {/* <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => setShowDialog(false)}
                                >
                                    Close
                                </button> */}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ErrorDialog
