import Link from "next/link";
import { useState, useEffect } from "react";
import { ShareIcon, BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/solid";
import { queryGraph } from "/helpers/GraphQLCaller";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  SchemeGetProfile,
  SchemeGetMagazineDetails,
} from "/helpers/GraphQLSchemes";
import Constants from "/helpers/Constants.js";
import NavigationLayout from "/components/NavigationLayout";
import HeaderLayout from "/components/HeaderLayout";
import MetaLayout from "../../../components/MetaLayout";

import { mutateGraph } from "../../../helpers/GraphQLCaller";
import { formatDate } from "/helpers/utils";
import NextNProgress from "nextjs-progressbar";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useRouter } from "next/router";

import cookies from "next-cookies";
import {
  SchemeAddMagazineComment,
  SchemeBookmarkMagazine,
  SchemeMagazineLikeDislike,
} from "../../../helpers/GraphQLSchemes";
import Help_and_Support from "../../../components/Help_and_Support";
import classNames from "/helpers/classNames";
import createDynamicLink from "../../../helpers/DynamicLinkUtil";
import ShareDialog from "../../../components/dialog/ShareDialog";
import HelpAndSupport from "../../../components/dialog/HelpAndSupport";

function getVideoId(url) {
  var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
  var match = url.match(regExp);
  if (match) {
    return match[2];
  }
  return "";
}

