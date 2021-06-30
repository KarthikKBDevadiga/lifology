import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/Navigation.module.css'
import useLocalStorage from './useLocalStorage'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
    XIcon,
} from '@heroicons/react/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const selected = {
    background: '#085CA4',
    color: 'white'
}


const NavigationLayout = ({ index, sidebarOpen, setSidebarOpen }) => {
    const router = useRouter()
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed inset-0 flex z-40 lg:hidden"
                    open={sidebarOpen}
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700"
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 flex items-center px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="/img/logoWhite.png"
                                    alt="Lifology Logo"
                                />
                                <span style={{
                                    alignSelf: 'center', color: 'white',
                                    fontWeight: 'bold',
                                    letterSpacing: '1px',
                                    fontSize: '20px',
                                    paddingLeft: '16px'
                                }}>LIFOLOGY</span>
                            </div>
                            <nav className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar"
                            >
                                <div className="px-2 space-y-1">
                                    <a
                                        href="#"
                                        className={classNames(
                                            index == 1 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                        )}
                                        aria-current={index == 1 ? 'page' : undefined}
                                    >

                                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill={index == 1 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.314a1 1 0 0 1 .38-.785l8-6.311a1 1 0 0 1 1.24 0l8 6.31a1 1 0 0 1 .38.786V20zM7 12a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H7z" />
                                            </g>
                                        </svg>
                                        Home
                                    </a>
                                    <a
                                        href="#"
                                        className={classNames(
                                            index == 2 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                        )}
                                        aria-current={index == 2 ? 'page' : undefined}
                                    >

                                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill={index == 2 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm10 2v5h3V7h-3zm-2 0H9v5h6V7zM7 7H4v5h3V7zm2-4v2h6V3H9z" />
                                            </g>
                                        </svg>
                                        My Child
                                    </a>
                                    <a
                                        href="#"
                                        className={classNames(
                                            index == 3 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                        )}
                                        aria-current={index == 3 ? 'page' : undefined}
                                    >

                                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill={index == 3 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M5.636 12.707l1.828 1.829L8.88 13.12 7.05 11.293l1.414-1.414 1.829 1.828 1.414-1.414L9.88 8.464l1.414-1.414L13.12 8.88l1.415-1.415-1.829-1.828 2.829-2.828a1 1 0 0 1 1.414 0l4.242 4.242a1 1 0 0 1 0 1.414L8.464 21.192a1 1 0 0 1-1.414 0L2.808 16.95a1 1 0 0 1 0-1.414l2.828-2.829zm8.485 5.656l4.243-4.242L21 16.757V21h-4.242l-2.637-2.637zM5.636 9.878L2.807 7.05a1 1 0 0 1 0-1.415l2.829-2.828a1 1 0 0 1 1.414 0L9.88 5.635 5.636 9.878z" />
                                            </g>
                                        </svg>
                                        Services
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => {
                                            router.push({
                                                pathname: '/career_explorer',
                                                query: { token: authToken }
                                            })
                                        }}
                                        className={classNames(
                                            index == 4 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                        )}
                                        aria-current={index == 4 ? 'page' : undefined}
                                    >

                                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill={index == 4 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M21 18H6a1 1 0 0 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16v16zm-5-9V7H8v2h8z" />
                                            </g>
                                        </svg>
                                        Career Explorer
                                    </a>
                                    <a
                                        href="#"
                                        className={classNames(
                                            index == 5 ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                        )}
                                        aria-current={index == 5 ? 'page' : undefined}
                                    >

                                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill={index == 5 ? 'white' : 'black'}>
                                            <g>
                                                <path fill="none" d="M0 0L24 0 24 24 0 24z" />
                                                <path d="M16 16c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zM6 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm8.5-10C17.538 2 20 4.462 20 7.5S17.538 13 14.5 13 9 10.538 9 7.5 11.462 2 14.5 2z" />
                                            </g>
                                        </svg>
                                        Lifology Hub
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="hidden lg:flex lg:flex-shrink-0" style={{ backgroundColor: 'white', boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)' }}>
                <div className="flex flex-col w-64">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4"
                            style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        >
                            <img
                                className="h-8 w-auto"
                                src="/img/logoBlue.png"
                                alt="Lifology Logo"
                            />
                            <span style={{
                                alignSelf: 'center', color: '#085CA4',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                                fontSize: '20px',
                                paddingLeft: '16px'
                            }}>LIFOLOGY</span>
                        </div>
                        <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar" style={{ position: 'relative' }}>
                            <div className="px-4 space-y-1" style={{ marginTop: '16px' }}>
                                <a
                                    href="#"
                                    className={styles.navButton}
                                    style={
                                        index == 1 ? selected : {}
                                    }
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill={index == 1 ? 'white' : '#085CA4'}>
                                        <g>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.314a1 1 0 0 1 .38-.785l8-6.311a1 1 0 0 1 1.24 0l8 6.31a1 1 0 0 1 .38.786V20zM7 12a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H7z" />
                                        </g>
                                    </svg>
                                    Home
                                </a>
                                <a
                                    href="#"
                                    className={styles.navButton}
                                    style={
                                        index == 2 ? selected : {}
                                    }
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill={index == 2 ? 'white' : '#085CA4'}>
                                        <g>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm10 2v5h3V7h-3zm-2 0H9v5h6V7zM7 7H4v5h3V7zm2-4v2h6V3H9z" />
                                        </g>
                                    </svg>
                                    My Child
                                </a>
                                <a
                                    href="#"
                                    className={styles.navButton}
                                    style={
                                        index == 3 ? selected : {}
                                    }
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill={index == 3 ? 'white' : '#085CA4'}>
                                        <g>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M5.636 12.707l1.828 1.829L8.88 13.12 7.05 11.293l1.414-1.414 1.829 1.828 1.414-1.414L9.88 8.464l1.414-1.414L13.12 8.88l1.415-1.415-1.829-1.828 2.829-2.828a1 1 0 0 1 1.414 0l4.242 4.242a1 1 0 0 1 0 1.414L8.464 21.192a1 1 0 0 1-1.414 0L2.808 16.95a1 1 0 0 1 0-1.414l2.828-2.829zm8.485 5.656l4.243-4.242L21 16.757V21h-4.242l-2.637-2.637zM5.636 9.878L2.807 7.05a1 1 0 0 1 0-1.415l2.829-2.828a1 1 0 0 1 1.414 0L9.88 5.635 5.636 9.878z" />
                                        </g>
                                    </svg>
                                    Services
                                </a>
                                <a
                                    href="#"
                                    onClick={() => {
                                        router.push({
                                            pathname: '/career_explorer',
                                            query: { token: authToken }
                                        })
                                    }}
                                    className={styles.navButton}
                                    style={
                                        index == 4 ? selected : {}
                                    }
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill={index == 4 ? 'white' : '#085CA4'}>
                                        <g>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M21 18H6a1 1 0 0 0 0 2h15v2H6a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2h16v16zm-5-9V7H8v2h8z" />
                                        </g>
                                    </svg>
                                    Career Explorer
                                </a>
                                <a
                                    href="#"
                                    className={styles.navButton}
                                    style={
                                        index == 5 ? selected : {}
                                    }
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill={index == 5 ? 'white' : '#085CA4'}>
                                        <g>
                                            <path fill="none" d="M0 0L24 0 24 24 0 24z" />
                                            <path d="M16 16c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zM6 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm8.5-10C17.538 2 20 4.462 20 7.5S17.538 13 14.5 13 9 10.538 9 7.5 11.462 2 14.5 2z" />
                                        </g>
                                    </svg>
                                    Lifology Hub
                                </a>
                            </div>
                            <div className="mt-6 pt-6" style={{ position: 'absolute', bottom: '0px', border: '0px' }}>
                                <div className="px-2 space-y-1" style={{ textAlign: 'center' }}>
                                    <span className="px-2 bg-white text-center text-gray-900 font-bold">Download Our App</span>
                                    <a href="#" >
                                        <img src="../img/play-store.png" style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '16px' }} />
                                    </a>
                                    <a href="#">
                                        <img src="../img/app-store.png" style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', marginTop: '16px' }} />
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavigationLayout
