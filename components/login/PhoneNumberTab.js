import React from 'react'
import { XCircleIcon, XIcon, CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import classNames from '/helpers/classNames'

const PhoneNumberTab = ({ submit, error, setError, countries, selectedCountry, setSelectedCountry }) => {
    return (
        <div className="mt-6">
            <form onSubmit={submit} className="space-y-6">
                <div>
                    {/* <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center m-px">
                            <label htmlFor="country" className="sr-only">
                                Country
                            </label>
                            <select
                                id="country"
                                name="country"
                                className="appearance-none bg-gray-200 h-full py-0 px-3 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-l-full outline-none"
                            >
                                <option>+91</option>
                                <option>+92</option>
                                <option>+93</option>
                            </select>
                        </div>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            maxLength="10"
                            className="bg-gray-100 block w-full px-3 py-2 pl-14 sm:text-sm rounded-full outline-none border focus:border-indigo-700 duration-500"
                            placeholder="Enter Mobile number"
                            onKeyPress={() => {
                                setError('')
                            }}
                        />
                    </div> */}
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center m-px">
                            <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                                {({ open }) => (
                                    <>
                                        <div className="m-px relative h-full">
                                            <Listbox.Button className="relative w-32 bg-gray-200 rounded-l-full pl-3 pr-10 py-0 h-full text-left cursor-default focus:outline-none sm:text-sm">
                                                <span className="flex items-center">
                                                    <img src={selectedCountry.flag} alt="" className="flex-shrink-0 h-6 w-6 rounded-full object-cover" />
                                                    <span className="ml-3 block truncate">{selectedCountry.callingCodes}</span>
                                                </span>
                                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </span>
                                            </Listbox.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options
                                                    static
                                                    className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                >
                                                    {countries.map((person) => (
                                                        <Listbox.Option
                                                            key={person.id}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                    'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                )
                                                            }
                                                            value={person}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <div className="flex items-center">
                                                                        <img src={person.flag} alt="" className="flex-shrink-0 h-6 w-6 rounded-full object-cover" />
                                                                        <span
                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                        >
                                                                            {person.alpha2Code}
                                                                        </span>
                                                                    </div>

                                                                    {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'text-white' : 'text-indigo-600',
                                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                            )}
                                                                        >
                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </>
                                )}
                            </Listbox>
                        </div>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            maxLength="10"
                            className="bg-gray-100 block w-full px-3 py-2 pl-36 sm:text-sm rounded-full outline-none border focus:border-indigo-700 duration-500"
                            placeholder="Enter Mobile number"
                            onKeyPress={() => {
                                setError('')
                            }}
                        />
                    </div>
                </div>

                {
                    error.length == 0 ? <></> :
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">Invalid Phone number</p>
                                </div>
                                <div className="ml-auto pl-3">
                                    <div className="-mx-1.5 -my-1.5">
                                        <button
                                            type="button"
                                            className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                                            onClick={() => { setError('') }}
                                        >
                                            <span className="sr-only">Dismiss</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                }


                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue hover:bg-indigo-700 focus:outline-none">
                        Login with OTP
                    </button>
                </div>

                <div className="flex items-center">

                    <div className="text-sm m-auto">
                        By accepting all <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            terms
                        </a> and <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            conditions
                        </a>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default PhoneNumberTab
