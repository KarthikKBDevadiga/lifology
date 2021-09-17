import Link from 'next/link'

const ShareButton = ({ url, href, logo }) => {
    return (
        <Link href={href}>
            <a target="_blank" className="outline-none mx-1 my-2 shadow hover:shadow-2xl hover:scale-105 duration-300">
                <img src={logo} className="w-8 h-8" />
            </a>
        </Link>
    )
}
export default ShareButton