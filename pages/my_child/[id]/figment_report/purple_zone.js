import Link from 'next/link'
import { useState } from 'react'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'
import "react-multi-carousel/lib/styles.css";
import { SchemeCareerPools } from '/helpers/GraphQLSchemes'
import VideoDialog from '/components/dialog/VideoDialog'
import { SchemeCareerFields } from '/helpers/GraphQLSchemes'
import styles from '/styles/Mti.module.css'


export default function MTIAssessment({ profile, token }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const [openGreen, setGreenOpen] = useState(false)
    const [openBlue, setBlueOpen] = useState(false)
    const [openOrange, setOrangeOpen] = useState(false)
    const [openPurple, setPurpleOpen] = useState(false)

    const [openVideo, setOpenVideo] = useState(false)

    return (
        <>
            <MetaLayout title="Assesment / MTI Assesment" description="Assesment / MTI Assesment" />
            <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} authToken={token} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={"My Child / Career Fitment Report "} authToken={token} setAuthToken={setAuthToken} />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="m-4 font-sans">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-gray-50 rounded-md shadow h-30 p-5" style={{ height: "fit-content" }}>
                                        <p className="font-medium">Assesment/MTI Assesment</p>
                                        <div className="flex mt-3">
                                            <div className="bg-black w-20 rounded-md">
                                                <p className="text-white p-3 px-2">CAREER FITMENT</p>
                                            </div>
                                            <p className="ml-5 mr-5 font-medium">Career Fitment
                                                <h6 className="text-xs font-normal">Do you think your child has mastery over their immediate environment</h6>
                                            </p>
                                            <img src="../../img/fitment.png" alt="fitment" width="75px" height="40px" />
                                            {/* <div className="bg-yellow-400 w-20"><p className="text-white p-2">Image</p> </div> */}
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-md shadow mt-5 pb-9 h-auto">

                                        <div className="border mt-5 mr-5 ml-5 rounded-md p-2 w-auto items-center  font-medium">
                                            Green Zone
                                            {openGreen ? <span onClick={() => setGreenOpen(!open)} style={{ position: "absolute", right: "55%", cursor: "pointer" }} className="content-end bg-black text-large text-white px-1.5 rounded-full h-5 w-15 px-3 ">{'-'}</span> :
                                                <span onClick={() => setGreenOpen(!openGreen)} style={{ position: "absolute", right: "55%", cursor: "pointer" }} className="fixed content-end bg-black text-large text-white px-1.5 rounded-full h-6 w-15 ">{'+'}</span>}
                                        </div>
                                        {openGreen && <div className="border mb-5 mr-5 ml-5 p-2 w-auto items-center font-medium">Green Zone Data</div>}

                                        <div className="p-2 mt-5 mr-5 ml-5 bg-white text-medium items-center border rounded-md font-medium">Blue Zone
                                            {openBlue ? <span onClick={() => setBlueOpen(!openBlue)} style={{ position: "absolute", right: "55%", cursor: "pointer" }} className="content-end text-white bg-black text-large  px-1.5 rounded-full h-5 w-15  ">{'-'}</span> :
                                                <span onClick={() => setBlueOpen(!openBlue)} style={{ position: "absolute", right: "55%", cursor: "pointer" }} className="content-end bg-black text-large text-white px-1.5 rounded-full h-6 w-15  ">{'+'}</span>}
                                        </div>
                                        {openBlue && <div className="p-2 mb-5 mr-5 ml-5 bg-white text-medium items-center border font-medium">Blue Zone Data</div>}

                                        <div  className="p-2 mt-5 mr-5 ml-5 text-medium items-center border rounded-md font-medium">Orange Zone
                                            {openOrange ? <span onClick={() => setOrangeOpen(!openOrange)} style={{ position: "absolute", right: "55%", cursor: "pointer" }} className="content-end text-white bg-black text-large  px-1.5 rounded-full h-5 w-15  ">{'-'}</span> :
                                                <span onClick={() => setOrangeOpen(!openOrange)} style={{ position: "absolute", right: "55%", cursor: "pointer" }} className="content-end text-white bg-black text-large  px-1.5 rounded-full h-6 w-15  ">{'+'}</span>}
                                        </div>
                                        {openOrange && <div className="p-2 mb-5 mr-5 ml-5 bg-white text-medium items-center border  font-medium">orange Zone Data</div>}

                                        <div style={{ background: "#5EB570" }} className="p-2 mt-5 mr-5 ml-5 text-white text-medium items-center border rounded-md font-medium">Purple Zone
                                            {openPurple ? <span onClick={() => setPurpleOpen(!openPurple)} style={{ position: "absolute", right: "55%", cursor: "pointer" }} className="content-end text-green-500 bg-white text-large  px-1.5 rounded-full h-5 w-15 ">{'-'}</span> :
                                                <span onClick={() => setPurpleOpen(!openPurple)} style={{ position: "absolute", right: "55%", cursor: "pointer" }} className="content-end  text-green-500 bg-white text-large  px-1.5 rounded-full h-6 w-15">{'+'}</span>}
                                        </div>
                                        {openPurple && <div className="p-2 mb-5 mr-5 ml-5 bg-white text-medium items-center border  font-medium">purple Zone Data</div>}

                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">

                                    <div className="bg-white rounded-md shadow h-auto p-5">
                                        <div className="text-white m-2 rounded-md" style={{ background: "#9F2DC3" }}>
                                            <p className="p-5"><span style={{color:"#531567"}} className="text-purple-500 bg-white mr-2 p-1 py-2 rounded-full h-12 w-9 ">90%</span>Tourism & Hospitality</p>
                                            <p className="text-sm pl-5 pb-3">Personality Match</p>
                                            <div class="relative ml-5 mr-5  pt-1">
                                                <div style={{background:"#531567"}} className="overflow-hidden h-2 mb-4 text-xs flex rounded ">
                                                    <div style={{ width: '30%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                                                </div>
                                            </div>
                                            <p className="text-sm pl-5 pb-3">Orientation Match</p>
                                            <div class="relative ml-5 mr-5 pt-1">
                                                <div style={{background:"#531567"}} className="overflow-hidden h-2 mb-4 text-xs flex rounded">
                                                    <div style={{ width: '70%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                                                </div>
                                            </div>
                                            <p className="text-sm pl-5 pb-3 pr-5">
                                                Want to know more about your fitment score and its relevance?
                                            </p>
                                            <p className="text-xs pl-5 pb-3 pr-5">"The Mission Of Lifology Is To Empower Each Parent In India To Lead Children
                                                To The Right Education, Career And Future"
                                            </p>
                                        </div>

                                        <div className="text-white m-2 pb-5 rounded-md" style={{ background: "#9F2DC3" }}>
                                            <p className="p-5"><span style={{color:"#531567"}}  className="text-violet-500 bg-white mr-2 p-1 py-2 rounded-full h-12 w-9 ">90%</span>Tourism & Hospitality</p>
                                            <p className="text-sm pl-5 pb-3">Personality Match</p>
                                            <div class="relative ml-5 mr-5  pt-1">
                                                <div style={{background:"#531567"}}  className="overflow-hidden h-2 mb-4 text-xs flex rounded ">
                                                    <div style={{ width: '30%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                                                </div>
                                            </div>
                                            <p className="text-sm pl-5 pb-3">Orientation Match</p>
                                            <div class="relative ml-5  mr-5 pt-1">
                                                <div style={{background:"#531567"}} className="overflow-hidden h-2  text-xs flex rounded ">
                                                    <div style={{ width: '70%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                </div>



                            </div>


                        </div>

                        <footer className="shadow p-4 bg-white">
                            <div className="text-center front-medium">Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
                    </main>
                </div>
            </div>

            <VideoDialog showDialog={openVideo} setShowDialog={setOpenVideo} url="http:" />
        </>
    )
}

const getColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    return "#" + randomColor
}

export async function getServerSideProps(context) {
    const { token } = context.query
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
        });
    return {
        props: { profile, token }
    }
}


