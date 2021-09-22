import React, { useRef } from 'react'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ProgressBar from '../ProgressBar'
import ShareList from '../share/ShareList'

const ShareDialog = ({ url, title, showDialog, setShowDialog }) => {
    const textAreaRef = useRef(null)

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
                        <div className="group inline-block align-bottom bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-4 outline-none">
                            <div>
                                <div className="text-lg font-medium mb-2">
                                    Share
                                </div>
                                {
                                    url ? <></> :
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                            {/* <Step /> */}
                                            <ProgressBar />
                                        </div>
                                }
                                <ShareList url={url} title={title} />
                                <div className="mt-1 px-4 py-2 relative rounded-full shadow-sm bg-gray-100 border border-gray-200">
                                    <input
                                        ref={textAreaRef}
                                        id="url"
                                        readOnly={true}
                                        name="url"
                                        type="url"
                                        defaultValue={url}
                                        className="bg-transparent outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300"
                                    />
                                    <div className="hover:bg-gray-200 rounded-r-full absolute inset-y-0 right-0 pl-3 pr-3 flex items-center cursor-pointer text-lblue font-bold duration-500"
                                        onClick={
                                            () => {
                                                //    setShowDialog(false)
                                                textAreaRef.current.select()
                                                document.execCommand('copy')
                                            }
                                        }>
                                        COPY
                                    </div>
                                </div>
                            </div>

                            <div className="absolute w-8 h-8 top-0 right-0">
                                <button
                                    type="button"
                                    className="w-full h-full focus:outline-none"
                                    onClick={() => setShowDialog(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

    )
}

export default ShareDialog