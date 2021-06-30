import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import styles from '../../styles/Signup.module.css'

const schools = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SignUpTab3 = ({ next }) => {
    const [selected, setSelected] = useState(schools[3])
    return (
        <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
                <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ textAlign: 'center' }}>Complete your profile</h2>
                <nav aria-label="Progress" style={{ marginTop: 32 }}>
                    <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                        <li key="1" className="md:flex-1">
                            <a
                                href="#"
                                className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                                <span className="text-sm font-medium">Parent's Detail</span>
                            </a>
                        </li>
                        <li key="2" className="md:flex-1">
                            <a
                                href="#"
                                className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                                <span className="text-sm font-medium">Child Detail</span>
                            </a>
                        </li>
                        <li key="3" className="md:flex-1">
                            <a
                                href="#"
                                className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                                <span className="text-sm font-medium">Choose Grade</span>
                            </a>
                        </li>

                    </ol>
                </nav>
            </div>

            <div className="mt-8">


                <div className="mt-6">


                    <form onSubmit={() => { }} className="space-y-6" style={{ marginTop: 16 }}>

                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <>
                                    <div>
                                        <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ fontSize: 16 }}>3. Add Your School</h2>
                                    </div>
                                    <div className="mt-1 relative">
                                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{ borderRadius: 30 }}>
                                            <span className="block truncate">{selected.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                                                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                            >
                                                {schools.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {person.name}
                                                                </span>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
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

                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <>
                                    <div>
                                        <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ fontSize: 16 }}>4. Choose Grade / Year</h2>
                                    </div>
                                    <div className="mt-1 relative">
                                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{ borderRadius: 30 }}>
                                            <span className="block truncate">{selected.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                                                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                            >
                                                {schools.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {person.name}
                                                                </span>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
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

                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <>
                                    <div>
                                        <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ fontSize: 16 }}>5. Choose Stream</h2>
                                    </div>
                                    <div className="mt-1 relative">
                                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{ borderRadius: 30 }}>
                                            <span className="block truncate">{selected.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                                                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                            >
                                                {schools.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {person.name}
                                                                </span>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
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

                        <div className="mt-1 grid grid-cols-2 gap-2" style={{ marginTop: 16 }}>

                            <a
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                                style={{
                                    borderRadius: 60,
                                    borderWidth: '1px',
                                    borderColor: '#085CA4',
                                    background: 'white',
                                    color: '#085CA4',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem',
                                    paddingLeft: '1rem',
                                    paddingRight: '1rem',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                Previous
                            </a>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                style={{
                                    borderRadius: 60
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpTab3
