import Link from 'next/link'
import { Fragment, useState, useRef, useEffect } from 'react'
import {
    DotsVerticalIcon,
    SearchIcon,
    ArrowRightIcon,
    SortAscendingIcon
} from '@heroicons/react/solid'
import { Dialog, Menu, Transition, RadioGroup } from '@headlessui/react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile, SchemeGetVideos } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import classNames from '/helpers/classNames'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'
import YoutubeDialog from '../../../components/dialog/YoutubeDialog'
import VideoItem from '../../../components/item/VideoItem'

const headerSlide = [
    {
        id: 1,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open"
    },
    {
        id: 2,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open"
    },

    {
        id: 3,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open"
    }
]

export default function CareerVideo({ videoCats, profile, order, q }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [openFilter, setOpenFilter] = useState(false)

    const [openVideoDialog, setOpenVideoDialog] = useState(false)

    const [headerPause, setHeaderPause] = useState(false)
    const timer = useRef()

    const [headerSliderRef, headerSlider] = useKeenSlider({
        initial: 0,
        loop: true,
        controls: true,
        duration: 1000,
        dragStart: () => {
            setHeaderPause(true)
        },
        dragEnd: () => {
            setHeaderPause(false)
        },
    })

    const [isSlider1ScrollLeft, setIsSlider1ScrollLeft] = useState(false)
    const [isSlider1ScrollRight, setIsSlider1ScrollRight] = useState(false)

    const [isSlider2ScrollLeft, setIsSlider2ScrollLeft] = useState(false)
    const [isSlider2ScrollRight, setIsSlider2ScrollRight] = useState(false)

    const [isSlider3ScrollLeft, setIsSlider3ScrollLeft] = useState(false)
    const [isSlider3ScrollRight, setIsSlider3ScrollRight] = useState(false)

    const [isSlider4ScrollLeft, setIsSlider4ScrollLeft] = useState(false)
    const [isSlider4ScrollRight, setIsSlider4ScrollRight] = useState(false)

    const [isSlider5ScrollLeft, setIsSlider5ScrollLeft] = useState(false)
    const [isSlider5ScrollRight, setIsSlider5ScrollRight] = useState(false)

    const [sliderRef1, slider1] = useKeenSlider({
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
        slideChanged: slider => {
            const details = slider.details()
            if (details.size <= details.slidesPerView) {
                setIsSlider1ScrollLeft(false)
                setIsSlider1ScrollRight(false)
            } else {
                if (details.absoluteSlide == 0)
                    setIsSlider1ScrollLeft(false)
                else
                    setIsSlider1ScrollLeft(true)
                if ((details.absoluteSlide + details.slidesPerView) >= details.size)
                    setIsSlider1ScrollRight(false)
                else
                    setIsSlider1ScrollRight(true)
            }
        },
    })
    const [sliderRef2, slider2] = useKeenSlider({
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
        slideChanged: slider => {
            const details = slider.details()
            if (details.size <= details.slidesPerView) {
                setIsSlider2ScrollLeft(false)
                setIsSlider2ScrollRight(false)
            } else {
                if (details.absoluteSlide == 0)
                    setIsSlider2ScrollLeft(false)
                else
                    setIsSlider2ScrollLeft(true)
                if ((details.absoluteSlide + details.slidesPerView) >= details.size)
                    setIsSlider2ScrollRight(false)
                else
                    setIsSlider2ScrollRight(true)
            }
        },
    })
    const [sliderRef3, slider3] = useKeenSlider({
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
        slideChanged: slider => {
            const details = slider.details()
            if (details.size <= details.slidesPerView) {
                setIsSlider3ScrollLeft(false)
                setIsSlider3ScrollRight(false)
            } else {
                if (details.absoluteSlide == 0)
                    setIsSlider3ScrollLeft(false)
                else
                    setIsSlider3ScrollLeft(true)
                if ((details.absoluteSlide + details.slidesPerView) >= details.size)
                    setIsSlider3ScrollRight(false)
                else
                    setIsSlider3ScrollRight(true)
            }
        },
    })
    const [sliderRef4, slider4] = useKeenSlider({
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
        slideChanged: slider => {
            const details = slider.details()
            if (details.size <= details.slidesPerView) {
                setIsSlider4ScrollLeft(false)
                setIsSlider4ScrollRight(false)
            } else {
                if (details.absoluteSlide == 0)
                    setIsSlider4ScrollLeft(false)
                else
                    setIsSlider4ScrollLeft(true)
                if ((details.absoluteSlide + details.slidesPerView) >= details.size)
                    setIsSlider4ScrollRight(false)
                else
                    setIsSlider4ScrollRight(true)
            }
        },
    })
    const [sliderRef5, slider5] = useKeenSlider({
        breakpoints: {
            "(min-width: 464px)": {
                slidesPerView: 1,
            },
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1200px)": {
                slidesPerView: 4,
            },
        },
        slideChanged: slider => {
            const details = slider.details()
            if (details.size <= details.slidesPerView) {
                setIsSlider5ScrollLeft(false)
                setIsSlider5ScrollRight(false)
            } else {
                if (details.absoluteSlide == 0)
                    setIsSlider5ScrollLeft(false)
                else
                    setIsSlider5ScrollLeft(true)
                if ((details.absoluteSlide + details.slidesPerView) >= details.size)
                    setIsSlider5ScrollRight(false)
                else
                    setIsSlider5ScrollRight(true)
            }
        },
    })

    const [selectedSort, setSelectedSort] = useState((order != null && order != "") ? order : '')

    useEffect(() => {
        setSelectedSort(order)
    }, [])

    const pages = [
        {
            name: 'Career Explorer', href: '/career_explorer/', current: false
        },
        { name: 'Career Videos', href: '#', current: true },
    ]

    const [searchText, setSearchText] = useState(q);

    const clearFilter = (event) => {
        setSelectedSort('')
        const queryParam = {}
        if (searchText != null && searchText != "")
            queryParam.q = searchText
        router.replace(
            {
                pathname: '/career_explorer/career_video',
                query: queryParam,
            }
        )
        setOpenFilter(false)
    }
    const applyFilter = (event) => {
        const q = {}
        if (selectedSort != null && selectedSort != "")
            q.order = selectedSort
        if (searchText != null && searchText != "")
            q.q = searchText
        console.log(q)
        router.replace(
            {
                pathname: '/career_explorer/career_video',
                query: q,
            }
        )
        setOpenFilter(false)
    }
    const search = (event) => {
        const queryParam = {}
        if (selectedSort != null && selectedSort != "")
            queryParam.order = selectedSort
        if (searchText != null && searchText != "")
            queryParam.q = searchText
        console.log(queryParam)
        router.replace(
            {
                pathname: '/career_explorer/career_video',
                query: queryParam,
            }
        )
    }
    const clearQuery = (event) => {
        setSearchText("")
        const queryParam = {}
        if (selectedSort != null && selectedSort != "")
            queryParam.order = selectedSort
        router.replace(
            {
                pathname: '/career_explorer/career_video',
                query: queryParam,
            }
        )
    }
    return (
        <>

            <MetaLayout title="Career Videos" description="Career Videos" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Videos" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="" >

                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col">
                                    <Breadcrumbs pages={pages} />

                                    <div className="sm:flex h-full w-full">
                                        <div className="w-full h-8">
                                            <label htmlFor="search_field" className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative w-full text-gray-400 ">
                                                <div className="flex absolute rounded bg-white left-4 shadow right-28 focus-within:text-gray-600 ">
                                                    <div className="p-2 items-center pointer-events-none" aria-hidden="true">
                                                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                    </div>
                                                    <input
                                                        id="search_field"
                                                        name="search_field"
                                                        className="self-center block w-full h-full p-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent mr-10"
                                                        placeholder="Search Video"
                                                        value={searchText}
                                                        onSubmit={search}
                                                        onChange={(e) => setSearchText(e.target.value)}

                                                    />
                                                    <button className="flex p-2 w-max absolute right-0 items-center bg-lblue rounded-r sm:text-sm text-white" aria-hidden="true"
                                                        onClick={search}>
                                                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>

                                                <button className="flex p-2 w-20 absolute right-4 items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                                                    onClick={(event) => {
                                                        setOpenFilter(true)
                                                    }}>
                                                    <div>Filter</div>
                                                    <img className="ml-2" src="/img/filter-icon.png" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        q != null && q != "" ?
                                            <div className="mx-4">
                                                <div
                                                    className=" relative w-full mt-4 px-4 text-left sm:text-sm"
                                                >
                                                    <span className="font-medium block truncate">Search Results for "{q}"</span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                                        <div onClick={clearQuery}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </div>
                                                    </span>
                                                </div>

                                            </div> : <></>
                                    }


                                    {
                                        videoCats.map((videoCat, index) => {
                                            const sliderRef = index == 0 ? sliderRef1 : index == 1 ? sliderRef2 : index == 2 ? sliderRef3 : index == 3 ? sliderRef4 : sliderRef5
                                            const slider = index == 0 ? slider1 : index == 1 ? slider2 : index == 2 ? slider3 : index == 3 ? slider4 : slider5
                                            const isSliderScrollLeft = index == 0 ? isSlider1ScrollLeft : index == 1 ? isSlider2ScrollLeft : index == 2 ? isSlider3ScrollLeft : index == 3 ? isSlider4ScrollLeft : isSlider5ScrollLeft
                                            const isSliderScrollRight = index == 0 ? isSlider1ScrollRight : index == 1 ? isSlider2ScrollRight : index == 2 ? isSlider3ScrollRight : index == 3 ? isSlider4ScrollRight : isSlider5ScrollRight

                                            return (
                                                <div className="mx-4 mt-4 pt-4  align-middle  overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="text-black mx-4 block text-base font-bold">
                                                            {videoCat.name}
                                                        </div>
                                                        <Link href={{
                                                            pathname: '/career_explorer/career_video/view_all',
                                                            query: { cId: videoCat.id },
                                                        }}>
                                                            <a>
                                                                <div className="text-sm text-right text-indigo-700 mx-4 ">
                                                                    View All
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="relative flex items-center">
                                                        {
                                                            isSliderScrollLeft ?
                                                                <a
                                                                    onClick={(event) => {
                                                                        slider.prev()
                                                                    }}>
                                                                    <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                        </svg>
                                                                    </div>
                                                                </a> : <></>
                                                        }
                                                        {
                                                            isSliderScrollRight ?
                                                                <a
                                                                    onClick={(event) => {
                                                                        slider.next()
                                                                    }}>
                                                                    <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                        </svg>
                                                                    </div>
                                                                </a> : <></>
                                                        }


                                                        <div className="navigation-wrapper w-full">
                                                            <div ref={sliderRef} className="keen-slider">
                                                                {
                                                                    videoCat.videos.map((video) => (
                                                                        <div className="keen-slider__slide">
                                                                            <VideoItem video={video} />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="h-4"></div>
                                </div>
                            </div>


                        </div>

                    </main>
                </div>


            </div>
            <Transition.Root show={openFilter} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    open={openFilter}
                    onClose={setOpenFilter}
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
                            <div className="inline-block align-bottom bg-white rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="text-center sm:text-left w-full">
                                        <Dialog.Title as="h3" className="w-full text-lg leading-6 font-medium text-gray-900 text-center">
                                            Sort
                                        </Dialog.Title>
                                        <div className="mt-2">

                                            <div
                                                onClick={(e) => { setSelectedSort('NEW_TO_OLD') }}
                                                className={classNames(
                                                    selectedSort == 'NEW_TO_OLD' ? 'z-10' : '',
                                                    'relative px-4 py-2 flex cursor-pointer focus:outline-none'
                                                )}>
                                                <span
                                                    className={classNames(
                                                        selectedSort == 'NEW_TO_OLD' ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                                        'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                </span>
                                                <div className="ml-3 flex flex-col">
                                                    <div
                                                        as="span"
                                                        className={classNames(selectedSort == 'NEW_TO_OLD' ? 'text-indigo-700' : 'text-gray-900', 'block text-sm font-medium')}
                                                    >
                                                        New To Old
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                onClick={(e) => { setSelectedSort('OLD_TO_NEW') }}
                                                className={classNames(
                                                    selectedSort == 'OLD_TO_NEW' ? 'z-10' : '',
                                                    'relative px-4 py-2 flex cursor-pointer focus:outline-none'
                                                )}>
                                                <span
                                                    className={classNames(
                                                        selectedSort == 'OLD_TO_NEW' ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                                        'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                </span>
                                                <div className="ml-3 flex flex-col">
                                                    <div
                                                        as="span"
                                                        className={classNames(selectedSort == 'OLD_TO_NEW' ? 'text-indigo-700' : 'text-gray-900', 'block text-sm font-medium')}
                                                    >
                                                        Old To New
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                onClick={(e) => { setSelectedSort('MOST_VIEWED') }}
                                                className={classNames(
                                                    selectedSort == 'MOST_VIEWED' ? 'z-10' : '',
                                                    'relative px-4 py-2 flex cursor-pointer focus:outline-none'
                                                )}>
                                                <span
                                                    className={classNames(
                                                        selectedSort == 'MOST_VIEWED' ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                                                        'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                                    )}
                                                    aria-hidden="true"
                                                >
                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                </span>
                                                <div className="ml-3 flex flex-col">
                                                    <div
                                                        as="span"
                                                        className={classNames(selectedSort == 'MOST_VIEWED' ? 'text-indigo-700' : 'text-gray-900', 'block text-sm font-medium')}
                                                    >
                                                        Most Viewed
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex">
                                    <button
                                        type="button"
                                        className="flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none border border-indigo-700 cursor-pointer duration-500"
                                        onClick={clearFilter}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-4 flex justify-center py-2 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                                        onClick={applyFilter}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <YoutubeDialog showDialog={openVideoDialog} setShowDialog={setOpenVideoDialog} />
        </>
    )
}


export async function getServerSideProps(context) {
    const { token } = cookies(context)
    const { order = "", q = "" } = context.query
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    const videosClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const params = {}
    if (order != "")
        params.order = order
    if (q != "")
        params.search_keyword = q
    const videoCats = await queryGraph(videosClient, params, SchemeGetVideos)
        .then((res) => {
            return res.videos
        }).catch((networkErr) => {
            return []
        })
    const profileClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        })
    return {
        props: { videoCats, profile, order, q }
    }
}


