import { useState, useEffect,useCallback } from 'react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'

import MetaLayout from '/components/MetaLayout'
import SettingNavigationLayout from '/components/SettingNavigationLayout'

import cookies from 'next-cookies'

import useEmblaCarousel from 'embla-carousel-react'
import PreviousButton from '../components/embla/PreviousButton'
import NextButton from '../components/embla/NextButton'
import { SchemeGetAchievements } from '../helpers/GraphQLSchemes'

export default function AboutUs({ profile,myBadges, certificates }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [emblaRef] = useEmblaCarousel({ loop: false })
    const [viewportRef, embla] = useEmblaCarousel({
      align: "center",
      skipSnaps: false
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  
    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const onSelect = useCallback(() => {
      if (!embla) return;
      setPrevBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);
  
    useEffect(() => {
      if (!embla) return;
      embla.on("select", onSelect);
      onSelect();
    }, [embla, onSelect]);

    return (
        <>
            <MetaLayout title="About Us" description="About Us" />
            <div className="flex h-screen overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Settings / About Us" />

                    <main className="relative z-0 flex-1 overflow-y-auto">

                        <div className="mt-4">

                        <div className="relative ml-auto mr-auto">
                          <div className="w-full overflow-hidden" ref={viewportRef}>
                            <div className="flex -ml-2 select-none">
                            {
                              myBadges.badges.map(b=>{
                                const percentage = Math.round(b.min_points/b.max_points*100)
                               return (
                               <div className="relative m-2 rounded-lg shadow min-w-80 flex-two md:flex-five sm:flex-one">
                                  <div className="relative overflow-hidden">
                                    <img src={b.image} className="w-full p-4"/>
                                    <div className='flex w-full px-4 text-sm'>
                                      <div className='w-1/2'>
                                      {b.min_points}
                                      </div>
                                      <div className='w-1/2 text-right'>{b.max_points}
                                      </div>
                                    </div>
                                    <div className='relative mx-4 mb-4'>
                                      <div className='absolute w-full h-2 bg-blue-300 rounded-full'></div>
                                      <div className={'absolute h-2 bg-blue-500 rounded-full '} style={{
                                        width:percentage+'%'
                                      }}></div>
                                    </div>
                                  </div>
                                </div>)
                              })
                            }
                            </div>
                          </div>
                          <PreviousButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
                        </div>
                        <div>
                           <ul role="list" className="grid grid-cols-1 gap-4 m-4 sm:grid-cols-2 lg:grid-cols-2">
                            {certificates.map((c) => (
                              <li key={c.id} className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow">
                                <img src={c.image} className="w-full p-4"/>
                              </li>
                            ))}
                          </ul>
                        </div>

                        </div>

                    </main>
                </div>


            </div >
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
    });
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        });

    const achievementClient = new ApolloClient({
      uri: Constants.baseUrl + "/api/my-badges",
      cache: new InMemoryCache(),
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const response = await queryGraph(achievementClient, {}, SchemeGetAchievements)
        .then((res) => {
            return res
        }).catch((networkErr) => {
            return {};
        });
        console.log(response.myBadges)
        console.log(response.certificates)
    return {
        props: { profile,myBadges: response.myBadges,certificates: response.certificates , token }
    }
}