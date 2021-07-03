import { useState } from 'react'
import {
    ThumbUpIcon,
    ThumbDownIcon,
    ClockIcon,
} from '@heroicons/react/outline'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import styles from '/styles/Magazine.module.css'

import "react-multi-carousel/lib/styles.css";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const popularVideos = [
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    { heading: 'Career In Veterinary Science', subheading: 'Lorem ipsum dolor sit amet, sectetur.', image: '/img/test.png', date: 'May 25', read: '5 min read' },
    // More items...
]



export default function PrivacyPolicy({ profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const index = 5;
    return (
        <>
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Settings / Privacy Policy" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4">

                            <div className="max-w-6xl mx-auto mt-4">
                                <div className="flex flex-col mt-2">

                                    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                        <div className="space-y-6 lg:col-start-1 lg:col-span-1">
                                            {/* Description list*/}
                                            <section aria-labelledby="applicant-information-title" >
                                                <div className="bg-white shadow sm:rounded-lg p-4">
                                                    <h2 id="applicant-information-title" className="text-base font-medium text-gray-900 rounded w-full">
                                                        Settings
                                                    </h2>
                                                    <div className="space-y-1 mt-4">
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                index == 1 ? 'text-white bg-indigo-700' : 'text-black bg-white hover:bg-indigo-100',
                                                                "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                                            )}
                                                            onClick={() => {
                                                                router.push({
                                                                    pathname: '/aboutus',
                                                                    query: { token: authToken }
                                                                })
                                                            }}
                                                        >
                                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 1 ? 'white' : 'black'}>
                                                                <g>

                                                                    <path
                                                                        d="M 12 22 C 9.349 22 6.804 20.946 4.929 19.071 C 3.054 17.196 2 14.651 2 12 C 2 9.349 3.054 6.804 4.929 4.929 C 6.804 3.054 9.349 2 12 2 C 14.651 2 17.196 3.054 19.071 4.929 C 20.946 6.804 22 9.349 22 12 C 22 13.755 21.538 15.48 20.66 17 C 19.783 18.52 18.52 19.783 17 20.66 C 15.48 21.538 13.755 22 12 22 Z M 11 11 L 11 17 L 13 17 L 13 11 Z M 11 7 L 11 9 L 13 9 L 13 7 Z"
                                                                        stroke-width="1" />
                                                                </g>
                                                            </svg>
                                                            About Us
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                index == 2 ? 'text-white bg-indigo-700' : 'text-black bg-white hover:bg-indigo-100',
                                                                "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                                            )}
                                                        >
                                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 2 ? 'white' : 'black'}>
                                                                <g>
                                                                    <path
                                                                        d="M 12 2 C 9.488 2.002 7.068 2.95 5.223 4.654 C 3.378 6.358 2.241 8.697 2.04 11.2 L 7.4 13.413 C 7.869 13.092 8.425 12.92 8.993 12.921 C 9.046 12.921 9.093 12.921 9.15 12.926 L 11.534 9.474 L 11.534 9.425 C 11.535 8.426 11.934 7.467 12.642 6.761 C 13.349 6.055 14.309 5.659 15.309 5.66 C 16.308 5.661 17.267 6.06 17.973 6.767 C 18.679 7.475 19.075 8.435 19.074 9.434 C 19.073 10.434 18.674 11.393 17.967 12.099 C 17.259 12.805 16.299 13.201 15.3 13.2 L 15.213 13.2 L 11.813 15.626 L 11.813 15.759 C 11.815 16.461 11.555 17.14 11.084 17.661 C 10.613 18.182 9.965 18.51 9.266 18.579 C 8.567 18.649 7.867 18.455 7.302 18.037 C 6.738 17.619 6.35 17.005 6.213 16.316 L 2.385 14.725 C 3.064 17.123 4.616 19.183 6.735 20.497 C 8.853 21.812 11.388 22.287 13.838 21.831 C 16.289 21.374 18.482 20.017 19.985 18.029 C 21.488 16.04 22.194 13.559 21.964 11.077 C 21.734 8.595 20.584 6.286 18.741 4.608 C 16.898 2.929 14.493 1.998 12 2 Z M 7.078 16.667 C 7.314 17.162 7.734 17.547 8.248 17.739 C 8.763 17.932 9.332 17.917 9.835 17.698 C 10.339 17.48 10.738 17.074 10.949 16.567 C 11.163 16.054 11.167 15.478 10.96 14.963 C 10.754 14.447 10.353 14.033 9.845 13.809 C 9.337 13.586 8.76 13.571 8.241 13.767 L 9.51 14.292 C 9.88 14.46 10.17 14.765 10.319 15.143 C 10.467 15.521 10.464 15.942 10.308 16.317 C 10.152 16.692 9.856 16.992 9.484 17.153 C 9.111 17.314 8.69 17.324 8.31 17.181 L 7.082 16.673 Z M 17.818 9.422 C 17.818 8.756 17.553 8.116 17.082 7.645 C 16.611 7.174 15.971 6.909 15.305 6.909 C 14.639 6.909 13.999 7.174 13.528 7.645 C 13.057 8.116 12.792 8.756 12.792 9.422 C 12.792 10.088 13.057 10.728 13.528 11.199 C 13.999 11.67 14.639 11.935 15.305 11.935 C 15.971 11.934 16.61 11.669 17.081 11.198 C 17.552 10.727 17.817 10.088 17.818 9.422 Z M 15.31 7.53 C 15.811 7.53 16.291 7.729 16.645 8.083 C 16.999 8.437 17.198 8.917 17.198 9.418 C 17.198 9.919 16.999 10.399 16.645 10.753 C 16.291 11.107 15.811 11.306 15.31 11.306 C 14.809 11.306 14.329 11.107 13.975 10.753 C 13.621 10.399 13.422 9.919 13.422 9.418 C 13.423 8.918 13.622 8.437 13.976 8.084 C 14.329 7.73 14.81 7.531 15.31 7.53 Z"
                                                                        stroke-width="1" />
                                                                </g>
                                                            </svg>
                                                            Guinness Record
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                index == 3 ? 'text-white bg-indigo-700' : 'text-black bg-white hover:bg-indigo-100',
                                                                "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                                            )}
                                                            onClick={() => {
                                                                router.push({
                                                                    pathname: '/terms_of_policy',
                                                                    query: { token: authToken }
                                                                })
                                                            }}
                                                        >
                                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 3 ? 'white' : 'black'}>
                                                                <g>
                                                                    <path
                                                                        d="M 16.456 1.315 L 22.027 6.657 L 22.027 21.624 C 22.021 21.911 21.901 22.184 21.693 22.383 C 21.486 22.582 21.208 22.69 20.921 22.684 L 3.079 22.684 C 2.793 22.688 2.516 22.579 2.309 22.38 C 2.102 22.182 1.981 21.91 1.973 21.624 L 1.973 2.375 C 1.979 2.088 2.099 1.815 2.307 1.616 C 2.514 1.417 2.792 1.309 3.079 1.315 Z M 10.886 6.657 L 10.886 8.794 L 13.114 8.794 L 13.114 6.657 Z M 10.886 10.931 L 10.886 17.342 L 13.114 17.342 L 13.114 10.931 Z"
                                                                        stroke-width="1" />
                                                                </g>
                                                            </svg>
                                                            Terms of Policy
                                                        </a>
                                                        <a
                                                            href="#"
                                                            onClick={() => {
                                                                router.push({
                                                                    pathname: '/contactus',
                                                                    query: { token: authToken }
                                                                })
                                                            }}
                                                            className={classNames(
                                                                index == 4 ? 'text-white bg-indigo-700' : 'text-black bg-white hover:bg-indigo-100',
                                                                "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                                            )}
                                                        >
                                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 4 ? 'white' : 'black'}>
                                                                <g>
                                                                    <path
                                                                        d="M 19.75 14.725 L 19.75 18.6 C 19.751 18.878 19.646 19.147 19.457 19.351 C 19.267 19.555 19.008 19.68 18.73 19.7 C 18.251 19.733 17.859 19.75 17.556 19.75 C 14.474 19.75 11.447 18.939 8.778 17.398 C 6.109 15.858 3.892 13.641 2.352 10.972 C 0.811 8.303 0 5.276 0 2.194 Q 0 1.74 0.05 1.02 C 0.07 0.743 0.194 0.484 0.397 0.295 C 0.6 0.106 0.868 0.001 1.145 0 L 5.025 0 C 5.161 0 5.292 0.051 5.393 0.142 C 5.494 0.233 5.557 0.359 5.571 0.494 C 5.596 0.746 5.619 0.947 5.641 1.1 C 5.859 2.622 6.306 4.102 6.966 5.49 C 7.017 5.596 7.028 5.717 6.999 5.83 C 6.969 5.944 6.901 6.044 6.805 6.112 L 4.438 7.8 C 5.885 11.172 8.575 13.862 11.947 15.309 L 13.637 12.946 C 13.706 12.849 13.807 12.78 13.922 12.75 C 14.037 12.721 14.159 12.732 14.266 12.783 C 15.654 13.442 17.134 13.888 18.655 14.105 C 18.808 14.127 19.008 14.151 19.255 14.175 C 19.39 14.189 19.515 14.252 19.606 14.353 C 19.698 14.454 19.748 14.585 19.748 14.721 Z"
                                                                        stroke-width="1" />
                                                                </g>
                                                            </svg>
                                                            Contact Us
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                index == 5 ? 'text-white bg-indigo-700' : 'text-black bg-white hover:bg-indigo-100',
                                                                "font-medium text-sm p-2 rounded-md items-center flex duration-500"
                                                            )}
                                                            onClick={() => {
                                                                router.push({
                                                                    pathname: '/privacy_policy',
                                                                    query: { token: authToken }
                                                                })
                                                            }}
                                                        >
                                                            <svg className="mr-4" viewBox="0 0 24 24" width="20" height="20" fill={index == 5 ? 'white' : 'black'}>
                                                                <g>
                                                                    <path
                                                                        d="M 22 10 L 12 10 L 12 17.382 C 11.999 18.073 12.151 18.756 12.445 19.381 C 12.739 20.007 13.168 20.56 13.7 21 L 3 21 C 2.735 21 2.48 20.895 2.293 20.707 C 2.105 20.52 2 20.265 2 20 L 2 4 C 2 3.735 2.105 3.48 2.293 3.293 C 2.48 3.105 2.735 3 3 3 L 10.414 3 L 12.414 5 L 21 5 C 21.265 5 21.52 5.105 21.707 5.293 C 21.895 5.48 22 5.735 22 6 Z M 14 12 L 22 12 L 22 17.382 C 22 17.823 21.892 18.257 21.685 18.645 C 21.478 19.034 21.179 19.366 20.813 19.612 L 18 21.5 L 15.187 19.615 C 14.821 19.369 14.521 19.037 14.314 18.647 C 14.107 18.258 13.999 17.824 14 17.383 Z"
                                                                        stroke-width="1" />
                                                                </g>
                                                            </svg>
                                                            Privacy Policy
                                                        </a>
                                                    </div>
                                                    <h2 id="applicant-information-title" className="mt-8 text-base font-medium text-gray-900 rounded w-full">
                                                        Follow Us on
                                                    </h2>
                                                    <div className="flex">
                                                        <a href="#">
                                                            <svg
                                                                className="w-7 h-7 mt-2"
                                                                viewBox="0 0 43 43">
                                                                <path
                                                                    id="path"
                                                                    d="M 21.654 0 C 15.913 0 10.402 2.3 6.342 6.389 C 2.283 10.478 0 16.029 0 21.812 C 0 27.595 2.283 33.146 6.342 37.235 C 10.402 41.324 15.913 43.624 21.654 43.624 C 27.395 43.624 32.906 41.324 36.966 37.235 C 41.025 33.146 43.308 27.595 43.308 21.812 C 43.308 16.029 41.025 10.478 36.966 6.389 C 32.906 2.3 27.395 0 21.654 0 Z"
                                                                    fill="#9a9a9a"
                                                                    stroke-width="1" />
                                                                <path
                                                                    id="path_1"
                                                                    d="M 26.742 21.79 L 23.459 21.79 L 23.459 33.906 L 18.485 33.906 L 18.485 21.79 L 16.119 21.79 L 16.119 17.532 L 18.485 17.532 L 18.485 14.776 C 18.485 12.806 19.414 9.72 23.504 9.72 L 27.189 9.736 L 27.189 13.869 L 24.515 13.869 C 24.315 13.859 24.116 13.909 23.944 14.012 C 23.772 14.115 23.634 14.267 23.548 14.448 C 23.462 14.629 23.431 14.832 23.46 15.03 L 23.46 17.536 L 27.177 17.536 Z"
                                                                    fill="#ffffff"
                                                                    stroke-width="1" />
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                className="w-7 h-7 mt-2 ml-2"
                                                                viewBox="0 0 44 43">
                                                                <path
                                                                    id="path"
                                                                    d="M 22 0 C 16.167 0 10.568 2.267 6.444 6.297 C 2.319 10.328 0 15.8 0 21.5 C 0 27.2 2.319 32.672 6.444 36.703 C 10.568 40.733 16.167 43 22 43 C 27.833 43 33.432 40.733 37.556 36.703 C 41.681 32.672 44 27.2 44 21.5 C 44 15.8 41.681 10.328 37.556 6.297 C 33.432 2.267 27.833 0 22 0 Z"
                                                                    fill="#9a9a9a"
                                                                    stroke-width="1" />
                                                                <path
                                                                    id="path_1"
                                                                    d="M 34.023 14.356 C 33.14 14.739 32.206 14.992 31.25 15.108 C 32.258 14.506 33.014 13.558 33.377 12.441 C 32.429 13.005 31.391 13.402 30.309 13.615 C 29.586 12.829 28.622 12.306 27.569 12.128 C 26.517 11.949 25.434 12.126 24.492 12.63 C 23.551 13.133 22.803 13.936 22.367 14.91 C 21.932 15.885 21.832 16.978 22.084 18.015 C 20.168 17.918 18.294 17.419 16.584 16.551 C 14.874 15.683 13.365 14.464 12.156 12.975 C 11.732 13.715 11.509 14.554 11.51 15.407 C 11.508 16.199 11.703 16.98 12.076 17.679 C 12.449 18.378 12.989 18.974 13.648 19.414 C 12.882 19.393 12.132 19.187 11.463 18.814 L 11.463 18.873 C 11.469 19.983 11.858 21.058 12.564 21.914 C 13.27 22.77 14.251 23.356 15.34 23.573 C 14.921 23.701 14.486 23.768 14.048 23.773 C 13.746 23.769 13.445 23.742 13.148 23.691 C 13.458 24.646 14.058 25.481 14.865 26.079 C 15.671 26.677 16.644 27.009 17.648 27.028 C 15.953 28.362 13.86 29.09 11.703 29.096 C 11.308 29.094 10.914 29.067 10.523 29.015 C 12.725 30.437 15.292 31.192 17.913 31.189 C 20.331 31.214 22.712 30.595 24.811 29.395 C 26.91 28.196 28.653 26.458 29.858 24.363 C 31.064 22.267 31.69 19.888 31.672 17.47 L 31.672 16.847 C 32.594 16.16 33.39 15.317 34.023 14.356 Z"
                                                                    fill="#ffffff"
                                                                    stroke-width="1" />
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                className="w-7 h-7 mt-2 ml-2"
                                                                viewBox="0 0 44 43">
                                                                <path
                                                                    id="path"
                                                                    d="M 22 0 C 16.167 0 10.568 2.267 6.444 6.297 C 2.319 10.328 0 15.8 0 21.5 C 0 27.2 2.319 32.672 6.444 36.703 C 10.568 40.733 16.167 43 22 43 C 27.833 43 33.432 40.733 37.556 36.703 C 41.681 32.672 44 27.2 44 21.5 C 44 15.8 41.681 10.328 37.556 6.297 C 33.432 2.267 27.833 0 22 0 Z"
                                                                    fill="#9a9a9a"
                                                                    stroke-width="1" />
                                                                <path
                                                                    id="path_1"
                                                                    d="M 27.86 14.369 C 27.507 14.369 27.168 14.509 26.918 14.759 C 26.668 15.009 26.528 15.348 26.528 15.701 C 26.528 16.054 26.668 16.393 26.918 16.643 C 27.168 16.893 27.507 17.033 27.86 17.033 C 28.213 17.033 28.552 16.893 28.802 16.643 C 29.052 16.393 29.192 16.054 29.192 15.701 C 29.192 15.348 29.052 15.009 28.802 14.759 C 28.552 14.509 28.213 14.369 27.86 14.369 Z M 32.965 17.055 C 32.944 16.133 32.772 15.221 32.455 14.355 C 32.173 13.615 31.734 12.945 31.168 12.391 C 30.619 11.822 29.947 11.386 29.204 11.115 C 28.34 10.788 27.427 10.612 26.504 10.593 C 25.33 10.529 24.953 10.529 21.936 10.529 C 18.919 10.529 18.536 10.529 17.364 10.596 C 16.441 10.615 15.528 10.791 14.664 11.118 C 13.922 11.391 13.251 11.827 12.7 12.393 C 12.131 12.943 11.695 13.615 11.424 14.358 C 11.097 15.222 10.921 16.135 10.902 17.058 C 10.836 18.229 10.836 18.608 10.836 21.629 C 10.836 24.65 10.836 25.029 10.903 26.201 C 10.922 27.124 11.098 28.037 11.425 28.901 C 11.696 29.644 12.132 30.316 12.701 30.865 C 13.252 31.431 13.923 31.867 14.665 32.141 C 15.529 32.468 16.442 32.644 17.365 32.663 C 18.541 32.73 18.919 32.73 21.937 32.73 C 24.955 32.73 25.337 32.73 26.509 32.663 C 27.432 32.644 28.345 32.468 29.209 32.141 C 29.952 31.87 30.624 31.434 31.173 30.865 C 31.741 30.313 32.181 29.642 32.46 28.901 C 32.777 28.035 32.949 27.123 32.97 26.201 C 32.97 25.025 33.037 24.647 33.037 21.629 C 33.037 18.611 33.036 18.229 32.965 17.055 Z M 30.965 26.067 C 30.957 26.771 30.83 27.469 30.588 28.131 C 30.411 28.614 30.126 29.05 29.756 29.407 C 29.396 29.774 28.961 30.058 28.48 30.239 C 27.818 30.481 27.12 30.608 26.416 30.616 C 25.306 30.671 24.896 30.683 21.977 30.683 C 19.058 30.683 18.648 30.683 17.538 30.616 C 16.807 30.63 16.078 30.517 15.385 30.283 C 14.925 30.092 14.51 29.809 14.164 29.451 C 13.796 29.095 13.515 28.658 13.343 28.175 C 13.072 27.504 12.922 26.79 12.899 26.066 C 12.899 24.956 12.832 24.546 12.832 21.627 C 12.832 18.708 12.832 18.298 12.899 17.188 C 12.904 16.468 13.036 15.754 13.289 15.079 C 13.484 14.61 13.784 14.193 14.166 13.858 C 14.503 13.477 14.919 13.174 15.386 12.971 C 16.063 12.727 16.776 12.599 17.495 12.594 C 18.605 12.593 19.015 12.529 21.936 12.529 C 24.857 12.529 25.265 12.529 26.375 12.596 C 27.079 12.604 27.777 12.731 28.439 12.973 C 28.943 13.16 29.396 13.465 29.76 13.861 C 30.123 14.202 30.408 14.619 30.592 15.082 C 30.839 15.758 30.966 16.472 30.969 17.191 C 31.024 18.301 31.036 18.711 31.036 21.63 C 31.036 24.549 31.023 24.957 30.968 26.066 Z M 21.936 15.929 C 20.43 15.935 18.987 16.539 17.926 17.607 C 16.866 18.676 16.272 20.123 16.276 21.629 C 16.281 23.134 16.884 24.578 17.951 25.64 C 19.019 26.701 20.466 27.296 21.971 27.293 C 23.477 27.29 24.921 26.688 25.984 25.621 C 27.046 24.555 27.643 23.108 27.64 21.603 C 27.638 20.097 27.038 18.652 25.972 17.589 C 25.442 17.06 24.812 16.642 24.119 16.357 C 23.427 16.072 22.685 15.927 21.936 15.929 Z M 21.936 25.318 C 20.955 25.318 20.013 24.928 19.32 24.234 C 18.626 23.541 18.236 22.599 18.236 21.618 C 18.236 20.637 18.626 19.695 19.32 19.002 C 20.013 18.308 20.955 17.918 21.936 17.918 C 22.917 17.918 23.859 18.308 24.552 19.002 C 25.246 19.695 25.636 20.637 25.636 21.618 C 25.636 22.599 25.246 23.541 24.552 24.234 C 23.859 24.928 22.917 25.318 21.936 25.318 Z"
                                                                    fill="#ffffff"
                                                                    stroke-width="1" />
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                className="w-7 h-7 mt-2 ml-2"
                                                                viewBox="0 0 43 43">
                                                                <path
                                                                    id="path"
                                                                    d="M 21.5 0 C 15.8 0 10.328 2.267 6.297 6.297 C 2.267 10.328 0 15.8 0 21.5 C 0 27.2 2.267 32.672 6.297 36.703 C 10.328 40.733 15.8 43 21.5 43 C 27.2 43 32.672 40.733 36.703 36.703 C 40.733 32.672 43 27.2 43 21.5 C 43 15.8 40.733 10.328 36.703 6.297 C 32.672 2.267 27.2 0 21.5 0 Z"
                                                                    fill="#9a9a9a"
                                                                    stroke-width="1" />
                                                                <path
                                                                    id="path_1"
                                                                    d="M 30.56 11.025 L 12.6 11.025 C 12.33 11.021 12.064 11.089 11.829 11.22 C 11.593 11.352 11.396 11.543 11.258 11.775 C 11.12 12.007 11.046 12.271 11.042 12.541 L 11.042 30.713 C 11.049 31.12 11.216 31.508 11.508 31.791 C 11.8 32.074 12.193 32.231 12.6 32.225 L 30.56 32.225 C 30.83 32.229 31.096 32.161 31.331 32.03 C 31.567 31.898 31.764 31.707 31.902 31.475 C 32.04 31.243 32.114 30.979 32.118 30.709 L 32.118 12.541 C 32.114 12.271 32.04 12.007 31.902 11.775 C 31.764 11.543 31.567 11.352 31.331 11.22 C 31.096 11.089 30.83 11.021 30.56 11.025 Z M 17.435 28.772 L 14.254 28.772 L 14.254 19.231 L 17.435 19.231 Z M 15.845 17.895 C 15.407 17.895 14.986 17.721 14.675 17.411 C 14.365 17.1 14.191 16.679 14.191 16.241 C 14.191 15.803 14.365 15.382 14.675 15.071 C 14.986 14.761 15.407 14.587 15.845 14.587 C 16.219 14.546 16.596 14.633 16.915 14.833 C 17.233 15.034 17.474 15.337 17.598 15.692 C 17.722 16.047 17.722 16.435 17.598 16.79 C 17.474 17.145 17.233 17.448 16.915 17.649 C 16.596 17.849 16.219 17.936 15.845 17.895 Z M 28.906 28.772 L 25.726 28.772 L 25.726 23.652 C 25.726 22.369 25.27 21.532 24.115 21.532 C 23.757 21.534 23.409 21.647 23.117 21.853 C 22.825 22.06 22.603 22.351 22.482 22.687 C 22.399 22.936 22.363 23.199 22.376 23.461 L 22.376 28.761 L 19.195 28.761 L 19.195 19.225 L 22.376 19.225 L 22.376 20.571 C 22.665 20.07 23.085 19.657 23.591 19.377 C 24.098 19.096 24.671 18.96 25.249 18.981 C 27.369 18.981 28.907 20.349 28.907 23.281 Z"
                                                                    fill="#ffffff"
                                                                    stroke-width="1" />
                                                            </svg>
                                                        </a>

                                                        <a href="#">
                                                            <svg
                                                                className="w-7 h-7 mt-2 ml-2"
                                                                viewBox="0 0 43 43">
                                                                <path
                                                                    id="path"
                                                                    d="M 21.5 0 C 15.8 0 10.328 2.267 6.297 6.297 C 2.267 10.328 0 15.8 0 21.5 C 0 27.2 2.267 32.672 6.297 36.703 C 10.328 40.733 15.8 43 21.5 43 C 27.2 43 32.672 40.733 36.703 36.703 C 40.733 32.672 43 27.2 43 21.5 C 43 15.8 40.733 10.328 36.703 6.297 C 32.672 2.267 27.2 0 21.5 0 Z"
                                                                    fill="#9a9a9a"
                                                                    stroke-width="1" />
                                                                <path
                                                                    id="path_1"
                                                                    d="M 32.085 15.659 C 32.429 17.63 32.596 19.627 32.585 21.627 C 32.596 23.627 32.429 25.624 32.085 27.595 C 31.957 28.112 31.696 28.587 31.327 28.971 C 30.959 29.356 30.496 29.638 29.985 29.788 C 28.131 30.304 21.736 30.304 21.736 30.304 C 21.736 30.304 15.344 30.304 13.487 29.788 C 12.976 29.638 12.513 29.356 12.145 28.971 C 11.776 28.587 11.515 28.112 11.387 27.595 C 11.043 25.625 10.875 23.627 10.885 21.627 C 10.874 19.627 11.041 17.63 11.385 15.659 C 11.513 15.142 11.774 14.667 12.142 14.282 C 12.511 13.897 12.974 13.615 13.485 13.465 C 15.34 12.949 21.732 12.949 21.732 12.949 C 21.732 12.949 28.132 12.949 29.981 13.465 C 30.493 13.615 30.957 13.896 31.326 14.281 C 31.695 14.666 31.957 15.141 32.085 15.659 Z M 19.563 25.424 L 26.071 21.624 L 19.563 17.824 Z"
                                                                    fill="#ffffff"
                                                                    stroke-width="1" />
                                                            </svg>
                                                        </a>
                                                    </div>

                                                    <img src="/img/setting-footer.png" className="rounded w-full mt-4" />
                                                </div>

                                            </section>

                                        </div>

                                        <section aria-labelledby="timeline-title" className="lg:col-start-2 lg:col-span-2">
                                            <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                                                <h2 id="applicant-information-title" className="text-base font-bold text-gray-900 rounded w-full">
                                                    Privacy Policy
                                                </h2>
                                                <p className="mt-2 text-sm">“The mission of Lifology is to empower each parent in India to lead children to the right education, career and future where they enjoy happiness, financial security, fulfilment and purpose. Precisely, we partner parents in India to be the most trusted advisors of their teenage kids in deciding higher education and career”.</p>
                                                <p className="mt-2 text-sm">Only a few children — under 5 percent — are on the right track as they pursue higher education. Despite extensive support in the way of career counsellors in most schools, a vast majority of the students make the wrong career choice after high- school. This snowballs into underperformed in University academics and leads to a life of stress, unhappiness, and a lack of fulfilment and purpose. As they lose confidence, rising technology takes over their jobs. Their dreams lose life, before they ever got the chance to begin. </p>
                                                <p className="mt-2 text-sm">21st century is the most vibrant and fastest period in the history of mankind. Massive changes happening in the technology sphere is revolutionising every aspect of life. Children need strong, informed and learned support to make the right decisions about education and career. Research proves, 76% of children are influenced by parents when it comes to education, career and many other important decisions relating to their future. We decide to transform every parent in India to a real ‘Guru’, who influence children to take the most appropriate decisions.</p>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center front-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
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
    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    const profileClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
            // console.log(networkErr);
        });
    return {
        props: { profile }
    }
}


