import { Fragment, useState } from 'react'
import {
    DotsVerticalIcon,
    SearchIcon,
    ArrowRightIcon
} from '@heroicons/react/solid'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { queryGraph } from '../../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile, SchemeGetVideos } from '../../helpers/GraphQLSchemes'
import Constants from '../../helpers/Constants.js'
import useLocalStorage from '../../helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
}

const headerSlide = [
    {
        id: 1,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open 1"
    },
    {
        id: 2,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open 2"
    },

    {
        id: 3,
        image: "/img/test.png",
        title: "Cancan, The Internet Computer’s ‘Decentralized Tiktok,’ Is Now Open 3"
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function CareerVideo({ videoCats, profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    return (
        <>
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Career Videos" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4" >

                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                        <div className="flex-1 flex">
                                            <div className="sm:flex h-full w-full p-4">

                                                <div className="w-full">
                                                    <form className="w-full flex md:ml-0" action="#" method="GET">
                                                        <label htmlFor="search_field" className="sr-only">
                                                            Search
                                                        </label>
                                                        <div className="relative w-full text-gray-400 focus-within:text-gray-600 rounded bg-gray-100">
                                                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
                                                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                            </div>
                                                            <input
                                                                id="search_field"
                                                                name="search_field"
                                                                className="block w-full h-full pl-12 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm bg-transparent"
                                                                placeholder="Search Any Videos"
                                                                type="search"
                                                            />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <Carousel
                                        swipeable={false}
                                        draggable={false}
                                        responsive={{
                                            desktop: {
                                                breakpoint: { max: 3000, min: 1024 },
                                                items: 1,
                                                slidesToSlide: 1 // optional, default to 1.
                                            },
                                            tablet: {
                                                breakpoint: { max: 1024, min: 464 },
                                                items: 1,
                                                slidesToSlide: 1// optional, default to 1.
                                            },
                                            mobile: {
                                                breakpoint: { max: 464, min: 0 },
                                                items: 1,
                                                slidesToSlide: 1 // optional, default to 1.
                                            }
                                        }}
                                        ssr={true}
                                        infinite={false}
                                        autoPlaySpeed={1000}
                                        keyBoardControl={true}
                                        customTransition="all .5"
                                        transitionDuration={500}
                                        containerClass="carousel-container"
                                        removeArrowOnDeviceType={["tablet", "mobile"]}
                                        dotListClass="custom-dot-list-style"
                                        itemClass="carousel-item-padding-40-px"
                                    >
                                        {headerSlide.map((card) => (
                                            <div key={card.id} className="m-px">
                                                <div className="mt-4 py-4 px-4 align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-indigo-700">
                                                    <div className="sm:flex">
                                                        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                                            <img src={card.image} className="rounded " />
                                                        </div>
                                                        <div className="self-center">
                                                            <h4 className="text-lg font-bold text-white">{card.title}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </Carousel>

                                    {videoCats.map((videoCat) => (
                                        <div className="mt-4 py-4 px-2 align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg 0-4 bg-white">
                                            <div className="mt-1 grid grid-cols-2 gap-2">
                                                <div className="text-black pb-2 mx-2 block text-base font-bold">
                                                    {videoCat.name}
                                                </div>

                                                <div className="text-sm text-right text-indigo-700 mx-2 ">
                                                    View All
                                                </div>
                                            </div>
                                            <div className="flex flex-col mt-2">
                                                <Carousel
                                                    // customLeftArrow={<CustomLeftArrow />}
                                                    // customRightArrow={<CustomRightArrow />}
                                                    // renderButtonGroupOutside={true}
                                                    // customButtonGroup={<ButtonGroup />}
                                                    // arrows={false}

                                                    swipeable={false}
                                                    draggable={false}
                                                    responsive={responsive}
                                                    ssr={true} // means to render carousel on server-side.
                                                    infinite={false}
                                                    autoPlaySpeed={1000}
                                                    keyBoardControl={true}
                                                    customTransition="all .5"
                                                    transitionDuration={500}
                                                    containerClass="carousel-container"
                                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                                    dotListClass="custom-dot-list-style"
                                                    itemClass="carousel-item-padding-40-px"
                                                >
                                                    {videoCat.videos.map((card) => (
                                                        <a key={card.id} href="#" onClick={() => {
                                                            router.push({
                                                                pathname: 'career_video/career_video_detail',
                                                                query: { token: authToken }
                                                            })
                                                        }}>
                                                            <div className="relative shadow mx-2 rounded m-1" style={{}}>
                                                                <div>
                                                                    <img className=" rounded" src={card.thumbnail} />
                                                                    <div className="flex-1 flex items-center justify-between truncate">
                                                                        <div className="flex-1 px-4 py-2 text-sm truncate">
                                                                            <a href="#" className="mt-2 text-gray-900 font-medium hover:text-gray-600">
                                                                                {card.title}
                                                                            </a>
                                                                            <div className="text-gray-500 mt-2 w-full overflow-hidden">{card.description}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <Menu as="div" className="absolute top-0 right-0 flex-shrink-0">
                                                                    {({ open }) => (
                                                                        <>
                                                                            <Menu.Button className="inline-flex items-center justify-center text-white focus:outline-none hover:bg-white hover:bg-opacity-30 rounded-full p-2 duration-500">
                                                                                <span className="sr-only">Open options</span>
                                                                                <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                                                                            </Menu.Button>
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
                                                                                    className="z-10 mx-1 origin-top-right absolute right-8 top-4 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                                                                                >
                                                                                    <div className="py-1">
                                                                                        <Menu.Item>
                                                                                            {({ active }) => (
                                                                                                <a
                                                                                                    href="#"
                                                                                                    className={classNames(
                                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                        'block px-4 py-2 text-sm'
                                                                                                    )}
                                                                                                >
                                                                                                    View
                                                                                                </a>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                    </div>
                                                                                    <div className="py-1">
                                                                                        <Menu.Item>
                                                                                            {({ active }) => (
                                                                                                <a
                                                                                                    href="#"
                                                                                                    className={classNames(
                                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                        'block px-4 py-2 text-sm'
                                                                                                    )}
                                                                                                >
                                                                                                    Removed from pinned
                                                                                                </a>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                        <Menu.Item>
                                                                                            {({ active }) => (
                                                                                                <a
                                                                                                    href="#"
                                                                                                    className={classNames(
                                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                        'block px-4 py-2 text-sm'
                                                                                                    )}
                                                                                                >
                                                                                                    Share
                                                                                                </a>
                                                                                            )}
                                                                                        </Menu.Item>
                                                                                    </div>
                                                                                </Menu.Items>
                                                                            </Transition>
                                                                        </>
                                                                    )}
                                                                </Menu>
                                                            </div>
                                                        </a>
                                                    ))}

                                                </Carousel>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center font-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
                    </main>
                </div>


            </div >
        </>
    )
}

function CustomRightArrow({ handleClick }) {
    return (
        <button
            className="absolute right-0 bg-black rounded-full p-2"
            style={{ top: '31.5% !important' }}
            onClick={handleClick}>
            <ArrowRightIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </ button>
        // <button
        //     onClick={handleClick}
        //     aria-label="Go to next slide"
        //     className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
        // />
    );
}

function CustomLeftArrow({ handleClick }) {

    return (
        <button
            onClick={handleClick}
            aria-label="Go to previous slide"
            className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
        />
    );
}

const ButtonGroup = ({ next, previous }) => {
    return (
        <div className="carousel-button-group">
            <CustomLeftArrow
                handleClick={() => previous()}
            />
            <CustomRightArrow handleClick={() => next()} />
        </div>
    );
}

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
    const videosClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const videoCats = await queryGraph(videosClient, {}, SchemeGetVideos)
        .then((res) => {
            return res.videos;
        }).catch((networkErr) => {
            return [];
        });
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
        });
    return {
        props: { videoCats, profile }
    }
}


