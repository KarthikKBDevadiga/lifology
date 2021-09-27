import React from 'react'
import Link from 'next/link'
import classNames from '/helpers/classNames'


const Breadcrumbs = ({ pages }) => {
    return (
        <div className="shadow m-4 px-4 py-3 rounded-md  bg-white">
            <ol className="flex items-center space-x-4">
                <li>
                    <Link href={'/'}>
                        <a>
                            <div className="text-gray-400 hover:text-gray-500 duration-500">
                                <svg className="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
                                </svg>
                                {/* <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" /> */}
                                <span className="sr-only">Home</span>
                            </div>
                        </a>
                    </Link>
                </li>
                {pages.map((page) => (
                    <li key={page.name}>
                        <div className="flex items-center">
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z" />
                            </svg>
                            <Link
                                href={page.href}>
                                <a
                                    className={
                                        classNames("ml-4 text-sm font-medium hover:text-gray-700", page.current ? 'text-black' : 'text-gray-500')
                                    }
                                    aria-current={page.current ? 'page' : undefined}
                                >
                                    {page.name}
                                </a>
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Breadcrumbs
