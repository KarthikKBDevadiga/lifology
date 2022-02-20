import Link from "next/link";
import { Fragment, useState, useRef, useEffect } from "react";
import {
  DotsVerticalIcon,
  SearchIcon,
  ArrowRightIcon,
  SortAscendingIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  ThumbUpIcon,
  CheckIcon,
} from "@heroicons/react/solid";
import { Dialog, Menu, Transition, RadioGroup } from "@headlessui/react";
import { queryGraph } from "/helpers/GraphQLCaller";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  SchemeGetCareerFamilies,
  SchemeGetGrades,
  SchemeGetProfile,
  SchemeGetVideos,
} from "/helpers/GraphQLSchemes";
import Constants from "/helpers/Constants.js";
import NavigationLayout from "/components/NavigationLayout";
import HeaderLayout from "/components/HeaderLayout";
import MetaLayout from "/components/MetaLayout";
import classNames from "/helpers/classNames";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useRouter } from "next/router";

import cookies from "next-cookies";
import YoutubeDialog from "../../components/dialog/YoutubeDialog";
import VideoItem from "../../components/item/VideoItem";

import { MailIcon, PhoneIcon } from "@heroicons/react/solid";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};

const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];

export default function News({ profile }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = [
    {
      name: "Career Explorer",
      href: "/career_explorer/",
      current: false,
    },
    { name: "News", href: "#", current: true },
  ];

  const attachments = [
    { name: "resume_front_end_developer.pdf", href: "#" },
    { name: "coverletter_front_end_developer.pdf", href: "#" },
  ];
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
            title="News"
          />

          <main className="relative z-0 flex-1 overflow-y-auto">
            <div className="">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col">
                  <Breadcrumbs pages={pages} />
                  <div className="mx-4 bg-white rounded shadow-md sm:flex">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                      <img
                        className="w-full text-gray-300 bg-white border border-gray-300 rounded sm:w-96 bg-lblue-light"
                        src="/img/course-university-header.png"
                      />
                    </div>
                    <div className="self-center py-2">
                      <div className="text-gray-500">
                        Zulie Rane In The Startup
                      </div>
                      <div className="mt-2 text-lg font-bold">
                        Cancan, The Internet Computer’s ‘Decentralized Tiktok,’
                        Is Now Open
                      </div>
                      <div className="mt-2">
                        I’ve Never Been Much Of A “Ritual” Person When It Comes
                        To Writing. If I Need To, I Can Write Anywhere, Anytime,
                        About Anything.
                      </div>
                      <div className="flex mt-2 text-sm text-gray-500">
                        May 25 • 5 min read
                      </div>
                    </div>
                  </div>
                  <div className="p-4 mx-4 mt-4 bg-white rounded shadow-sm">
                    <div className="sm:flex sm:items-start sm:justify-between">
                      <div className="max-w-xl text-lg font-bold">
                        Trending News
                      </div>
                      <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchIcon
                              className="w-5 h-5 text-black"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full py-3 pl-10 pr-4 text-black bg-gray-200 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                    </div>
                    <ul
                      role="list"
                      className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      {people.map((person) => (
                        <div className="flex">
                          <div className="flex-shrink-0 mr-4">
                            <img
                              className="object-cover w-24 h-full text-gray-300 bg-white border border-gray-300 rounded-full"
                              src="/img/test.png"
                            />
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">
                              Coin Base In The Coin Blog
                            </div>
                            <div className="mt-1 font-bold">
                              Fact Check: Is Bitcoin Mining Environmentally
                              Unfriendly?
                            </div>
                            <div className="flex mt-2 text-sm text-gray-500">
                              May 25 • 5 min read
                            </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                  <div className="grid max-w-3xl grid-cols-1 gap-4 mx-auto mt-4 sm:px-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                      {/* Description list*/}
                      <section aria-labelledby="applicant-information-title">
                        <div className="bg-white shadow sm:rounded-lg">
                          <ul className="after:content-[''] after:block after:clear-both px-4 pt-2">
                            <li
                              key="all"
                              className={classNames(
                                "float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 bg-lgrey-bg border border-lgrey-border hover:bg-lblue hover:text-white"
                              )}
                            >
                              All
                            </li>
                            <li
                              className={classNames(
                                "float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 bg-lgrey-bg border border-lgrey-border hover:bg-lblue hover:text-white"
                              )}
                            >
                              Type 1
                            </li>
                            <li
                              className={classNames(
                                "float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 bg-lgrey-bg border border-lgrey-border hover:bg-lblue hover:text-white"
                              )}
                            >
                              Type 2
                            </li>
                          </ul>
                          <div className="px-4 py-5 sm:px-6">
                            <h2
                              id="applicant-information-title"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Applicant Information
                            </h2>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500">
                              Personal details and application.
                            </p>
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
                          Discover More Topics
                        </h2>
                        <div className="mt-2 text-sm text-gray-500">
                          Career Pools
                        </div>
                        <ul className="after:content-[''] after:block after:clear-both pt-2">
                          <li
                            key="all"
                            className={classNames(
                              "float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 bg-lgrey-bg border border-lgrey-border hover:bg-lblue hover:text-white"
                            )}
                          >
                            Data Analytics, Mathematics, & Statistics
                          </li>
                          <li
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
                            Armed Forces And Security
                          </li>
                        </ul>
                        <div className="mt-2 text-sm text-gray-500">
                          Career Pools
                        </div>
                        <ul className="after:content-[''] after:block after:clear-both pt-2">
                          <li
                            key="all"
                            className={classNames(
                              "float-left px-4 py-2 text-xs rounded-full m-1 cursor-pointer duration-500 bg-lgrey-bg border border-lgrey-border hover:bg-lblue hover:text-white"
                            )}
                          >
                            Data Analytics, Mathematics, & Statistics
                          </li>
                          <li
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
                            Armed Forces And Security
                          </li>
                        </ul>
                      </div>
                    </section>
                  </div>
                  <div className="h-4"></div>
                </div>
              </div>
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
