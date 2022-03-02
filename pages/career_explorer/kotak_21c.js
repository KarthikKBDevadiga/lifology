import React from 'react'
import Head from "next/head";
import { Button, Typography } from "@mui/material";

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
        <div style={{maxWidth: "20.93rem",
  margin: "0 auto",
  width: "100%"}}>
          <div className="bs-icon-text">
            <div className="img-wrap">
              <span className="cm-image-placeholder"></span>
            </div>

            <div className="info-wrap">
              <div className="info-head">
                <Typography variant="h4">{errorHeading}</Typography>
              </div>

              <div className="info-cont">
                <Typography variant="subtitle2">{errorDescription}</Typography>
              </div>
            </div>

            <span className="cm-or">
              <Typography variant="subtitle3">{orText}</Typography>
            </span>

            <div className="action-wrap">
              <Typography variant="subtitle3" component="h5">
                {officerVisitText}
              </Typography>

              <Typography variant="subtitle2">{officerVisitDescription}</Typography>

              <Button variant="text" type="button" className="btn btn-proceed">
                {scheduleVisitLinkText}
              </Button>
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
}

export default kotak_21c