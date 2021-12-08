import Link from 'next/link'
import styles from '/styles/Item.module.css'

const VideoItem = ({ video }) => {
    return (
        <Link href={'/career_explorer/career_video/' + video.id} key={video.id}>
            <a>
                <div className="group relative shadow mx-2 my-4 rounded m-1 hover:shadow-xl hover:scale-105 duration-500" >
                    <div>
                        <img className="rounded-t group-hover:filter-none duration-500 w-full h-32 object-cover" src={video.thumbnail} />
                        {/* <img className=" rounded-t " src={card.thumbnail} /> */}

                        {
                            video.purchase_status == 0 ?
                                <div className="flex p-3 flex items-center justify-between ">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
                                    <div className="flex-1 px-3 pb-2 text-sm ">
                                        <div className={styles.heading}>
                                            This Feature is Locked
                                        </div>
                                    </div>
                                </div> :
                                <div className="flex-1 flex items-center justify-between ">
                                    <div className="flex-1 px-3 pb-2 text-sm ">
                                        <div className={styles.heading}>
                                            {video.title}
                                        </div>
                                        <div className={styles.subheading}>{video.description}</div>
                                    </div>
                                </div>
                        }

                    </div>
                    {/* {
                        video.purchase_status == 0 ?
                            <svg className="absolute top-2 right-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none" /><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
                            : <></>
                    } */}

                </div>
            </a>
        </Link>
    )
}
export default VideoItem