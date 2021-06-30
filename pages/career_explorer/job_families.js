import { Fragment, useState, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    BellIcon,
    ClockIcon,
    CogIcon,
    CreditCardIcon,
    DocumentReportIcon,
    HomeIcon,
    MenuAlt1Icon,
    QuestionMarkCircleIcon,
    ScaleIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    XIcon,
} from '@heroicons/react/outline'
import {
    CashIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    OfficeBuildingIcon,
    SearchIcon,
} from '@heroicons/react/solid'
import styles from '../../styles/Ce.module.css'
import { queryGraph } from '../../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades } from '../../helpers/GraphQLSchemes'
import Constants from '../../helpers/Constants.js'
import useLocalStorage from '../../components/useLocalStorage'

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: true },
    { name: 'My Child', href: '#', icon: ClockIcon, current: false },
    { name: 'Services', href: '#', icon: ScaleIcon, current: false },
    { name: 'Career Explorer', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Lifology Hub', href: '#', icon: UserGroupIcon, current: false },
]
const cards = [
    { name: 'Job Families & Career Fields', href: 'career_explorer/job_families', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Course and University', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Scholarship Program', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Magazine', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Career Videos', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    // More items...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function JobFamilies({ families }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    return (
        <>
            <div className="h-screen flex overflow-hidden bg-gray-100">
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
                                        src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                                        alt="Easywire logo"
                                    />
                                </div>
                                <nav className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar"
                                >
                                    <div className="px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >

                                                <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:flex lg:flex-shrink-0" style={{ backgroundColor: 'white', boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)' }}>
                    <div className="flex flex-col w-64">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4"
                                style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            >
                                <img
                                    className="h-8 w-auto"
                                    src="../img/logoBlue.png"
                                    alt="Easywire logo"
                                />
                                <span style={{
                                    alignSelf: 'center', color: '#085CA4',
                                    fontWeight: 'bold',
                                    letterSpacing: '4px',
                                    fontSize: '20px',
                                    paddingLeft: '16px'
                                }}>LIFOLOGY</span>
                            </div>
                            <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                                <div className="px-4 space-y-1" style={{ marginTop: '16px' }}>
                                    <a
                                        href="#"
                                        className={styles.navButton}
                                    >
                                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#085CA4">
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
                                    >
                                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#085CA4">
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
                                    >
                                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#085CA4">
                                            <g>
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M5.636 12.707l1.828 1.829L8.88 13.12 7.05 11.293l1.414-1.414 1.829 1.828 1.414-1.414L9.88 8.464l1.414-1.414L13.12 8.88l1.415-1.415-1.829-1.828 2.829-2.828a1 1 0 0 1 1.414 0l4.242 4.242a1 1 0 0 1 0 1.414L8.464 21.192a1 1 0 0 1-1.414 0L2.808 16.95a1 1 0 0 1 0-1.414l2.828-2.829zm8.485 5.656l4.243-4.242L21 16.757V21h-4.242l-2.637-2.637zM5.636 9.878L2.807 7.05a1 1 0 0 1 0-1.415l2.829-2.828a1 1 0 0 1 1.414 0L9.88 5.635 5.636 9.878z" />
                                            </g>
                                        </svg>
                                        Services
                                    </a>
                                    <a
                                        href="#"
                                        style={{
                                            background: '#085CA4',
                                            color: 'white'
                                        }}
                                        className={styles.navButton}
                                    >
                                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="white">
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
                                    >
                                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#085CA4">
                                            <g>
                                                <path fill="none" d="M0 0L24 0 24 24 0 24z" />
                                                <path d="M16 16c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zM6 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm8.5-10C17.538 2 20 4.462 20 7.5S17.538 13 14.5 13 9 10.538 9 7.5 11.462 2 14.5 2z" />
                                            </g>
                                        </svg>
                                        Lifology Hub
                                    </a>
                                </div>
                                <div className="mt-6 pt-6">
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

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none" style={{ boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)' }}>
                        <button
                            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        {/* Search bar */}
                        <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                            <div className="flex-1 flex">
                                {/* <form className="w-full flex md:ml-0" action="#" method="GET">
                                    <label htmlFor="search_field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search_field"
                                            name="search_field"
                                            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                                            placeholder="Search transactions"
                                            type="search"
                                        />
                                    </div>
                                </form> */}
                            </div>
                            <div className="ml-4 flex items-center md:ml-6">
                                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500" style={{ marginRight: '8px' }}>
                                    <span className="sr-only">Search</span>
                                    <SearchIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    {({ open }) => (
                                        <>
                                            <div>
                                                <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                        alt=""
                                                    />
                                                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                                        <span className="sr-only">Open user menu for </span>Emilia Birch
                                                    </span>
                                                    <ChevronDownIcon
                                                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                                                        aria-hidden="true"
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    static
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                                style={{ display: 'flex' }}
                                                            >
                                                                {/* <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#085CA4">
                                                                    <g>
                                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                                        <path d="M5.636 12.707l1.828 1.829L8.88 13.12 7.05 11.293l1.414-1.414 1.829 1.828 1.414-1.414L9.88 8.464l1.414-1.414L13.12 8.88l1.415-1.415-1.829-1.828 2.829-2.828a1 1 0 0 1 1.414 0l4.242 4.242a1 1 0 0 1 0 1.414L8.464 21.192a1 1 0 0 1-1.414 0L2.808 16.95a1 1 0 0 1 0-1.414l2.828-2.829zm8.485 5.656l4.243-4.242L21 16.757V21h-4.242l-2.637-2.637zM5.636 9.878L2.807 7.05a1 1 0 0 1 0-1.415l2.829-2.828a1 1 0 0 1 1.414 0L9.88 5.635 5.636 9.878z" />
                                                                    </g>
                                                                </svg> */}
                                                                <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#085CA4">
                                                                    <g>
                                                                        <path
                                                                            id="path"
                                                                            d="M 12 22 C 9.349 22 6.804 20.946 4.929 19.071 C 3.054 17.196 2 14.651 2 12 C 2 9.349 3.054 6.804 4.929 4.929 C 6.804 3.054 9.349 2 12 2 C 14.651 2 17.196 3.054 19.071 4.929 C 20.946 6.804 22 9.349 22 12 C 22 13.755 21.538 15.48 20.66 17 C 19.783 18.52 18.52 19.783 17 20.66 C 15.48 21.538 13.755 22 12 22 Z M 7 12 C 7 13.326 7.527 14.598 8.464 15.536 C 9.402 16.473 10.674 17 12 17 C 13.326 17 14.598 16.473 15.536 15.536 C 16.473 14.598 17 13.326 17 12 L 15 12 C 15 12.795 14.684 13.559 14.121 14.121 C 13.559 14.684 12.795 15 12 15 C 11.205 15 10.441 14.684 9.879 14.121 C 9.316 13.559 9 12.795 9 12 Z"
                                                                            stroke-width="1" />
                                                                    </g>
                                                                </svg>

                                                                Profile
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                                style={{ display: 'flex' }}
                                                            >
                                                                <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#085CA4">
                                                                    <g>
                                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                                        <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z" />
                                                                    </g>
                                                                </svg>
                                                                Bookmarks
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                                style={{ display: 'flex' }}
                                                            >
                                                                <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#085CA4">
                                                                    <g>
                                                                        <path fill="none" d="M0 0H24V24H0z" />
                                                                        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12h2c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8C9.536 4 7.332 5.114 5.865 6.865L8 9H2V3l2.447 2.446C6.28 3.336 8.984 2 12 2zm1 5v4.585l3.243 3.243-1.415 1.415L11 12.413V7h2z" />
                                                                    </g>
                                                                </svg>
                                                                Watch Later
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                                style={{ display: 'flex' }}
                                                            >
                                                                <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#085CA4">
                                                                    <g>
                                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                                        <path d="M12 7a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 3.5l-1.323 2.68-2.957.43 2.14 2.085-.505 2.946L12 17.25l2.645 1.39-.505-2.945 2.14-2.086-2.957-.43L12 10.5zm1-8.501L18 2v3l-1.363 1.138A9.935 9.935 0 0 0 13 5.049L13 2zm-2 0v3.05a9.935 9.935 0 0 0-3.636 1.088L6 5V2l5-.001z" />
                                                                    </g>
                                                                </svg>

                                                                Subscription
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                                style={{ display: 'flex' }}
                                                            >

                                                                <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#085CA4">
                                                                    <g>
                                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                                        <path d="M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876 3.993 3.993 0 0 0 20 12c0 1.264.586 2.391 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543 3.993 3.993 0 0 0-3.456.261 3.993 3.993 0 0 0-1.954 2.86 9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121 3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124 10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                                    </g>
                                                                </svg>
                                                                Settings
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                                style={{ display: 'flex', color: '#FFC400' }}
                                                            >
                                                                <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '1rem' }} fill="#FFC400">
                                                                    <g>
                                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                                        <path d="M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm4 9V8l-5 4 5 4v-3h6v-2H9z" />
                                                                    </g>
                                                                </svg>

                                                                Logout
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="mt-8" style={{ margin: '16px' }}>

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
                                        style={{ padding: '16px', background: 'white' }}>
                                        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            {/* Card */}
                                            {families.map((card) => (
                                                <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg"
                                                    style={{ backgroundImage: `url(${card.image})`, height: '200px', position: 'relative' }}
                                                >
                                                    <img src="/img/bg_vertical.png" style={{ position: 'absolute', bottom: '0px' }} />
                                                    <div className="p-5" style={{ position: 'absolute', bottom: '0' }}>
                                                        <div style={{ fontSize: '16px', color: 'white', width: '100%', fontWeight: '500' }}>{card.name}</div>
                                                        <div style={{ width: '40px', height: '2px', background: '#FFC400', borderRadius: '1px', marginTop: '8px' }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <footer style={{ boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)', padding: '16px' }}>
                            <div style={{ textAlign: 'center', fontWeight: '500' }}>Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
                    </main>
                </div>


            </div >
        </>
    )
}
// JobFamilies.getInitialProps = async (context) => {
// const [authToken, setAuthToken] = useLocalStorage("authToken", "")
// }

export async function getServerSideProps(context) {
    const { token } = context.query;
    console.log('getServerSideProps' + token)
    const client = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const families = await queryGraph(client, {}, SchemeGetCareerFamilies)
        .then((res) => {
            console.log('asd ' + res);
            return res.careerPools
        }).catch((networkErr) => {
            console.log('data')
            return [];
            // console.log(networkErr);
        });
    console.log(families.length)
    return {
        props: { families }
    }
}


