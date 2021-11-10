import { ApolloClient, InMemoryCache } from "@apollo/client"
import Constants from '../helpers/Constants'

import { useState } from 'react'

import { RadioGroup } from '@headlessui/react'

import classNames from '/helpers/classNames'

import MetaLayout from '../components/MetaLayout'

const client = new ApolloClient({
    uri: Constants.baseUrl + "/api/auth",
    cache: new InMemoryCache(),
});

// const plans = [
//     { name: 'Hobby', ram: '8GB', cpus: '4 CPUs', disk: '160 GB SSD disk', price: '$40' },
//     { name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256 GB SSD disk', price: '$80' },
//     { name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512 GB SSD disk', price: '$160' },
//     { name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1024 GB SSD disk', price: '$240' },
// ]
const plans = [
    { name: 'Yearly', description: 'Get unlimited access to all our programs for an year.', price: 'Rs. 7999/year' },
    { name: 'Quarterly', description: 'Get unlimited access to all our programs for a quarter.', price: 'Rs. 2999/quarter' },
    { name: 'Monthly', description: 'Get unlimited access to all our programs for a month.', price: 'Rs.999/month' }
]
export default function Page22() {

    const [selected, setSelected] = useState(plans[0])
    return (
        <>
            <MetaLayout title="Sign Up" description="Sign Up" />

            <div className="min-h-screen bg-white flex font-roboto" >
                <div className=" relative w-0 flex-1 leftloginbg overflow-auto h-screen" >

                    <div className="mx-auto w-full h-1/4" >
                        <div className="mt-8 ml-8 w-min flex">
                            <img src="img/logoBlue.png" alt="Lifology" width="32px" className="ml-auto mr-auto text-lblue" />
                            <span className="self-center text-white font-bold pl-4 text-xl tracking-widest text-lblue">LIFOLOGY</span>
                        </div>
                        <div className="font-bold mx-8 mt-8 text-xl">Your plan details</div>

                        <div className='mx-8 my-4 relative block rounded-lg border border-lgrey-border bg-lgrey shadow-sm px-4 py-3 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'>
                            <div className="flex items-center">
                                <div className="text-sm">
                                    <p className="font-bold text-gray-900">
                                        Monthly
                                    </p>
                                    <p as="div" className="text-gray-500">
                                        Get unlimited access to all our programs for a month.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="font-bold mx-8 mt-8 text-xl">Apply Coupon</div>

                        <div className="sm:flex sm:items-start sm:justify-between mx-8 mt-4">
                            <div className="w-full">
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        id="name"
                                        name="name"
                                        type="name"
                                        autoComplete="name"
                                        placeholder="Coupon Code"
                                        className="border-gray-200 focus:border-indigo-700 rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border  duration-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                                <div>
                                    <a
                                        className="text-sm w-full rounded-full border border-lblue bg-gray-100 inline-flex px-4 py-2 justify-center text-lblue hover:border-indigo-700 hover:bg-lblue hover:text-white duration-500"
                                        onClick={() =>
                                            console.log('Hello')
                                        }
                                    >

                                        <p>APPLY</p>
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className="font-bold mx-8 mt-8 text-xl">Bill Details</div>

                        <div className="flex mx-10 mt-4">
                            <div className="w-1/2">Membership Charge</div>
                            <div className="w-1/2 text-right">Rs. 1,000.00</div>
                        </div>
                        <div className="flex mx-10 mt-2">
                            <div className="w-1/2">Super saver</div>
                            <div className="w-1/2 text-right">- Rs. 100.00</div>
                        </div>
                        <div className="flex mx-10 mt-2">
                            <div className="w-1/2">Discount</div>
                            <div className="w-1/2 text-right">- Rs. 50.00</div>
                        </div>
                        <div className="border border-dashed mx-8 mt-4"></div>
                        <div className="flex mx-10 mt-2 font-bold">
                            <div className="w-1/2">Total</div>
                            <div className="w-1/2 text-right">Rs. 850.00</div>
                        </div>


                        <div className="p-8">
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <a
                                        className="text-sm w-full rounded-full border border-lblue bg-gray-100 inline-flex px-4 py-2 justify-center text-lblue hover:border-indigo-700 hover:bg-lblue hover:text-white duration-500"
                                        onClick={() =>
                                            console.log('Hello')
                                        }
                                    >

                                        <p>Cancel</p>
                                    </a>
                                </div>

                                <div>
                                    <a
                                        className="text-sm w-full rounded-full border border-lblue bg-gray-100 inline-flex px-4 py-2 justify-center text-lblue hover:border-indigo-700 hover:bg-lblue hover:text-white duration-500"
                                        onClick={() =>
                                            console.log('Hello')
                                        }
                                    >
                                        <p>Proceed to Pay</p>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="text-center flex-1 flex flex-col mt-auto ml-auto mr-auto h-3/4 items-center" >

                    </div>
                </div>
                <div className="hidden lg:block w-1/2 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-screen bg-lblue" style={{ background: 'url(img/right_banner.jpeg) no-repeat center center fixed', backgroundSize: 'cover' }}>
                    <div className="mx-auto w-full max-w-md lg:w-96">

                    </div>

                </div>
            </div>

        </>
    )
}