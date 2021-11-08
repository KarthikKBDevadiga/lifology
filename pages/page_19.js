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
export default function Page19() {

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
                        <div className="font-bold m-8 text-xl">Select a plan and avail the membership benefits.</div>
                        <div className="m-8">

                            <RadioGroup value={selected} onChange={setSelected}>
                                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                <div className="space-y-4">
                                    {plans.map((plan) => (
                                        <RadioGroup.Option
                                            key={plan.name}
                                            value={plan}
                                            className={({ active }) =>
                                                'relative block rounded-lg border border-lgrey-border bg-lgrey shadow-sm px-4 py-3 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'
                                            }
                                        >
                                            {({ checked }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <div className="text-sm">
                                                            <RadioGroup.Label as="p" className="font-bold text-gray-900">
                                                                {plan.name}
                                                            </RadioGroup.Label>
                                                            <RadioGroup.Description as="div" className="text-gray-500">
                                                                {plan.description}
                                                            </RadioGroup.Description>
                                                        </div>
                                                    </div>
                                                    <RadioGroup.Description as="div" className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right self-center">
                                                        <div className="font-medium text-gray-900 text-xl text-lgreen">{plan.price}</div>
                                                    </RadioGroup.Description>
                                                    <div
                                                        className={classNames(
                                                            checked ? 'border-lgreen' : 'border-transparent',
                                                            'absolute -inset-px rounded-lg border-2 pointer-events-none'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="font-bold mx-8 mt-8 text-lg">Membership benefits</div>
                        <div className="flex mx-8 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lgreen mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div className="text-sm">Personalized career plan</div>
                        </div>
                        <div className="flex mx-8 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lgreen mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div className="text-sm">Extra support for more specific concerns</div>
                        </div>
                        <div className="flex mx-8 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lgreen mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div className="text-sm">Exclusive programs, events and guidance</div>
                        </div>
                        <div className="flex mx-8 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lgreen mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div className="text-sm">Unlimited one-on-one sessions</div>
                        </div>
                        <div className="flex mx-8 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lgreen mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div className="text-sm">Stay up to date and informed about the best-fit careers, industry trends, and future of careers</div>
                        </div>
                        <div className="flex mx-8 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lgreen mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div className="text-sm">Exclusive interaction with industry experts and free mentorship</div>
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

                                        <p>Start Free-Trial</p>
                                    </a>
                                </div>

                                <div>
                                    <a
                                        className="text-sm w-full rounded-full border border-lblue bg-gray-100 inline-flex px-4 py-2 justify-center text-lblue hover:border-indigo-700 hover:bg-lblue hover:text-white duration-500"
                                        onClick={() =>
                                            console.log('Hello')
                                        }
                                    >
                                        <p>Confirm Submission</p>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="text-center flex-1 flex flex-col mt-auto ml-auto mr-auto h-3/4 items-center" >

                    </div>
                </div>
                <div className="hidden lg:block w-1/2 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-screen bg-lblue">
                    <div className="mx-auto w-full max-w-md lg:w-96">

                    </div>

                </div>
            </div>

        </>
    )
}