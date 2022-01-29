import { useState, useEffect } from 'react'
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const languages = [
  {
    id: 'English',
    title: 'English'
  },
  {
    id: 'Hindi',
    title: 'हिन्दी,'
  },
  {
    id: 'Tamil',
    title: 'தமிழ்'
  },
  {
    id: 'Telgu',
    title: 'తెలుగు'
  },
  {
    id: 'Gujrathi',
    title: 'ગુજરાતી'
  },
  {
    id: 'Bengali',
    title: 'বাংলা'
  },
]

export default function Language({ profile }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  const index = 1;
  return (
    <>
      <MetaLayout title="Language" description="Language" />
      <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

        <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

        <div className="flex-1 overflow-auto focus:outline-none" >
          <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Settings / About Us" />

          <main className="flex-1 relative z-0 overflow-y-auto">

            <div className="m-4">

              <div className="max-w-6xl mx-auto mt-4">
                <div className="flex flex-col mt-2">

                  <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div className="space-y-6 lg:col-start-1 lg:col-span-1">
                      {/* Description list*/}
                      <section aria-labelledby="applicant-information-title" >
                        <SettingNavigationLayout index="7" />
                      </section>

                    </div>

                    <section aria-labelledby="timeline-title" className="lg:col-start-2 lg:col-span-2">
                      <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4">
                        <div className="text-lg leading-6 font-medium text-gray-900 flex">
                          <div className="self-center">
                            Language
                          </div>
                        </div>
                        <div className="mt-4 text-lg leading-6 font-medium text-gray-900 flex">

                          <div className="bg-gray-100 mr-2 p-2 rounded-full">
                            <svg className="text-lblue-light " xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#085ca4"><path d="M0 0h24v24H0z" fill="none" /><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" /></svg>
                          </div>
                          <div className="self-center">
                            Select your language
                          </div>
                        </div>
                        <ul role="list" className="mt-3 grid grid-cols-1 gap-2 sm:gap-2 sm:grid-cols-4 lg:grid-cols-6">
                          {languages.map((language) => (
                            <li key={language.id} className="col-span-1 flex shadow-sm rounded-md">
                              <div
                                onClick={
                                  () => {
                                    setSelectedLanguage(language)
                                    console.log(selectedLanguage)
                                  }
                                }
                                className={
                                  classNames(
                                    (selectedLanguage != null && selectedLanguage.id == language.id) ? 'bg-lblue text-white' : 'bg-gray-300 text-black',
                                    'cursor-pointer flex-shrink-0 flex items-center justify-center w-full h-18 text-sm font-medium rounded-lg px-6 py-6 hover:bg-lblue hover:text-white duration-500')
                                }
                              >
                                {language.title}
                              </div>

                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 sm:flex">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-full border border-lblue shadow-sm px-4 py-2  text-base font-medium text-lblue hover:bg-lblue hover:text-white duration-500 sm:w-auto sm:text-sm"
                            onClick={() => {

                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
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
  return {
    props: { profile, token }
  }
}


