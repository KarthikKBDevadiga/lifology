import React from 'react'
import Link from 'next/link'

const DownloadLayout = () => {
    return (
        <div className="text-center" style={{ marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', paddingTop: 30 }}>
            <span className="px-2 bg-white text-center text-gray-900 font-extrabold">Download Our App</span>
            <div className="mt-1 grid grid-cols-2 gap-2" style={{ width: 300, marginTop: 16 }}>

                <a href="#">
                    <img src="img/play-store.png" />
                </a>
                <a href="#">
                    <img src="img/app-store.png" />
                </a>
            </div>
        </div>
    )
}

export default DownloadLayout
