import Link from 'next/link'
import classNames from '/helpers/classNames'

const ShareButton = ({ url, href, logo, loading }) => {
    return (
        <Link href={href}>
            <a target="_blank" className="outline-none mx-1 my-2 shadow hover:shadow-2xl hover:scale-105 duration-300">
                <img src={logo} className={
                    classNames(
                        'w-8 h-8',
                        loading ? 'opacity-30' : ''
                    )
                } />
            </a>
        </Link>
    )
}
export default ShareButton