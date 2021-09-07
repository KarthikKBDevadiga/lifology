import cookies from 'next-cookies';
import React, { useState, useEffect } from 'react';

import Breadcrumbs from '/components/Breadcrumbs';
import MetaLayout from '/components/MetaLayout';
import HeaderLayout from '/components/HeaderLayout';
import NavigationLayout from '/components/NavigationLayout';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from '/helpers/Constants';
import { queryGraph } from '/helpers/GraphQLCaller';
import { SchemeGetProfile, SchemeGetHomeData } from '/helpers/GraphQLSchemes';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Link from 'next/link';
import { SchemeGetCoachesList, SchemeVlOption, SchemeVlSlide2Option, SchemeVlSlide3Option } from '../helpers/GraphQLSchemes';
import { useRouter } from 'next/router';

import ProgressBar from '/components/ProgressBar'
import PhoneNumberDialog from '/components/dialog/PhoneNumberDialog'

const breakpoints = {
  "(min-width: 464px)": {
    slidesPerView: 1,
  },
  "(min-width: 768px)": {
    slidesPerView: 2,
  },
  "(min-width: 1200px)": {
    slidesPerView: 4,
  },
};

const pages = [
  {
    name: 'Dashboard', href: '/', current: true,
  },
];

export default function Home({ profile, home, coaches, slide2Options, token }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [masterClassSliderRef, masterClassSlider] = useKeenSlider({
    // breakpoints: { ...breakpoints, "(min-width: 1200px)": { slidesPerView: 2.5 }, },
    breakpoints,
  })
  const [assessmentSliderRef, assessmentSlider] = useKeenSlider({
    breakpoints,
  })
  const [articlesSliderRef, articlesSlider] = useKeenSlider({
    breakpoints,
  })
  const [universitySliderRef, universitySlider] = useKeenSlider({
    breakpoints,
  })

  const [videosSliderRef, videosSlider] = useKeenSlider({
    breakpoints: {
      "(min-width: 464px)": {
        slidesPerView: 1,
      },
      "(min-width: 768px)": {
        slidesPerView: 2,
      },
      "(min-width: 1200px)": {
        slidesPerView: 3,
      },
    }
  })

  const [coachSliderRef, coachSlider] = useKeenSlider({
    breakpoints,
  })

  const [loadingLiveTile, setLoadingLiveTile] = useState(true)
  const [liveTileNo, setLiveTileNo] = useState(1)

  const [sectionId, setSectionId] = useState(-1)
  const [options, setOptions] = useState({})
  const [questionId, setQuestionId] = useState(-1)
  const [answerId, setAnswerId] = useState(-1)
  const [phoneNumberDialog, setPhoneNumberDialog] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(true)

  const loadOptions = (id) => {
    setLoadingLiveTile(true)
    setSectionId(id)
    const dashboardClient = new ApolloClient({
      uri: Constants.baseUrl + "/api/dashboard",
      cache: new InMemoryCache(),
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    queryGraph(dashboardClient, { section_id: id }, SchemeVlOption)
      .then((res) => {
        console.log(res.vl_options)
        setOptions(res.vl_options)
        setLiveTileNo(3)
        setLoadingLiveTile(false)
      }).catch((networkErr) => {
        console.log(networkErr)
      })
  }

  const answer = (answerId) => {
    setLoadingLiveTile(true)
    setAnswerId(answerId)
    setQuestionId(options.id)
    const dashboardClient = new ApolloClient({
      uri: Constants.baseUrl + "/api/dashboard",
      cache: new InMemoryCache(),
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    queryGraph(dashboardClient, {
      section_id: sectionId,
      question_id: options.id,
      option_id: answerId
    }, SchemeVlSlide3Option)
      .then((res) => {
        console.log(res.vl_options)
        const data = res.vl_options
        if (data.is_api_required) {
          if (data.cta == 'MyChild') {
            router.push({
              pathname: '/my_child',
            })
          } else if (data.cta == 'AllUniversitiesHome') {
            router.push({
              pathname: '/career_explorer/course_and_university',
            })
          } else if (data.cta == 'JobFamilies_CareerPools') {
            router.push({
              pathname: '/career_explorer/job_families',
            })
          } else if (data.cta == 'Coaches') {
            router.push({
              pathname: '/coaching/coach/list',
            })
          } else if (data.cta == 'PurchasedPackages') {
            router.push({
              pathname: '/coaching',
            })
          } else if (data.cta == 'APPOUT_DIALER') {
            console.log(data.options[0].title)
            setPhoneNumberDialog(true)
            setPhoneNumber(data.options[0].title)
          }
        } else {
          setLoadingLiveTile(false)
          setOptions(data)
        }
      }).catch((networkErr) => {
        console.log(networkErr)
      })
  }

  

  return (

    <>
      <div className="flex flex-col min-h-screen">
        <MetaLayout title={'Dashboard'} description={'Home Page'} />
        <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
          <NavigationLayout index="1" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          <div className="flex-1 overflow-auto focus:outline-none">
            <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={'Dashboard'} />
            <main className="flex-1 relative z-0 overflow-y-auto">
              <Breadcrumbs pages={pages} />
              <div className="flex px-4 justify-center">
                <div className="mb-4 max-w-3xl w-full grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

                  <div className='space-y-4 lg:col-start-1 lg:col-span-2'>
                    {/* STAT CARDS START */}
                    <div className='sm:flex bg-white shadow rounded-lg p-4 min-w-full'>
                      <div className='bg-blue-100 p-3 mb-4 sm:mb-0 sm:ml-1 sm:mr-2 sm:w-1/3 w-full rounded-md'>
                        <div>
                          <div className='flex items-center'>
                            <img src={'/img/play.svg'} className='mr-3' />
                            Total Videos Watched
                          </div>
                          <div className='mt-3'>
                            <span className='font-bold text-3xl mr-2'>{home?.watch_videos?.length}</span>
                            <span>Videos</span>
                          </div>
                        </div>
                      </div>
                      <div className='bg-green-50 p-3 my-4 sm:my-0 sm:mx-2 sm:w-1/3 w-full rounded-md'>
                        <div>
                          <div className='flex items-center'>
                            <img src={'/img/assesment.svg'} className='mr-3' />
                            Total Assessment
                          </div>
                          <div className='mt-3'>
                            <span className='font-bold text-3xl mr-2'>{home.completed_assessment}</span>
                            <span>Assessment</span>
                          </div>
                        </div>
                      </div>
                      <div className='bg-yellow-100 p-3 mt-4 sm:mt-0 sm:ml-2 sm:mr-1 sm:w-1/3 w-full rounded-md'>
                        <div>
                          <div className='flex items-center'>
                            <img src={'/img/play.svg'} className='mr-3' />
                            Total Articles Read
                          </div>
                          <div className='mt-3'>
                            <span className='font-bold text-3xl mr-2'>{home?.articles?.length}</span>
                            <span>Articles</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* STAT CARDS END */}

                    {/* LIFOLOGY MASTER START */}
                    {
                      home.master_class_videos?.length > 0 ?
                        <div className='bg-white shadow rounded-lg min-w-full'>
                          <div className='flex justify-between'>
                            <div className='font-bold text-base px-4 pt-4'>Watch Lifology Master Class</div>
                          </div>
                          <div className='relative flex items-center'>
                            <a
                              onClick={(event) => {
                                masterClassSlider.prev()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </div>
                            </a>
                            <a
                              onClick={(event) => {
                                masterClassSlider.next()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </a>
                            <div className='navigation-wrapper keen-slider' ref={masterClassSliderRef}>
                              {home.master_class_videos?.map(video => (
                                <div key={video.id} className='keen-slider__slide rounded-lg'>
                                  <Link href={`/career_explorer/career_video/${video.id}`}>
                                    <a href={`/career_explorer/career_video/${video.id}`}>
                                      <div className='my-4 mx-2 p-4 group relative rounded-lg bg-white shadow hover:shadow-xl hover:scale-105 duration-200'>
                                        <div className='h-3/4 relative'>
                                          <img src={video.thumbnail} className='h-full w-full rounded-lg' />
                                          <img src='/img/play-yellow.svg' className='absolute h-6 w-6 -bottom-4 -right-3' />
                                        </div>
                                        <div className='pt-3'>
                                          <div className='text-xs text-gray-400'>Author</div>
                                          <div className='font-bold text-sm mt-1'>{video.title}</div>
                                        </div>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        : <></>
                    }
                    {/* LIFOLOGY MASTER END */}

                    {/* ASSESSMENT START */}
                    {
                      home.assessment?.length > 0 ?
                        <div className='bg-white shadow rounded-lg  min-w-full'>
                          <div
                            className="relative w-full rounded px-4 pt-4 text-left sm:text-sm"
                          >
                            <span className="font-bold block truncate text-base">Assessment</span>
                            <span className="absolute inset-y-0 right-0 top-0 flex items-center pl-2 pr-2 pt-4">
                              <div className="text-sm font-medium"
                              >
                                {home.percentage_completed}%
                              </div>
                              <div className="text-xs  ml-1">
                                completed
                              </div>
                              <div className="h-2 w-36 bg-lgrey-border rounded-full ml-4">
                                <div className="bg-lblue h-full rounded-full" style={{
                                  width: home.percentage_completed + '%'
                                }}></div>
                              </div>
                              <div className="mx-4 text-sm font-medium">{home.completed_assessment}/8</div>

                            </span>
                          </div>

                          <div className='relative flex items-center'>
                            <a
                              onClick={(event) => {
                                assessmentSlider.prev()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </div>
                            </a>
                            <a
                              onClick={(event) => {
                                assessmentSlider.next()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </a>
                            <div className='navigation-wrapper keen-slider' ref={assessmentSliderRef}>
                              {home.assessment?.map(assessment => (
                                <div key={assessment.id} className='keen-slider__slide rounded-lg'>
                                  <Link href={
                                    assessment.assessment_type == 3 ? assessment.id == 9 ? '/my_child/' + assessment.id + '/report/la' : '/my_child/' + assessment.id + '/report/figment' : assessment.total_questions > 0 ? "/my_child/" + assessment.id + '/assessment_instructions' : "/my_child/" + assessment.id + '/report/' + assessment.title.toLowerCase()
                                  }>
                                    <a>
                                      <div key={assessment.name} className="my-4 mx-2 group relative bg-white overflow-hidden shadow hover:shadow-xl hover:scale-105 active:scale-100 active:shadow-sm rounded bg-cover duration-500 h-48"

                                      >
                                        <img src={assessment.dash_cards_image ? assessment.dash_cards_image : 'https://cdn.lifology.com/m/dash/card_small_1.jpg'} className="rounded w-full object-cover group-hover:scale-150 group-hover:rotate-12 group-active:rotate-0 group-active:scale-100 duration-500 bg-gray-400 h-48" />
                                        <div className="absolute p-4 top-0 w-full">
                                          <div className="text-white w-9/12 font-medium text-xl ">{assessment.title}</div>
                                          <div className="text-white w-9/12 text-sm mt-2">{assessment.subtitle}</div>
                                          <div className="mt-4 w-0 h-0.5 rounded bg-white group-hover:w-3/4 duration-500"></div>
                                        </div>
                                        <div className="flex absolute bottom-4 right-4 scale-0 group-hover:scale-100 duration-500 translate-x-full group-hover:translate-x-0">
                                          <div className="self-center font-medium text-base text-white">{assessment.assessment_type == 3 ? '' : assessment.total_questions > 0 ? assessment.attempted_questions > 0 ? 'Continue' : 'Start' : 'View Report'}</div>

                                          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="white">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                          </svg>
                                        </div>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        : <></>
                    }
                    {/* ASSESSMENT END */}

                    {/* VIDEOS START */}
                    {
                      home.watch_videos?.length > 0 ?
                        <div className='bg-white shadow rounded-lg  min-w-full'>
                          <div className='flex justify-between'>
                            <div className='font-bold text-base px-4 pt-4'>Recommended Videos</div>
                            <a href='/career_explorer/career_video' className='text-lblue font-medium px-4 pt-4 text-sm'>View All</a>
                          </div>
                          <div className='relative flex items-center'>
                            <a
                              onClick={(event) => {
                                videosSlider.prev()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </div>
                            </a>
                            <a
                              onClick={(event) => {
                                videosSlider.next()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </a>
                            <div className='keen-slider navigation-wrapper' ref={videosSliderRef}>
                              {home.watch_videos?.map(video => (
                                <div key={video.id} className='keen-slider__slide rounded-lg'>
                                  <Link href={`/career_explorer/career_video/${video.id}`}>
                                    <a>
                                      <div className="group relative shadow mx-2 my-4 rounded m-1 hover:shadow-xl hover:scale-105 duration-500" style={{}}>
                                        <div>
                                          <img className="rounded-t group-hover:filter-none duration-500 w-full h-32 object-cover" src={video.thumbnail} />
                                          {/* <img className=" rounded-t " src={card.thumbnail} /> */}
                                          <div className="flex-1 flex items-center justify-between truncate">
                                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                              <div className="mt-2 w-full text-gray-900 font-medium hover:text-gray-600">
                                                {video.title}
                                              </div>
                                              <div className="text-gray-500 mt-2 w-full overflow-hidden">{video.description}</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        : <></>
                    }
                    {/* VIDEOS END */}

                    {/* COURSE+UNI START */}
                    {
                      home.university?.length > 0 ?
                        <div className='bg-white shadow rounded-lg  min-w-full'>
                          <div className='flex justify-between'>
                            <div className='font-bold text-base px-4 pt-4'>Course & University</div>
                            <a href='/career_explorer/course_and_university' className='text-lblue font-medium px-4 pt-4 text-sm'>View All</a>
                          </div>
                          <div className='relative flex items-center'>
                            <a
                              onClick={(event) => {
                                universitySlider.prev()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </div>
                            </a>
                            <a
                              onClick={(event) => {
                                universitySlider.next()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </a>
                            <div className='keen-slider navigation-wrapper' ref={universitySliderRef}>
                              {home.university?.map(uni => (
                                <div key={uni.id} className='keen-slider__slide rounded-lg'>
                                  <Link href={{
                                    pathname: '/career_explorer/course_and_university/' + uni.id,
                                  }}>
                                    <a>
                                      <div className="rounded bg-gray shadow p-3 mx-2 m-4 hover:shadow-lg hover:scale-105 duration-500">
                                        <img className="ml-auto mr-auto h-32 object-contain" src={Constants.baseUrlImage + uni.logo} />
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        : <></>
                    }
                    {/* COURSE+UNI END */}

                    {/* ARTICLES START */}
                    {
                      home.articles?.length > 0 ?
                        <div className='bg-white shadow rounded-lg min-w-full'>
                          <div className='flex justify-between'>
                            <div className='font-bold text-base px-4 pt-4'>Recommended Articles</div>
                            <a href='/career_explorer/magazine' className='text-lblue font-medium text-sm px-4 pt-4'>View All</a>
                          </div>
                          <div className='relative flex items-center'>
                            <a
                              onClick={(event) => {
                                articlesSlider.prev()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </div>
                            </a>
                            <a
                              onClick={(event) => {
                                articlesSlider.next()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </a>
                            <div className='keen-slider navigation-wrapper' ref={articlesSliderRef}>
                              {home.articles?.map(article => (
                                <div key={article.id} className='keen-slider__slide'>
                                  <Link href={`/career_explorer/magazine/${article.id}`}>
                                    <a href={`/career_explorer/magazine/${article.id}`}>
                                      <div className='mx-2 my-4 group relative rounded-lg bg-white shadow hover:shadow-lg hover:scale-105 duration-200'>
                                        <div className='h-1/2'>
                                          <img className='rounded-t-lg h-full' src={article.thumbnail} />
                                        </div>
                                        <div className='font-bold  p-4 text-sm'>
                                          <div>{article.title}</div>
                                        </div>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        : <></>
                    }
                    {/* ARTICLES END */}

                    {/* COACHES START */}
                    {
                      coaches.length > 0 ?
                        <div className='bg-white shadow rounded-lg min-w-full'>
                          <div className='flex justify-between'>
                            <div className='font-bold text-base px-4 pt-4'>Our Coaches</div>
                            <a href='/coaching/coach/list' className='text-lblue font-medium text-sm px-4 pt-4'>View All</a>
                          </div>
                          <div className='relative flex items-center'>
                            <a
                              onClick={(event) => {
                                coachSlider.prev()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </div>
                            </a>
                            <a
                              onClick={(event) => {
                                coachSlider.next()
                              }}>
                              <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </a>
                            <div className='keen-slider navigation-wrapper w-full' ref={coachSliderRef}>
                              {coaches.map(coach => (
                                <div key={coach.id} className='keen-slider__slide'>
                                  <Link href={'/coaching/coach/' + coach.id} key={coach.id}>
                                    <a>
                                      <div className="mx-2 my-4 group relative shadow  rounded m-1 hover:shadow-xl hover:scale-105 duration-500 pt-4" style={{}}>
                                        <div>
                                          <img className="rounded-full duration-500 w-full h-24 w-24 object-cover ml-auto mr-auto" src={coach.profile_image} />
                                          {/* <img className=" rounded-t " src={card.thumbnail} /> */}
                                          <div className="flex-1 flex items-center justify-between truncate">
                                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                              <div className="mt-2 w-full text-gray-900 font-medium text-center">
                                                {coach.name}
                                              </div>
                                              <div className="text-gray-500 mt-1 w-full overflow-hidden text-center text-xs">{coach.coaching_category}</div>
                                              <div className="flex w-min ml-auto mr-auto mt-1 mb-2">
                                                <div className={coach.rating >= 1 ? 'text-lyellow' : 'text-gray-400'}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                  </svg>
                                                </div>
                                                <div className={coach.rating >= 2 ? 'text-lyellow' : 'text-gray-400'}>

                                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                  </svg>
                                                </div>
                                                <div className={coach.rating >= 3 ? 'text-lyellow' : 'text-gray-400'}>

                                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                  </svg>
                                                </div>
                                                <div className={coach.rating >= 4 ? 'text-lyellow' : 'text-gray-400'}>

                                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                  </svg>
                                                </div>
                                                <div className={coach.rating >= 5 ? 'text-lyellow' : 'text-gray-400'}>

                                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                  </svg>
                                                </div>

                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div> : <></>
                    }
                    {/* COACHES END */}

                  </div>

                  <div aria-labelledby="" className="lg:col-start-3 lg:col-span-1">
                    {
                      // loadingLiveTile ?
                      //   <div>
                      //     <ProgressBar />
                      //   </div> :
                      liveTileNo == 1 ?
                        <div className="bg-lblue shadow rounded-lg">
                          <div className="flex-shrink-0 flex items-center px-4 py-4">
                            <img
                              className="h-8 w-auto"
                              src="/img/logoWhite.png"
                              alt="Lifology Logo"
                            />
                            <span className="text-white self-center font-bold pl-4 text-xl tracking-wide">LIFOLOGY</span>
                          </div>
                          <img src="/img/dashboard.png" className="w-9/12 ml-auto mr-auto" />
                          <div className="text-base text-white text-center px-4 pt-4 ">Help me to Decide</div>
                          <div className="text-sm text-white text-center px-4 pt-2">Unable to find a solution? We are here for you.</div>

                          <div
                            onClick={(e) => {
                              setLiveTileNo(2)
                            }}
                            className="cursor-pointer px-6 py-2 bg-lyellow rounded-full w-max text-lblue ml-auto mr-auto mt-4">Get Started</div>
                          <div className="h-4"></div>
                          {/* <img className={'w-full'} src={'/img/dashboard_banner_bg.png'} /> */}
                        </div>
                        : liveTileNo == 2 ?
                          <div className="bg-white shadow rounded-lg">

                            <div
                              className="relative w-full rounded px-4 py-4 text-left sm:text-sm"
                            >
                              <div className="flex-shrink-0 flex items-center">
                                <div className="p-2 rounded-full bg-lblue">
                                  <img
                                    className="h-4 w-auto"
                                    src="/img/logoWhite.png"
                                    alt="Lifology Logo"
                                  />
                                </div>

                                <span className="self-center font-bold pl-4 text-base tracking-wide">Lifology Virtual Assistant</span>
                              </div>
                              <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                <div className="p-1 rounded-full text-black cursor-pointer hover:scale-110 duration-500"
                                  onClick={
                                    (e) => {
                                      setLiveTileNo(1)
                                    }
                                  }
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </div>
                              </span>
                            </div>
                            <div className="mx-4 mb-4 p-4 shadow bg-white rounded-lg">
                              <div className="text-base text-center font-medium">Thank you for your message!</div>
                              <div className="text-sm  text-center pt-2">I didn't quite get you... Please bear with me as I get smarter. meanwhile</div>

                              {
                                slide2Options.map(o => (
                                  <div onClick={(e) => {

                                    loadOptions(parseInt(o.id))
                                  }} className="cursor-pointer px-4 py-2 bg-lgreen bg-opacity-20 hover:bg-opacity-100 hover:text-white rounded-full font-medium mt-4 text-sm text-center duration-500">{o.title}</div>
                                ))
                              }
                            </div>
                            <div className="h-px"></div>

                          </div>
                          : liveTileNo == 3 ?
                            <div className="bg-white shadow rounded-lg">
                              <div
                                className="relative w-full rounded px-4 py-4 text-left sm:text-sm"
                              >
                                <div className="flex-shrink-0 flex items-center">
                                  <div className="p-2 rounded-full bg-lblue">
                                    <img
                                      className="h-4 w-auto"
                                      src="/img/logoWhite.png"
                                      alt="Lifology Logo"
                                    />
                                  </div>

                                  <span className="self-center font-bold pl-4 text-base tracking-wide">Lifology Virtual Assistant</span>
                                </div>
                                <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                  <div className="p-1 rounded-full text-black cursor-pointer hover:scale-110 duration-500"
                                    onClick={
                                      (e) => {
                                        setLiveTileNo(2)
                                      }
                                    }
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </div>
                                </span>
                              </div>
                              <div className="mx-4 mb-4 p-4 shadow bg-white rounded-lg">
                                <div className="text-base text-center font-medium">{options.title}</div>

                                {
                                  options.options.map((o) => (
                                    <div
                                      onClick={
                                        (e) => {
                                          answer(o.id)
                                        }
                                      }
                                      className="cursor-pointer px-3 py-2 bg-lgrey-border hover:bg-lgrey-dark rounded-full font-medium mt-4 text-sm text-center duration-500">
                                      <div className="flex-shrink-0 flex items-center">
                                        <span className="self-center font-bold text-sm tracking-wide">{o.title}</span>
                                      </div>

                                    </div>
                                  ))
                                }
                                {/* <div
                                onClick={
                                  (e) => {
                                    setLiveTileNo(4)
                                  }
                                } className="cursor-pointer px-3 py-2 bg-lgrey-border hover:bg-lgrey-dark rounded-full font-medium mt-4 text-sm text-center duration-500">
                                <div className="flex-shrink-0 flex items-center">
                                  <span className="self-center font-bold text-sm tracking-wide">Other Country</span>
                                </div>
                              </div> */}
                              </div>
                              <div className="h-px"></div>

                            </div>
                            : liveTileNo == 4 ?
                              <div className="bg-white shadow rounded-lg">
                                <div
                                  className="relative w-full rounded px-4 py-4 text-left sm:text-sm"
                                >
                                  <div className="flex-shrink-0 flex items-center">
                                    <div className="p-2 rounded-full bg-lblue">
                                      <img
                                        className="h-4 w-auto"
                                        src="/img/logoWhite.png"
                                        alt="Lifology Logo"
                                      />
                                    </div>

                                    <span className="self-center font-bold pl-4 text-base tracking-wide">Lifology Virtual Assistant</span>
                                  </div>
                                  <span className="absolute inset-y-0 right-0 flex items-center pl-2 pr-2 ">
                                    <div className="p-1 rounded-full text-black cursor-pointer hover:scale-110 duration-500"
                                      onClick={
                                        (e) => {
                                          setLiveTileNo(3)
                                        }
                                      }
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </div>
                                  </span>
                                </div>
                                <div className="mx-4 mb-4 p-4 shadow bg-white rounded-lg">
                                  <div className="text-base text-center font-medium">Get In Touch</div>
                                  <div className="text-sm text-center mt-2">Book a Free Call with Advisor</div>

                                  <div className="text-sm text-center font-medium mt-4">Morning (9:30 AM - 11:30 AM)</div>
                                  <div className="text-sm text-center font-medium mt-2">Afternoon (12:30 PM - 5:30 PM)</div>

                                  <div
                                    className="cursor-pointer px-6 py-2 bg-lgreen rounded-full w-max text-white ml-auto mr-auto mt-4">Submit</div>
                                </div>
                                <div className="h-px"></div>
                              </div>
                              : <></>
                    }
                  </div>

                </div>
              </div>
            </main>
          </div>
        </div>
      </div >
      <PhoneNumberDialog showDialog={phoneNumberDialog} setShowDialog={setPhoneNumberDialog} phoneNumber={phoneNumber} />
    </>
  )
}
export async function getServerSideProps(context) {
  const { token } = cookies(context)

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
  })

  const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
    .then((res) => {
      return res.profile
    }).catch((networkErr) => {
      return {};
    })

  const dashboardClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/dashboard",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const home = await queryGraph(dashboardClient, {}, SchemeGetHomeData)
    .then((res) => {
      return res.home
    }).catch((networkErr) => {
      return {};
    })

  const slide2Options = await queryGraph(dashboardClient, {}, SchemeVlSlide2Option)
    .then((res) => {
      return res.vl_sections
    }).catch((networkErr) => {
      return {};
    })
  console.log(slide2Options)

  const skillClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/skills",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  const coaches = await queryGraph(skillClient, {}, SchemeGetCoachesList)
    .then((res) => {
      return res.coaches
    }).catch((networkErr) => {
      return {};
    })

  return {
    props: {
      profile,
      home,
      coaches,
      slide2Options,
      token
    },
  };
}