import React from 'react'
import Head from "next/head";
// import { Button, Typography } from "@mui/material";


const Main = (props) => {
    return <main className="application-container">{props.children}</main>;
};


const kotak_21c = () => {
    return (
        <div className="tpl-overview">
            <Head>
                <title>Kotak 811 - Vkyc Currently Offline</title>
            </Head>

            <Main>
                <div style={{
                    maxWidth: "20.93rem",
                    margin: "0 auto",
                    width: "100%"
                }}>
                    <div style={{ textalign: "center" }}>
                        <div style={{
                            width: "10rem",
                            margin: "0 auto 1.31rem"
                        }}>
                            <span className="cm-image-placeholder"></span>
                        </div>

                        <div className="info-wrap">
                            <div className="info-head">
                                <text variant="h4">errorHeading</text>
                            </div>

                            <div className="info-cont">
                                <text variant="subtitle2">errorDescription</text>
                            </div>
                        </div>

                        <span className="cm-or">
                            <text variant="subtitle3">orText</text>
                        </span>

                        <div className="action-wrap">
                            <text variant="subtitle3" component="h5">
                                officerVisitText
                            </text>

                            <text variant="subtitle2">officerVisitDescription</text>

                            <button variant="text" type="button" className="btn btn-proceed">
                                scheduleVisitLinkText
                            </button>
                        </div>
                    </div>
                </div>
            </Main>
        </div>
    );
}

export default kotak_21c