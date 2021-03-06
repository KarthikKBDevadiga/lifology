import { Fragment, useState, useEffect } from 'react'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import {
    BookmarkIcon,
    SelectorIcon
} from '@heroicons/react/outline'
import {
    SearchIcon,
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import { SchemeGetUniversity, SchemeAddBookmark, SchemeVideoStatus, SchemeGetUniversityBookmark, SchemeUpdateUniversityBookmark, SchemeAllUniversityCareerPools, SchemeUniversityCareerFields } from '../../../helpers/GraphQLSchemes'
import { mutateGraph } from '../../../helpers/GraphQLCaller'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'
import LoadingDialog from '../../../components/dialog/LoadingDialog'
import NotificationLayout from '../../../components/NotificationLayout'
import classNames from '/helpers/classNames'
import ShareDialog from '/components/dialog/ShareDialog'
import createDynamicLink from '../../../helpers/DynamicLinkUtil'

export default function University({ profile, university, token, careerPools, poolIdFilter, fieldIdFilter }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [bookmarkStatus, setBookmarkStatus] = useState(university.bookmark_status)

    const [loadingDialog, setLoadingDialog] = useState(false)

    const [openFilter, setOpenFilter] = useState(false)
    const [selectedCareerPool, setSelectedCareerPool] = useState({})
    const [careerFields, setCareerFields] = useState([])
    const [selectedCareerField, setSelectedCareerField] = useState({})
    useEffect(() => {
        updateCareerPools(poolIdFilter == -1 ? {} : careerPools.find(cp => cp.id == poolIdFilter))
    }, [])
    const addToBookmark = (id) => {
        setLoadingDialog(true)
        const careerClient = new ApolloClient({
            uri: Constants.baseUrl + "/api/career",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        mutateGraph(careerClient, {
            college_id: parseInt(id)
        }, SchemeUpdateUniversityBookmark)
            .then((res) => {
                setLoadingDialog(false)
                setBookmarkStatus(res.universityBookmark.bookmark_status)
                console.log(res.universityBookmark)

            }).catch((networkErr) => {
                setLoadingDialog(false)
                console.log('error')
            })

    }

    const [shareDialog, setShareDialog] = useState(false)
    const [shareUrl, setShareUrl] = useState('')
    const shareVideo = () => {
        setShareDialog(true)
        createDynamicLink('/career_explorer/course_and_university/' + university.id)
            .then((res) => {
                setShareUrl(res)
                console.log(res)
            })
        // setShareUrl(querystring)
    }

    const pages = [
        {
            name: 'Career Explorer', href: '/career_explorer/', current: false
        },
        {
            name: 'Course & University', href: '/career_explorer/course_and_university', current: false
        },
        {
            name: 'University Details', href: '#', current: true
        },
    ]

    const clearFilter = (event) => {
        setSelectedCareerPool({})
        setSelectedCareerField({})
        router.replace(
            {
                pathname: '/career_explorer/course_and_university/' + university.id,
            }
        )
        setOpenFilter(false)
    }

    const applyFilter = (event) => {
        const queryParam = {}
        if (selectedCareerPool.id != null)
            queryParam.pool_id = selectedCareerPool.id
        if (selectedCareerField != null && selectedCareerField.id != null)
            queryParam.field_id = selectedCareerField.id
        if (searchText != null && searchText != "")
            queryParam.q = searchText
        router.replace(
            {
                pathname: '/career_explorer/course_and_university/' + university.id,
                query: queryParam,
            }
        )
        setOpenFilter(false)
    }
    const search = (event) => {
        const queryParam = {}
        if (selectedCareerPool.id != null)
            queryParam.pool_id = selectedCareerPool.id
        if (selectedCareerField != null && selectedCareerField.id != null)
            queryParam.field_id = selectedCareerField.id
        if (searchText != null && searchText != "")
            queryParam.q = searchText
        router.replace(
            {
                pathname: '/career_explorer/course_and_university/' + university.id,
                query: queryParam,
            }
        )
    }
    return (
        <>
            <MetaLayout title={university.name} description={university.description} />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={university.name} />


                    <main className="flex-1 relative z-0 overflow-y-auto">
                        <Breadcrumbs pages={pages} />
                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="lg:col-start-1 lg:col-span-2">
                                            <div className="bg-white align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg p-4">
                                                <div className="sm:flex h-full w-full">
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 mr-4 self-center">
                                                        <img className="object-contain " src={Constants.baseUrlImage + '/' + university.logo} style={{ maxHeight: '12rem', maxWidth: '12rem' }} />
                                                    </div>
                                                    <div className="w-full">
                                                        <div className="sm:flex sm:items-start sm:justify-between">
                                                            <div className="self-center">
                                                                <div className="bg-gray-200 px-4 py-2 text-xs rounded-full cursor-pointer duration-500 hover:text-white hover:bg-lblue">University</div>
                                                            </div>
                                                            <div className="sm:flex-shrink-0 sm:flex sm:items-center self-center">
                                                                <div className="self-center flex ml-auto text-xs">
                                                                    <div href="#">
                                                                        <div className="cursor-pointer flex hover:bg-gray-100 p-2 rounded-full duration-500 mr-2 active:scale-95 text-gray-400 hover:text-lblue duration-500"
                                                                            onClick={shareVideo}>
                                                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                                                                                <path d="M0 0h24v24H0z" fill="none" /><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div href="#" onClick={() => addToBookmark(university.id)}>
                                                                        <div className={
                                                                            classNames(
                                                                                "cursor-pointer hover:bg-gray-100 p-2 rounded-full duration-500  active:scale-95",
                                                                                bookmarkStatus == 1 ? "text-lblue" : "text-gray-400 hover:text-lblue duration-500"
                                                                            )
                                                                        } >
                                                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                                                                                <path d="M0 0h24v24H0z" fill="none" />
                                                                                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                                                                            </svg>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="font-bold text-base mt-4" >{university.name}</div>
                                                        <div className="mt-2 text-sm " >{university.description}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
                                                <div className="sm:flex h-full w-full">
                                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8" >
                                                        <div className="self-center font-medium text-base w-full">
                                                            <h2 className="text-base ">Course's Offered</h2>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="flex mt-2">
                                                    <div className="w-full">
                                                        <div className="flex rounded bg-lgrey focus-within:text-gray-600 ">
                                                            <div className="p-2 items-center pointer-events-none" aria-hidden="true">
                                                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                            </div>
                                                            <input
                                                                id="search_field"
                                                                name="search_field"
                                                                className="block w-full h-full p-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent "
                                                                placeholder="Search Course"
                                                                type="search"
                                                                value={searchText}
                                                                onChange={(e) => setSearchText(e.target.value)}

                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0">
                                                        <button className="flex p-2 w-20 items-center bg-lblue rounded sm:text-sm text-white" aria-hidden="true"
                                                            onClick={(event) => {
                                                                setOpenFilter(true)
                                                            }}>
                                                            <div>Filter</div>
                                                            <img className="ml-2" src="/img/filter-icon.png" />
                                                        </button>
                                                    </div>
                                                </div>


                                                <div className="mt-4">
                                                    {
                                                        university.career_courses.length > 0 && university.career_courses.filter((u) => {
                                                            if (searchText.trim() === "") {
                                                                return u;
                                                            }
                                                            if (u.name.toLowerCase().includes(searchText.toLowerCase())) {
                                                                return u;
                                                            }
                                                            return "";
                                                        }).map((u, index) => {
                                                            var total = university.career_courses.filter((u) => {
                                                                if (searchText.trim() === "")
                                                                    return u
                                                                if (u.name.toLowerCase().includes(searchText.toLowerCase()))
                                                                    return u
                                                                return ""
                                                            }).length
                                                            return (
                                                                <>
                                                                    <div className="sm:flex">
                                                                        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                                            <img src="/img/university_img.jpg" alt="University" className="w-20 h-20 rounded-lg object-cover" />
                                                                        </div>
                                                                        <div className="self-center">
                                                                            <h4 className="text-sm font-medium">{u.name}</h4>
                                                                            <p className="mt-2 flex">
                                                                                <div className="cursor-pointer mr-2 px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 duration-500">
                                                                                    <svg
                                                                                        className="inline-block align-middle h-4"
                                                                                        viewBox="0 0 24 24">
                                                                                        <path
                                                                                            id="path"
                                                                                            d="M 12.161 22.294 C 9.866 22.294 7.637 21.515 5.842 20.084 C 4.047 18.652 2.791 16.653 2.28 14.415 C 1.769 12.178 2.034 9.831 3.03 7.763 C 4.025 5.695 5.695 4.025 7.763 3.03 C 9.831 2.034 12.178 1.769 14.415 2.28 C 16.653 2.791 18.652 4.047 20.084 5.842 C 21.515 7.637 22.294 9.866 22.294 12.161 C 22.294 14.847 21.226 17.427 19.326 19.326 C 17.427 21.226 14.847 22.294 12.161 22.294 Z M 8.614 14.187 L 8.614 16.214 L 11.147 16.214 L 11.147 18.241 L 13.174 18.241 L 13.174 16.214 L 14.187 16.214 C 14.859 16.214 15.504 15.947 15.978 15.472 C 16.453 14.997 16.721 14.352 16.721 13.681 C 16.721 13.009 16.453 12.364 15.978 11.889 C 15.504 11.414 14.859 11.147 14.187 11.147 L 10.134 11.147 C 10.004 11.141 9.88 11.085 9.79 10.991 C 9.7 10.897 9.65 10.771 9.65 10.64 C 9.65 10.51 9.7 10.384 9.79 10.29 C 9.88 10.196 10.004 10.14 10.134 10.134 L 15.707 10.134 L 15.707 8.107 L 13.174 8.107 L 13.174 6.08 L 11.147 6.08 L 11.147 8.107 L 10.134 8.107 C 9.462 8.107 8.817 8.374 8.343 8.849 C 7.868 9.324 7.601 9.969 7.601 10.64 C 7.601 11.312 7.868 11.957 8.343 12.432 C 8.817 12.907 9.462 13.174 10.134 13.174 L 14.187 13.174 C 14.297 13.169 14.406 13.2 14.496 13.263 C 14.587 13.325 14.655 13.415 14.69 13.52 C 14.725 13.624 14.725 13.737 14.69 13.841 C 14.655 13.946 14.587 14.036 14.496 14.098 C 14.406 14.161 14.297 14.192 14.187 14.187 Z"
                                                                                            fill="#30c702"
                                                                                            strokeWidth="1" />
                                                                                    </svg>
                                                                                    <span className="inline-block text-xs align-middle ml-2" >${u.fee}</span>

                                                                                </div>
                                                                                <div className="cursor-pointer mr-2 px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 duration-500">
                                                                                    <svg
                                                                                        className="inline-block align-middle h-4"
                                                                                        viewBox="0 0 24 24">
                                                                                        <path
                                                                                            id="path"
                                                                                            d="M 12.161 22.294 C 9.866 22.294 7.637 21.515 5.842 20.084 C 4.047 18.652 2.791 16.653 2.28 14.415 C 1.769 12.178 2.034 9.831 3.03 7.763 C 4.025 5.695 5.695 4.025 7.763 3.03 C 9.831 2.034 12.178 1.769 14.415 2.28 C 16.653 2.791 18.652 4.047 20.084 5.842 C 21.515 7.637 22.294 9.866 22.294 12.161 C 22.294 14.847 21.226 17.427 19.326 19.326 C 17.427 21.226 14.847 22.294 12.161 22.294 Z M 13.174 12.16 L 13.174 7.094 L 11.147 7.094 L 11.147 14.187 L 17.227 14.187 L 17.227 12.161 Z"
                                                                                            fill="#ffc400"
                                                                                            strokeWidth="1" />
                                                                                    </svg>
                                                                                    <span className="inline-block align-middle ml-2 text-xs">{u.duration}</span>
                                                                                </div>
                                                                                <div className="cursor-pointer px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 duration-500">
                                                                                    <svg
                                                                                        className="inline-block align-middle h-4"
                                                                                        viewBox="0 0 24 24">
                                                                                        <path
                                                                                            id="path"
                                                                                            d="M 17.227 19.254 L 19.254 19.254 L 19.254 11.147 L 13.174 11.147 L 13.174 19.254 L 15.201 19.254 L 15.201 13.174 L 17.227 13.174 Z M 3.04 19.254 L 3.04 4.053 C 3.04 3.875 3.087 3.7 3.176 3.546 C 3.265 3.392 3.393 3.264 3.547 3.175 C 3.701 3.087 3.876 3.04 4.054 3.04 L 18.241 3.04 C 18.51 3.04 18.767 3.147 18.957 3.337 C 19.147 3.527 19.254 3.784 19.254 4.053 L 19.254 9.12 L 21.281 9.12 L 21.281 19.254 L 22.294 19.254 L 22.294 21.281 L 2.027 21.281 L 2.027 19.254 Z M 7.093 11.147 L 7.093 13.174 L 9.121 13.174 L 9.121 11.147 Z M 7.093 15.2 L 7.093 17.227 L 9.121 17.227 L 9.121 15.2 Z M 7.093 7.093 L 7.093 9.12 L 9.121 9.12 L 9.121 7.093 Z"
                                                                                            fill="#000000"
                                                                                            strokeWidth="1" />
                                                                                    </svg>
                                                                                    <span className="inline-block align-middle ml-2 text-xs">TOEFL: 100</span>
                                                                                </div>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        (index + 1) != total ?
                                                                            <div className="py-2">
                                                                                <div className="w-full h-px bg-gray-200"></div>
                                                                            </div>
                                                                            : <></>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {/* {university.career_courses.length > 0 && university.career_courses.filter((u) => {
                                                        if (searchText.trim() === "") {

                                                            return u;
                                                        }
                                                        if (u.name.toLowerCase().includes(searchText.toLowerCase())) {

                                                            return u;
                                                        }
                                                        return "";
                                                    }).map((u) => (
                                                        <div className="rounded shadow p-4 my-4 hover:shadow-xl duration-500">
                                                            <div className="flex">
                                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                                                                    <img src="/img/university_img.jpg" alt="University" className="w-20 h-20 rounded-lg absolute top-0 left-0 bottom-0 right-0 object-cover" />
                                                                </div>
                                                                <div className="self-center w-full">
                                                                    <div className="flex">
                                                                        <div style={{ width: '75%' }}>
                                                                            <div className="ml-4">
                                                                                <h4 className="p-0 text-sm font-medium" >{u.name}</h4>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ width: '25%' }}>
                                                                            <div className="">
                                                                                <svg
                                                                                    className="inline-block align-middle h-4"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 12.161 22.294 C 9.866 22.294 7.637 21.515 5.842 20.084 C 4.047 18.652 2.791 16.653 2.28 14.415 C 1.769 12.178 2.034 9.831 3.03 7.763 C 4.025 5.695 5.695 4.025 7.763 3.03 C 9.831 2.034 12.178 1.769 14.415 2.28 C 16.653 2.791 18.652 4.047 20.084 5.842 C 21.515 7.637 22.294 9.866 22.294 12.161 C 22.294 14.847 21.226 17.427 19.326 19.326 C 17.427 21.226 14.847 22.294 12.161 22.294 Z M 8.614 14.187 L 8.614 16.214 L 11.147 16.214 L 11.147 18.241 L 13.174 18.241 L 13.174 16.214 L 14.187 16.214 C 14.859 16.214 15.504 15.947 15.978 15.472 C 16.453 14.997 16.721 14.352 16.721 13.681 C 16.721 13.009 16.453 12.364 15.978 11.889 C 15.504 11.414 14.859 11.147 14.187 11.147 L 10.134 11.147 C 10.004 11.141 9.88 11.085 9.79 10.991 C 9.7 10.897 9.65 10.771 9.65 10.64 C 9.65 10.51 9.7 10.384 9.79 10.29 C 9.88 10.196 10.004 10.14 10.134 10.134 L 15.707 10.134 L 15.707 8.107 L 13.174 8.107 L 13.174 6.08 L 11.147 6.08 L 11.147 8.107 L 10.134 8.107 C 9.462 8.107 8.817 8.374 8.343 8.849 C 7.868 9.324 7.601 9.969 7.601 10.64 C 7.601 11.312 7.868 11.957 8.343 12.432 C 8.817 12.907 9.462 13.174 10.134 13.174 L 14.187 13.174 C 14.297 13.169 14.406 13.2 14.496 13.263 C 14.587 13.325 14.655 13.415 14.69 13.52 C 14.725 13.624 14.725 13.737 14.69 13.841 C 14.655 13.946 14.587 14.036 14.496 14.098 C 14.406 14.161 14.297 14.192 14.187 14.187 Z"
                                                                                        fill="#30c702"
                                                                                        strokeWidth="1" />
                                                                                </svg>
                                                                                <span className="inline-block text-sm align-middle ml-2" >$ {u.fee}</span>

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex mt-2">
                                                                        <div style={{ width: '75%' }}>
                                                                            <div className="ml-4">
                                                                                <div>
                                                                                    <svg
                                                                                        className="inline-block align-middle h-4"
                                                                                        viewBox="0 0 24 24">
                                                                                        <path
                                                                                            id="path"
                                                                                            d="M 12.161 22.294 C 9.866 22.294 7.637 21.515 5.842 20.084 C 4.047 18.652 2.791 16.653 2.28 14.415 C 1.769 12.178 2.034 9.831 3.03 7.763 C 4.025 5.695 5.695 4.025 7.763 3.03 C 9.831 2.034 12.178 1.769 14.415 2.28 C 16.653 2.791 18.652 4.047 20.084 5.842 C 21.515 7.637 22.294 9.866 22.294 12.161 C 22.294 14.847 21.226 17.427 19.326 19.326 C 17.427 21.226 14.847 22.294 12.161 22.294 Z M 13.174 12.16 L 13.174 7.094 L 11.147 7.094 L 11.147 14.187 L 17.227 14.187 L 17.227 12.161 Z"
                                                                                            fill="#ffc400"
                                                                                            strokeWidth="1" />
                                                                                    </svg>
                                                                                    <span className="inline-block align-middle ml-2 text-sm">{u.duration}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ width: '25%' }}>
                                                                            <div>
                                                                                <svg
                                                                                    className="inline-block align-middle h-4"
                                                                                    viewBox="0 0 24 24">
                                                                                    <path
                                                                                        id="path"
                                                                                        d="M 17.227 19.254 L 19.254 19.254 L 19.254 11.147 L 13.174 11.147 L 13.174 19.254 L 15.201 19.254 L 15.201 13.174 L 17.227 13.174 Z M 3.04 19.254 L 3.04 4.053 C 3.04 3.875 3.087 3.7 3.176 3.546 C 3.265 3.392 3.393 3.264 3.547 3.175 C 3.701 3.087 3.876 3.04 4.054 3.04 L 18.241 3.04 C 18.51 3.04 18.767 3.147 18.957 3.337 C 19.147 3.527 19.254 3.784 19.254 4.053 L 19.254 9.12 L 21.281 9.12 L 21.281 19.254 L 22.294 19.254 L 22.294 21.281 L 2.027 21.281 L 2.027 19.254 Z M 7.093 11.147 L 7.093 13.174 L 9.121 13.174 L 9.121 11.147 Z M 7.093 15.2 L 7.093 17.227 L 9.121 17.227 L 9.121 15.2 Z M 7.093 7.093 L 7.093 9.12 L 9.121 9.12 L 9.121 7.093 Z"
                                                                                        fill="#000000"
                                                                                        strokeWidth="1" />
                                                                                </svg>
                                                                                <span className="inline-block align-middle ml-2 text-sm">TOEFL: 100</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))} */}

                                                </div>
                                            </div>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                            {/* <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                                    University Video
                                                </h2>
                                                <img className="rounded mt-2" src="/img/test.png" />
                                            </div> */}
                                            <div className="mt-0 bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <div className="flex ">
                                                    <svg
                                                        width="48px"
                                                        height="48px"
                                                        viewBox="0 0 57 57">
                                                        <path
                                                            id="path"
                                                            d="M 25 0 L 32 0 C 38.628 0 44.991 2.636 49.678 7.322 C 54.364 12.009 57 18.372 57 25 L 57 32 C 57 38.628 54.364 44.991 49.678 49.678 C 44.991 54.364 38.628 57 32 57 L 25 57 C 18.372 57 12.009 54.364 7.322 49.678 C 2.636 44.991 0 38.628 0 32 L 0 25 C 0 18.372 2.636 12.009 7.322 7.322 C 12.009 2.636 18.372 0 25 0"
                                                            fill="#02c77d"
                                                            strokeWidth="1" />
                                                        <path
                                                            id="path_1"
                                                            d="M 36.101 35.328 L 28.001 43.428 L 19.901 35.328 C 18.066 33.493 16.908 31.089 16.617 28.51 C 16.326 25.932 16.92 23.329 18.301 21.132 C 19.681 18.935 21.768 17.271 24.217 16.414 C 26.666 15.557 29.336 15.557 31.785 16.414 C 34.234 17.271 36.321 18.935 37.701 21.132 C 39.082 23.329 39.676 25.932 39.385 28.51 C 39.094 31.089 37.936 33.493 36.101 35.328 Z M 28.001 29.772 C 28.676 29.772 29.324 29.504 29.801 29.026 C 30.279 28.549 30.547 27.901 30.547 27.226 C 30.547 26.551 30.279 25.903 29.801 25.426 C 29.324 24.948 28.676 24.68 28.001 24.68 C 27.326 24.68 26.678 24.948 26.201 25.426 C 25.723 25.903 25.455 26.551 25.455 27.226 C 25.455 27.901 25.723 28.549 26.201 29.026 C 26.678 29.504 27.326 29.772 28.001 29.772 Z"
                                                            fill="#ffffff"
                                                            strokeWidth="1" />
                                                    </svg>
                                                    <div className="self-center ml-4">
                                                        <div className="text-xs " >Location</div>
                                                        <div className="mt-1 text-sm font-medium " >{university.city}, {university.state}, {university.country}</div>
                                                    </div>
                                                </div>
                                                <div className="flex mt-4">
                                                    <svg
                                                        width="48px"
                                                        height="48px"
                                                        viewBox="0 0 57 57">
                                                        <path
                                                            id="path"
                                                            d="M 25 0 L 32 0 C 38.628 0 44.991 2.636 49.678 7.322 C 54.364 12.009 57 18.372 57 25 L 57 32 C 57 38.628 54.364 44.991 49.678 49.678 C 44.991 54.364 38.628 57 32 57 L 25 57 C 18.372 57 12.009 54.364 7.322 49.678 C 2.636 44.991 0 38.628 0 32 L 0 25 C 0 18.372 2.636 12.009 7.322 7.322 C 12.009 2.636 18.372 0 25 0"
                                                            fill="#79d6fb"
                                                            strokeWidth="1" />
                                                        <path
                                                            id="path_1"
                                                            d="M 35.667 16 L 41 16 C 41.234 16 41.464 16.061 41.667 16.178 C 41.87 16.295 42.038 16.464 42.155 16.666 C 42.272 16.869 42.334 17.099 42.334 17.333 L 42.334 38.667 C 42.334 39.02 42.193 39.36 41.944 39.61 C 41.694 39.859 41.354 40 41.001 40 L 17.001 40 C 16.767 40 16.537 39.939 16.334 39.822 C 16.131 39.705 15.963 39.536 15.846 39.334 C 15.729 39.131 15.667 38.901 15.667 38.667 L 15.667 17.333 C 15.667 17.099 15.729 16.869 15.846 16.666 C 15.963 16.464 16.131 16.296 16.334 16.179 C 16.536 16.062 16.766 16 17 16 L 22.334 16 L 22.334 13.333 L 25.001 13.333 L 25.001 16 L 33.001 16 L 33.001 13.333 L 35.667 13.333 Z M 18.333 24 L 18.333 37.333 L 39.667 37.333 L 39.667 24 Z M 21 26.667 L 23.667 26.667 L 23.667 29.333 L 21 29.333 Z M 27.667 26.667 L 30.334 26.667 L 30.334 29.333 L 27.667 29.333 Z M 34.334 26.667 L 37.001 26.667 L 37.001 29.333 L 34.334 29.333 Z"
                                                            fill="#ffffff"
                                                            strokeWidth="1" />
                                                    </svg>
                                                    <div className="self-center ml-4">
                                                        <div className="text-xs " >Founded</div>
                                                        <div className="mt-1 text-sm font-medium " >{university.established}</div>
                                                    </div>
                                                </div>
                                                <div className="flex mt-4">
                                                    <svg
                                                        width="48px"
                                                        height="48px"
                                                        viewBox="0 0 57 57">
                                                        <path
                                                            id="path"
                                                            d="M 25 0 L 32 0 C 38.628 0 44.991 2.636 49.678 7.322 C 54.364 12.009 57 18.372 57 25 L 57 32 C 57 38.628 54.364 44.991 49.678 49.678 C 44.991 54.364 38.628 57 32 57 L 25 57 C 18.372 57 12.009 54.364 7.322 49.678 C 2.636 44.991 0 38.628 0 32 L 0 25 C 0 18.372 2.636 12.009 7.322 7.322 C 12.009 2.636 18.372 0 25 0"
                                                            fill="#ff0000"
                                                            strokeWidth="1" />
                                                        <g id="group">
                                                            <path
                                                                id="path_1"
                                                                d="M 40.161 33.714 L 40.161 25.064 L 38.531 25.607 L 38.531 33.714 C 38.023 33.885 37.581 34.211 37.269 34.646 C 36.956 35.082 36.787 35.604 36.786 36.14 L 36.786 40.503 C 36.786 40.719 36.872 40.927 37.025 41.079 C 37.177 41.232 37.385 41.318 37.601 41.318 L 41.092 41.318 C 41.308 41.318 41.516 41.232 41.668 41.079 C 41.821 40.927 41.907 40.719 41.907 40.503 L 41.907 36.14 C 41.906 35.604 41.737 35.081 41.424 34.646 C 41.111 34.211 40.669 33.885 40.161 33.714 Z M 27.232 28.86 L 19.332 26.228 L 19.332 31.777 C 19.332 31.993 19.418 32.2 19.571 32.353 C 21.051 33.833 22.894 34.897 24.916 35.439 C 26.937 35.981 29.066 35.981 31.087 35.439 C 33.109 34.897 34.952 33.833 36.432 32.353 C 36.585 32.2 36.671 31.993 36.671 31.777 L 36.671 26.228 L 28.771 28.86 C 28.271 29.026 27.732 29.026 27.232 28.86 Z"
                                                                fill="#000000"
                                                                strokeWidth="1" />
                                                            <path
                                                                id="path_2"
                                                                d="M 28.001 27.356 C 28.089 27.356 28.176 27.342 28.259 27.314 L 41.35 22.951 C 41.512 22.897 41.653 22.793 41.753 22.654 C 41.853 22.516 41.907 22.349 41.907 22.178 C 41.907 22.007 41.853 21.84 41.753 21.702 C 41.653 21.563 41.512 21.459 41.35 21.405 L 28.259 17.041 C 28.092 16.985 27.911 16.985 27.744 17.041 L 14.653 21.404 C 14.491 21.458 14.35 21.562 14.25 21.701 C 14.15 21.839 14.096 22.006 14.096 22.177 C 14.096 22.348 14.15 22.515 14.25 22.653 C 14.35 22.792 14.491 22.896 14.653 22.95 L 27.744 27.314 C 27.827 27.342 27.914 27.356 28.002 27.356 Z"
                                                                fill="#000000"
                                                                strokeWidth="1" />
                                                        </g>
                                                    </svg>
                                                    <div className="self-center ml-4">
                                                        <div className="text-xs " >Type</div>
                                                        <div className="mt-1 text-sm font-medium " >{university.type}</div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="mt-4 bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <div className="text-base font-medium text-gray-900 text-center">
                                                    Get in Touch
                                                </div>
                                                <div className="mt-2 text-sm font-medium text-gray-900 text-center">
                                                    Book a Free Call with Advisor
                                                </div>
                                                <div
                                                    className="cursor-pointer w-max ml-auto mr-auto mt-2 py-2 px-4 border border-lblue rounded-full text-sm font-medium text-lblue bg-white hover:bg-lblue hover:text-white focus:outline-none duration-500">
                                                    Connect with an Agent
                                                </div>
                                            </div>

                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>


            </div>

            <LoadingDialog showDialog={loadingDialog} setShowDialog={setLoadingDialog} />
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
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="text-center sm:text-left w-full">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 text-center">
                                            Filter
                                        </Dialog.Title>
                                        <div className="font-medium text-base mt-4">Career Pools</div>
                                        <Listbox value={selectedCareerPool} onChange={updateCareerPools}>
                                            {({ open }) => (
                                                <>
                                                    <div className="mt-1 relative mt-2">
                                                        <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                            <span className={classNames(selectedCareerPool.name ? '' : 'text-gray-400', "block truncate")}>{selectedCareerPool.name ? selectedCareerPool.name : 'Career Pools'}</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition className="sticky"
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                static
                                                                className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                            >
                                                                {
                                                                    careerPools.length > 0 ?
                                                                        careerPools.map((cp) => (
                                                                            <Listbox.Option
                                                                                key={cp.name}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                    )
                                                                                }
                                                                                value={cp}
                                                                            >
                                                                                {({ selected, active }) => (
                                                                                    <>
                                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                            {cp.name}
                                                                                        </span>


                                                                                    </>
                                                                                )}
                                                                            </Listbox.Option>
                                                                        )) : <Listbox.Option
                                                                            key='no_data'
                                                                            className={({ active }) =>
                                                                                classNames(
                                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                )
                                                                            }
                                                                            value="No Data">
                                                                            <span className={classNames('font-normal', 'block truncate')}>
                                                                                No Data
                                                                            </span>
                                                                        </Listbox.Option>
                                                                }
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                        </Listbox>
                                        <div className="font-medium text-base mt-4">Career Fields</div>
                                        <Listbox value={selectedCareerField} onChange={setSelectedCareerField}>
                                            {({ open }) => (
                                                <>
                                                    <div className="mt-1 relative mt-2">
                                                        <Listbox.Button className="relative w-full bg-gray-100 border rounded-full shadow-sm pl-3 pr-10 py-2 text-left cursor-default outline-none focus:outline-none focus:border-indigo-700 sm:text-sm border border-gray-300 " >
                                                            <span className={classNames(selectedCareerField && selectedCareerField.name ? '' : 'text-gray-400', "block truncate")}>{selectedCareerField && selectedCareerField.name ? selectedCareerField.name : 'Career Fields'}</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                        </Listbox.Button>

                                                        <Transition className="sticky"
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options
                                                                static
                                                                className="sticky absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                            >
                                                                {
                                                                    careerFields.length > 0 ?
                                                                        careerFields.map((cf) => (
                                                                            <Listbox.Option
                                                                                key={cf.name}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                    )
                                                                                }
                                                                                value={cf}
                                                                            >
                                                                                {({ selected, active }) => (
                                                                                    <>
                                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                            {cf.name}
                                                                                        </span>


                                                                                    </>
                                                                                )}
                                                                            </Listbox.Option>
                                                                        )) : <Listbox.Option
                                                                            key='no_data'
                                                                            className={({ active }) =>
                                                                                classNames(
                                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                )
                                                                            }
                                                                            value="No Data">
                                                                            <span className={classNames('font-normal', 'block truncate')}>
                                                                                No Data
                                                                            </span>
                                                                        </Listbox.Option>
                                                                }
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                        </Listbox>

                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-4 sm:flex">
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
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <ShareDialog showDialog={shareDialog} setShowDialog={setShareDialog} url={shareUrl} title={university.name} />
        </>
    )
    function updateCareerPools(careerPool) {
        setSelectedCareerPool(careerPool)
        setSelectedCareerField({})
        const careerClient = new ApolloClient({
            uri: Constants.baseUrl + "/api/career",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        if (careerPool.id)
            queryGraph(careerClient, { pool_id: parseInt(careerPool.id), college_id: parseInt(university.id) }, SchemeUniversityCareerFields)
                .then((res) => {
                    setCareerFields(res.universityFields)
                    setSelectedCareerField(fieldIdFilter == -1 ? {} : res.universityFields.find(cf => cf.id == fieldIdFilter))
                }).catch((networkErr) => {
                    console.log('error')
                })
    }
}

export async function getServerSideProps(context) {
    const { token } = cookies(context)
    const { pool_id = -1, field_id = -1, q = "" } = context.query
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    const careerClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const params = {
        id: parseInt(context.params.id)
    }
    if (pool_id != -1)
        params.pool_id = parseInt(pool_id)

    if (field_id != -1)
        params.field_id = parseInt(field_id)

    const university = await queryGraph(careerClient, params, SchemeGetUniversity)
        .then((res) => {
            console.log('Hello ' + res.universityDetails)
            return res.universityDetails[0]
        }).catch((networkErr) => {
            console.log(networkErr)
            return {}
        })
    console.log(university)
    const careerPools = await queryGraph(careerClient, { college_id: parseInt(context.params.id) }, SchemeAllUniversityCareerPools)
        .then((res) => {
            return res.universityPool
        }).catch((networkErr) => {
            console.log(networkErr)
            return [];
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
        props: { profile, university, token, careerPools, poolIdFilter: pool_id, fieldIdFilter: field_id, }
    }
}


