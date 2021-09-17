import Link from 'next/link'
import styles from '/styles/Item.module.css'

const VideoMinItem = ({ video }) => {
    return (
        <Link
            href={'/career_explorer/career_video/' + video.id}>
            <a>
                <div className="flex hover:bg-gray-100 duration-500 px-4 py-2">
                    <div className="mr-4 flex-shrink-0 self-center">
                        <img className="w-20 h-12 rounded object-cover" src={video.thumbnail} />
                    </div>
                    <div className="self-center">
                        <div className={styles.heading} style={{
                            margin: '0px',
                        }}>{video.title}</div>
                        <div className={styles.subheading} style={{
                            margin: '0px',
                            fontSize: '0.75rem',
                            lineHeight: '1rem'
                        }}>
                            {video.description}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}
export default VideoMinItem