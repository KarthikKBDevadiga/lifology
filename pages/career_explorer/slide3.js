import { useState } from "react";
import { UserIcon, ThumbUpIcon, CheckIcon } from "@heroicons/react/solid";
import { queryGraph } from "/helpers/GraphQLCaller";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemeGetProfile } from "/helpers/GraphQLSchemes";
import Constants from "/helpers/Constants.js";
import NavigationLayout from "/components/NavigationLayout";
import HeaderLayout from "/components/HeaderLayout";
import MetaLayout from "/components/MetaLayout";
import classNames from "/helpers/classNames";

import "keen-slider/keen-slider.min.css";
import { useRouter } from "next/router";

import cookies from "next-cookies";

export default function News({ profile }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <MetaLayout title="Career Videos" description="Career Videos" />
      <div className="flex h-screen overflow-hidden bg-gray-100 font-roboto">
        <NavigationLayout
          index="4"
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex-1 overflow-auto focus:outline-none">
          <HeaderLayout
            setSidebarOpen={setSidebarOpen}
            profile={profile}
            title="Career Explorer / News / Details"
          />

          <main className="relative z-0 flex-1 overflow-y-auto">
            {/* Page header */}
            <div className="grid max-w-3xl grid-cols-1 gap-4 mx-auto mt-4 sm:px-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-4 lg:col-start-1 lg:col-span-2">
                {/* Description list*/}
                <section aria-labelledby="applicant-information-title">
                  <div className="p-4 bg-white shadow sm:rounded-lg">
                    <div className="sm:flex">
                      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                        <img src="/img/test.png" className="w-64 rounded-lg" />
                      </div>
                      <div>
                        <div className="text-sm">
                          Coin Base In The Coin Blog
                        </div>
                        <div className="mt-4 text-xl font-bold">
                          What I Learned From Having 2,000 Famous People Cook Me
                          Dinner
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                          May 25 · 5 min read
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-px my-4 bg-gray-200" />
                    <div className="flex-shrink-0 text-sm text-justify sm:mb-0">
                      <div
                        className="text-container "
                        //   dangerouslySetInnerHTML={{ __html: magazine?.description }}
                      />

                      <div className="">
                        I’ve Never Been Much Of A “Ritual” Person When It Comes
                        To Writing. If I Need To, I Can Write Anywhere, Anytime,
                        About Anything. After All, If I Were Too Precious About
                        The Conditions Around Writing, I Wouldn’t Have Made Much
                        Money From Doing It. But In Our New Pandemic Life, When
                        In Theory It Should Be Much Easier To Find Time To Write
                        The Things That Are Purely Creative And Without
                        Obligation Or Deadline, I Found That It Was Not. Sure, I
                        Could Do The Things That Were Required For My Job, Or
                        For Contracts And Paychecks I Had Committed To. But
                        Writing My Monthly Newsletter Or Working On My Book
                        Proposal — Saying The Stuff I Ostensibly Really Wanted
                        To Say—Still Felt Like A Chore To Find Time For.
                      </div>
                      <div className="mt-2">
                        Months Ago A Friend Told Me About Something That Had
                        Been Working For Her: London Writers’ Salon. Every
                        Weekday, Several Hundred People Log Onto Zoom At 8 A.M.
                        For One Hour Of Writing. The Routine, Which Is Run By
                        Two Or Three Cheery Facilitators, Is Admirably
                        Efficient. The First Five Minutes Are A Check-In, Where
                        Everyone Has The Option To Drop In The Zoom Chat What
                        They’re Working On, And Someone Reads A Quote For
                        Inspiration. Then 50 Minutes Of Writing With Everyone On
                        Mute. Then A Five-Minute Check-Out Where You Can Report
                        Back In The Chat On How It Went. There Are No
                        Obligations, Everyone Stays On Mute Other Than The
                        Facilitators, And You Don’t Have To Keep Your Camera On.
                        (In Other Words, It Manages To Not Be Annoying.) The
                        Hour Has Been So Popular It’s Expanded To Multiple Time
                        Zones Each Day.
                      </div>
                      <div className="mt-2">
                        I’ve Never Been Much Of A “Ritual” Person When It Comes
                        To Writing. If I Need To, I Can Write Anywhere, Anytime,
                        About Anything. After All, If I Were Too Precious About
                        The Conditions Around Writing, I Wouldn’t Have Made Much
                        Money From Doing It. But In Our New Pandemic Life, When
                        In Theory It Should Be Much Easier To Find Time To Write
                        The Things That Are Purely Creative And Without
                        Obligation Or Deadline, I Found That It Was Not. Sure, I
                        Could Do The Things That Were Required For My Job, Or
                        For Contracts And Paychecks I Had Committed To. But
                        Writing My Monthly Newsletter Or Working On My Book
                        Proposal — Saying The Stuff I Ostensibly Really Wanted
                        To Say—Still Felt Like A Chore To Find Time For.
                      </div>
                    </div>
                    {/* tags */}
                    <div className="mt-4">
                      <div>Tags</div>
                      <div>
                        <ul className="after:content-[''] after:block after:clear-both pt-2">
                          <li
                            key="all"
                            className={classNames(
                              "float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 bg-lgrey-bg border border-lgrey-border hover:bg-lblue hover:text-white"
                            )}
                          >
                            Architecture
                          </li>
                          <li
                            className={classNames(
                              "float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 bg-lgrey-bg border border-lgrey-border hover:bg-lblue hover:text-white"
                            )}
                          >
                            Statisctics
                          </li>
                          <li
                            className={classNames(
                              "float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 bg-lgrey-bg border border-lgrey-border hover:bg-lblue hover:text-white"
                            )}
                          >
                            Mathematics
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full h-px mt-2 mb-2 bg-gray-200" />
                    <div className={classNames("flex flex-wrap max-w-full")}>
                      <div className="flex flex-wrap self-center w-full text-xs">
                        <div
                          className={classNames(
                            "mr-2 flex py-2 cursor-pointer p-2 self-center rounded-full hover:bg-gray-100 duration-500",

                            "text-gray-400 hover:text-lblue"
                          )}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="currentColor"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                          </svg>
                          <span>Like</span>
                        </div>
                        <div
                          className={classNames(
                            "mr-2 flex cursor-pointer p-2 self-center rounded-full hover:bg-gray-100 duration-500",
                            "text-gray-400 hover:text-lblue"
                          )}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            height="18px"
                            viewBox="0 0 24 24"
                            width="18px"
                            fill="currentColor"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                          </svg>
                          <span>Dislike</span>
                        </div>
                        <div className="flex self-center p-2 mr-auto text-gray-400 duration-500 rounded-full cursor-pointer hover:bg-gray-100 hover:text-lblue">
                          {/* <ShareIcon className={'h-4 mr-2'} /> */}
                          <svg
                            className="w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="currentColor"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                          </svg>
                          Share
                        </div>
                        <div
                          className={classNames(
                            "mr-2 flex cursor-pointer p-2 self-center rounded-full hover:bg-gray-100 duration-500",
                            "text-gray-400 hover:text-lblue"
                          )}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="currentColor"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                          </svg>
                          <span>{"Add to bookmark"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-px mt-2 mb-4 bg-gray-200" />
                    <div className={classNames("")}>
                      <div className={"text-md mb-2"}>Leave a comment</div>
                      <textarea
                        placeholder={"Write something..."}
                        className={
                          "rounded-md bg-gray-200 outline-none w-full h-28 p-2 mb-2"
                        }
                      />
                      <button
                        className={
                          "flex ml-auto py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue focus:outline-none disabled:bg-gray-500 disabled:cursor-default duration-200"
                        }
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              <section
                aria-labelledby="timeline-title"
                className="lg:col-start-3 lg:col-span-1"
              >
                <div className="px-4 py-5 bg-white shadow sm:rounded-lg sm:px-6">
                  <h2
                    id="timeline-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    More News
                  </h2>
                  <div className="my-2 sm:flex">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                      <img src="/img/test.png" className="w-24 rounded-full" />
                    </div>
                    <div>
                      <div className="pb-2 text-xs">
                        George Aye In Surviving Ideo
                      </div>
                      <div className="text-sm font-bold">
                        Cancan, The Internet Computer’s ‘Decentralized Tiktok,’
                        Is Now Open
                      </div>
                      <div className="py-2 text-xs text-gray-500">
                        May 25 · 5 min read
                      </div>
                    </div>
                  </div>
                  <div className="my-2 sm:flex">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                      <img src="/img/test.png" className="w-24 rounded-full" />
                    </div>
                    <div>
                      <div className="pb-2 text-xs">
                        George Aye In Surviving Ideo
                      </div>
                      <div className="text-sm font-bold">
                        Cancan, The Internet Computer’s ‘Decentralized Tiktok,’
                        Is Now Open
                      </div>
                      <div className="py-2 text-xs text-gray-500">
                        May 25 · 5 min read
                      </div>
                    </div>
                  </div>
                  <div className="my-2 sm:flex">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                      <img src="/img/test.png" className="w-24 rounded-full" />
                    </div>
                    <div>
                      <div className="pb-2 text-xs">
                        George Aye In Surviving Ideo
                      </div>
                      <div className="text-sm font-bold">
                        Cancan, The Internet Computer’s ‘Decentralized Tiktok,’
                        Is Now Open
                      </div>
                      <div className="py-2 text-xs text-gray-500">
                        May 25 · 5 min read
                      </div>
                    </div>
                  </div>
                  <div className="my-2 sm:flex">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                      <img src="/img/test.png" className="w-24 rounded-full" />
                    </div>
                    <div>
                      <div className="pb-2 text-xs">
                        George Aye In Surviving Ideo
                      </div>
                      <div className="text-sm font-bold">
                        Cancan, The Internet Computer’s ‘Decentralized Tiktok,’
                        Is Now Open
                      </div>
                      <div className="py-2 text-xs text-gray-500">
                        May 25 · 5 min read
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-4 my-4 bg-white shadow sm:rounded-lg sm:px-4 ">
                  <div className="p-4 text-xl font-bold text-center">
                    Get In Touch
                  </div>
                  <div className="px-4 text-center">
                    Book a Free Call with Advisor
                  </div>
                  <div className="flex justify-center p-4">
                    <button
                      className={
                        "flex py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue focus:outline-none disabled:bg-gray-500 disabled:cursor-default duration-200"
                      }
                    >
                      Connect with an Agent
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = cookies(context);
  if (token == null || token == "") {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
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
      return res.profile;
    })
    .catch((networkErr) => {
      return {};
    });
  return {
    props: { profile },
  };
}