export default function CareerVideoDetail({
  profile,
  magazineDetails,
  relatedVideos,
  token,
  helpAndSupport,
}) {
  const router = useRouter();
  const [magazine, setMagazine] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videoStatus, setVideoStatus] = useState([]);
  const [comment, setComment] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const Bookmark_Icon = !!magazine?.bookmark_status
    ? SolidBookmarkIcon
    : BookmarkIcon;
  const pages = [
    {
      name: "Career Explorer",
      href: "/career_explorer/",
      current: false,
    },
    {
      name: "Magazines",
      href: "/career_explorer/magazine",
      current: false,
    },
    {
      name: "Magazine Details",
      href: "#",
      current: true,
    },
  ];
  const client = new ApolloClient({
    uri: Constants.baseUrl + "/api/skills",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    setMagazine(magazineDetails);
  }, []);

  const bookmarkMagazine = () => {
    mutateGraph(
      client,
      {
        magazine_id: Number(magazine.id),
      },
      SchemeBookmarkMagazine
    )
      .then((res) => {
        setMagazine({
          ...magazine,
          bookmark_status: res.magazineBookmark.bookmark_status,
        });
      })
      .catch((networkErr) => {
        console.log(networkErr);
      });
  };

  const addComment = () => {
    mutateGraph(
      client,
      {
        magazine_id: Number(magazine.id),
        comment,
      },
      SchemeAddMagazineComment
    )
      .then((res) => {
        // setMagazine({ ...magazine, bookmark_status: res.magazineBookmark.bookmark_status })
        setComment("");
      })
      .catch((networkErr) => {
        console.log(networkErr);
      });
  };

  const removeLike_Dislike = () => {
    mutateGraph(
      client,
      {
        magazine_id: Number(magazine.id),
        like_status: 2,
      },
      SchemeMagazineLikeDislike
    )
      .then((res) => {
        setMagazine({
          ...magazine,
          like_status: res.magazineLikeStatus.like_status,
        });
        setComment("");
      })
      .catch((networkErr) => {
        console.log(networkErr);
      });
  };

  const handleDislike = () => {
    if (magazine.like_status == 0) {
      removeLike_Dislike();
    } else {
      mutateGraph(
        client,
        {
          magazine_id: Number(magazine.id),
          like_status: 0,
        },
        SchemeMagazineLikeDislike
      )
        .then((res) => {
          setMagazine({
            ...magazine,
            like_status: res.magazineLikeStatus.like_status,
          });
          setComment("");
        })
        .catch((networkErr) => {
          console.log(networkErr);
        });
    }
  };

  const handleLike = () => {
    if (magazine.like_status == 1) {
      removeLike_Dislike();
    } else {
      mutateGraph(
        client,
        {
          magazine_id: Number(magazine.id),
          like_status: 1,
        },
        SchemeMagazineLikeDislike
      )
        .then((res) => {
          setMagazine({
            ...magazine,
            like_status: res.magazineLikeStatus.like_status,
          });
          setComment("");
        })
        .catch((networkErr) => {
          console.log(networkErr);
        });
    }
  };

  const getRecommendedVideos = () => (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-start-3 lg:col-span-1"
    >
      <div
        className="px-4 py-4 bg-white shadow sm:rounded-lg sm:px-4"
        style={{ height: "100vh", overflow: "auto" }}
      >
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          Recommended Videos
        </h2>
        {relatedVideos.map((r) => (
          <a href={`/career_explorer/magazine/${r.id}`}>
            <div className="flex my-4">
              <div className="self-start flex-shrink-0 mt-2 mr-4">
                <img className="object-cover w-20 rounded" src={r.thumbnail} />
              </div>
              <div className="self-center">
                <h4 className="text-sm font-bold">{r.title}</h4>
                <p className="mt-1 text-xs text-justify">{r.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
  const shareVideo = () => {
    setShareDialog(true);
    createDynamicLink("/career_explorer/magazine/" + magazine.id).then(
      (res) => {
        setShareUrl(res);
        console.log(res);
      }
    );
  };
  const getDetailsView = () => (
    <div className="space-y-6 lg:col-start-1 lg:col-span-2">
      <section aria-labelledby="applicant-information-title">
        <div className="p-4 bg-white shadow sm:rounded-lg">
          <div className="sm:flex">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
              <img
                className={classNames(
                  magazine.purchase_status == 0
                    ? "pointer-events-none opacity-60"
                    : "",
                  "rounded-md w-48"
                )}
                src={magazine?.thumbnail}
              />
            </div>
            <div>
              <div className="flex">
                <div>
                  <h4
                    className={classNames(
                      magazine.purchase_status == 0
                        ? "pointer-events-none opacity-60"
                        : "",
                      "text-base font-bold"
                    )}
                  >
                    {magazine?.title}
                  </h4>
                </div>
                {/* <div className="flex-shrink-0 ml-4 duration-500 cursor-pointer hover:text-lblue" onClick={() => setShowHelp(!showHelp)}>
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5c0-.46.08-.9.22-1.31.2-.58.53-1.1.95-1.52l1.24-1.26c.46-.44.68-1.1.55-1.8-.13-.72-.69-1.33-1.39-1.53-1.11-.31-2.14.32-2.47 1.27-.12.37-.43.65-.82.65h-.3C8.4 9 8 8.44 8.16 7.88c.43-1.47 1.68-2.59 3.23-2.83 1.52-.24 2.97.55 3.87 1.8 1.18 1.63.83 3.38-.19 4.4z" />
                  </svg>
                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full h-px my-4 bg-gray-200" />

          <div>
            {magazine.purchase_status == 0 ? (
              <div>
                <div className="flex-shrink-0 h-10 mb-4 overflow-hidden text-sm text-justify pointer-events-none opacity-60 sm:mb-0">
                  {magazine?.description}
                </div>
                <div className="mt-8 text-center">
                  <div className="flex-shrink-0 mb-4 font-bold text-center sm:mb-0">
                    Keep Reading
                  </div>
                  <div className="flex-shrink-0 mt-2 mb-4 text-sm text-center sm:mb-0">
                    You have read all the free trail members only. get unlimted
                    access of everything on lifology
                  </div>
                  <Link href="/subscription">
                    <a
                      className="inline-flex justify-center px-4 py-2 mt-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                      style={{
                        width: "fit-content",
                        backgroundColor: "#085CA4",
                      }}
                    >
                      Subscription
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex-shrink-0 mb-4 text-sm text-justify sm:mb-0">
                <div
                  className="text-container"
                  dangerouslySetInnerHTML={{ __html: magazine?.description }}
                />
              </div>
            )}
          </div>

          <div className="w-full h-px mt-2 mb-2 bg-gray-200" />
          <div
            className={classNames(
              magazine.purchase_status == 0
                ? "pointer-events-none opacity-60"
                : "",
              "flex flex-wrap max-w-full"
            )}
          >
            <div className="flex flex-wrap self-center w-full text-xs">
              <div
                className={classNames(
                  "mr-2 flex py-2 cursor-pointer p-2 self-center rounded-full hover:bg-gray-100 duration-500",
                  magazine?.like_status == 1
                    ? "text-lblue bg-gray-100  "
                    : "text-gray-400 hover:text-lblue"
                )}
                onClick={handleLike}
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
                  magazine?.like_status == 0
                    ? "text-lblue bg-gray-100"
                    : "text-gray-400 hover:text-lblue"
                )}
                onClick={handleDislike}
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
              <div
                className="flex self-center p-2 mr-auto text-gray-400 duration-500 rounded-full cursor-pointer hover:bg-gray-100 hover:text-lblue"
                onClick={shareVideo}
              >
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
                  !!magazine?.bookmark_status
                    ? "text-lblue bg-gray-100"
                    : "text-gray-400 hover:text-lblue"
                )}
                onClick={bookmarkMagazine}
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
                <span>
                  {!!magazine?.bookmark_status
                    ? "Bookmark Added"
                    : "Add to bookmark"}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-px mt-2 mb-4 bg-gray-200" />
          <div
            className={classNames(
              magazine.purchase_status == 0
                ? "pointer-events-none opacity-60"
                : ""
            )}
          >
            <div className={"text-md mb-2"}>Leave a comment</div>
            <textarea
              placeholder={"Write something..."}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={
                "rounded-md bg-gray-200 outline-none w-full h-28 p-2 mb-2"
              }
            />
            <button
              className={
                "flex ml-auto py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue focus:outline-none disabled:bg-gray-500 disabled:cursor-default duration-200"
              }
              onClick={addComment}
              disabled={!comment?.length}
            >
              Comment
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const IFrameView = () => (
    <iframe
      src={"https://en.wikipedia.org/wiki/Main_Page"}
      className={"space-y-6 lg:col-start-1 lg:col-span-2 w-full h-full"}
      allowFullScreen={true}
    />
  );

  return (
    <>
      <HelpAndSupport
        showDialog={showHelp}
        setShowDialog={setShowHelp}
        title={helpAndSupport.msg}
        body={helpAndSupport.html}
      />
      {/* {showHelp && <Help_and_Support details={helpAndSupport || {}} closeModal={() => setShowHelp(!showHelp)} />} */}
      <MetaLayout title={magazine?.title} description={magazine?.description} />
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
            title={magazine?.title}
          />
          <main className="relative z-0 flex-1 overflow-y-auto">
            <Breadcrumbs pages={pages} />
            <div className="m-4">
              <div className="mx-auto mt-4 max-w-7xl">
                <div className="flex flex-col mt-2">
                  <div className="grid max-w-3xl grid-cols-1 gap-4 mx-auto lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* <IFrameView /> */}
                    {getDetailsView()}
                    {getRecommendedVideos()}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ShareDialog
        showDialog={shareDialog}
        setShowDialog={setShareDialog}
        url={shareUrl}
        title={magazine.title}
      />
    </>
  );
}
export async function getServerSideProps(context) {
  const { token } = cookies(context);
  if (token == null || token == "") {
    return {
      redirect: {
        permanent: false,
        destination:
          "/login?redirect=" +
          encodeURIComponent("/career_explorer/magazine/" + context.params.id),
      },
    };
  }
  const magazineClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/skills",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const magazine = await queryGraph(
    magazineClient,
    { id: parseInt(context.params.id) },
    SchemeGetMagazineDetails
  )
    .then((res) => {
      return res.magazineDetails;
    })
    .catch((networkErr) => {
      return {};
    });
  console.log(magazine);
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

  const helpAndSupport = await fetch(
    `${Constants.baseUrl}/api/help-support?type=Magazine`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  console.log(magazine.relatedVideos);

  return {
    props: {
      token,
      profile,
      magazineDetails: magazine.details,
      relatedVideos: magazine.relatedVideos || [],
      helpAndSupport,
    },
  };
}
