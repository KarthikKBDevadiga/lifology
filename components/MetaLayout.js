import React from 'react'
import Head from 'next/head'

const MetaLayout = ({ title, description }) => {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={description}></meta>

            {/* Twitter */}
            {/* <meta name="twitter:card" content="summary" key="twcard" />
            <meta name="twitter:creator" content="@lifologyofficial" key="twhandle" /> */}

            {/* Open Graph */}
            <meta property="og:url" content="https://www.ligology.com" key="ogurl" />
            <meta property="og:image" content="/img/logoBlue.png" key="ogimage" />
            <meta property="og:site_name" content="Lifology" key="ogsitename" />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta property="og:description" content={description} key="ogdesc" />
        </Head>
    )
}

export default MetaLayout
