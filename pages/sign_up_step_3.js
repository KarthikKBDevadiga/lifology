import { Fragment, useState } from 'react'
import { Listbox, Transition, Dialog } from '@headlessui/react'
import { CheckIcon, SelectorIcon, ExclamationIcon } from '@heroicons/react/solid'
import DownloadLayout from '../components/DownloadLayout'
import { RadioGroup } from '@headlessui/react'
import { ApolloClient, InMemoryCache } from "@apollo/client"
import Constants from '../helpers/Constants'
import { queryGraph, mutateGraph } from '../helpers/GraphQLCaller'
import { SchemeGetGrades, SchemeGetPref, SchemeSignUp } from '../helpers/GraphQLSchemes'
import styles from '../styles/Signup.module.css'
import { useRouter } from 'next/router'
import Step from '../components/Step'
import ProgressBar from '../components/ProgressBar'
import useLocalStorage from '../components/useLocalStorage'

const schools = [

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const client = new ApolloClient({
    uri: Constants.baseUrl + "/api/auth",
    cache: new InMemoryCache(),
});

const prefClient = new ApolloClient({
    uri: Constants.baseUrl + '/api/category',
    cache: new InMemoryCache(),
})

export default function SignUpStep3({ grades, prefs }) {

    const [loadingDialog, setLoadingDialog] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const [parentName, setParentName] = useLocalStorage("parentName", "");
    const [parentEmail, setParentEmail] = useLocalStorage("parentEmail", "");
    const [childName, setChildName] = useLocalStorage("childName", "");
    const [childGender, setChildGender] = useLocalStorage("childGender", "");
    const [mobile, setMobile] = useLocalStorage("mobile", "");

    const router = useRouter()
    const [selected, setSelected] = useState({})
    const [selectedGrade, setSelectedGrade] = useState(grades[0])
    const [streams, setStreams] = useState([]);
    const [selectedStream, setSelectedStream] = useState(selectedGrade.streams.length == 0 ? {} : selectedGrade.streams[0])
    const [prefsList, setPrefsList] = useState([])

    const [prefDialog, setPrefDialog] = useState(false)

    const submit = event => {
        event.preventDefault()
        console.log(selectedGrade.grade)
        console.log(selectedStream.stream)
        setPrefDialog(true)
    }

    const signup = event => {
        event.preventDefault()
        console.log('here' + parentEmail + parentName + childName + childGender + selectedGrade.grade + prefsList
        )
        setPrefDialog(false)
        setLoadingDialog(true)

        mutateGraph(client,
            {
                mobile_number: mobile,
                email: parentEmail,
                name: parentName,
                child_name: childName,
                gender: childGender,
                grade: selectedGrade.grade,
                stream_id: selectedStream == null ? -1 : parseInt(selectedStream.id),
                preferences: prefsList.toString()
            }, SchemeSignUp)
            .then((res) => {
                console.log(res);
                setLoadingDialog(false)
                setAuthToken(res.signup.auth_token)
                router.push({
                    pathname: 'career_explorer',
                })
                // if (res.sendOtp) {
                //     setLoadingDialog(false)
                //     setTab(2)
                //     setTimeLeft(30)
                // }
            }).catch((networkErr) => {
                // setLoadingDialog(false)
                console.log(networkErr)
            });
    }
    const onChangePref = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        var list = prefsList;
        console.log(value);
        if (list.includes(target.id) && !value) {
            // list.remove(target.id)
            var index = list.indexOf(target.id);
            if (index > -1) {
                list.splice(index, 1);
            }
        } else if (!list.includes(target.id) && value) {
            list.push(target.id)
        }
        setPrefsList(list)

        console.log(list.includes(1));
    }
    console.log(prefs);

    return (
        <>
            <div className="min-h-screen bg-white flex font-roboto" >
                <div className="hidden lg:block relative w-0 flex-1 leftloginbg" style={{ background: '#21AAED', overflow: 'hidden' }}>

                    <div className="mx-auto w-full" style={{ height: "25%" }}>
                        <div className="mt-1" style={{ width: 'fit-content', marginTop: 32, marginLeft: 'auto', marginRight: 'auto', display: 'flex' }}>
                            <img src="img/logoWhite.png" alt="Lifology" width="48px" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                            <span style={{
                                alignSelf: 'center', color: 'white',
                                fontWeight: 'bold',
                                letterSpacing: '4px',
                                fontSize: '20px',
                                paddingLeft: '16px'
                            }}>LIFOLOGY</span>
                        </div>
                        <p className="text-center text-white text-xl" style={{ marginTop: 32 }}>Building the world's best Super Parent Community</p>
                    </div>
                    <div className="text-center flex-1 flex flex-col " style={{ marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', height: '75%', alignItems: 'center' }}>
                        <img className="absolute glsignimg" src="img/signup-left-view.png" alt="" style={{ height: "70%" }} />
                    </div>

                </div>

                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">

                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ textAlign: 'center' }}>Complete your profile</h2>

                            <Step index="3" />

                        </div>

                        <div className="mt-8">


                            <div className="mt-6">


                                <form onSubmit={submit} className="space-y-6" style={{ marginTop: 16 }}>

                                    <Listbox value={selected} onChange={setSelected}>
                                        {({ open }) => (
                                            <>
                                                <div>
                                                    <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ fontSize: 16 }}>3. Add Your School</h2>
                                                </div>
                                                <div className="mt-1 relative" style={{ marginTop: 8 }}>
                                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{ borderRadius: 30, height: 40, backgroundColor: '#F8F8F8', borderColor: '#F2F2F2' }}>
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
                                                            {
                                                                schools.length > 0 ?
                                                                    schools.map((person) => (
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
                                                                    )) : <Listbox.Option
                                                                        key='no_data'
                                                                        className={({ active }) =>
                                                                            classNames(
                                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                            )
                                                                        }
                                                                        value="No Data">
                                                                        <span className={classNames('font-normal', 'block truncate')}>
                                                                            No Data
                                                                        </span>
                                                                    </Listbox.Option>
                                                            }
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>

                                    <Listbox value={selectedGrade} onChange={(grade) => {
                                        setSelectedGrade(grade)
                                        setSelectedStream(grade.streams.length == 0 ? {} : grade.streams[0])
                                        setStreams(grade.streams)
                                    }}>
                                        {({ open }) => (
                                            <>
                                                <div>
                                                    <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ fontSize: 16 }}>4. Choose Grade / Year</h2>
                                                </div>
                                                <div className="mt-1 relative" style={{ marginTop: 8 }}>
                                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{ borderRadius: 30, height: 40, backgroundColor: '#F8F8F8', borderColor: '#F2F2F2' }}>
                                                        <span className="block truncate">{selectedGrade.grade}</span>
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
                                                            {grades.map((grade) => (
                                                                <Listbox.Option
                                                                    key={grade.id}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                            'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                        )
                                                                    }
                                                                    value={grade}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                {grade.grade}
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

                                    <Listbox value={selectedStream} onChange={setSelectedStream}>
                                        {({ open }) => (
                                            <>
                                                <div>
                                                    <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto" style={{ fontSize: 16 }}>5. Choose Stream</h2>
                                                </div>
                                                <div className="mt-1 relative" style={{ marginTop: 8 }}>
                                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style={{ borderRadius: 30, height: 40, backgroundColor: '#F8F8F8', borderColor: '#F2F2F2' }}>
                                                        <span className="block truncate">{selectedStream.stream}</span>
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
                                                            {
                                                                streams.length > 0 ?
                                                                    streams.map((stream) => (
                                                                        <Listbox.Option
                                                                            key={stream.id}
                                                                            className={({ active }) =>
                                                                                classNames(
                                                                                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                    'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                                )
                                                                            }
                                                                            value={stream}
                                                                        >
                                                                            {({ selected, active }) => (
                                                                                <>
                                                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                        {stream.stream}
                                                                                    </span>


                                                                                </>
                                                                            )}
                                                                        </Listbox.Option>
                                                                    )) : <Listbox.Option
                                                                        key='no_data'
                                                                        className={({ active }) =>
                                                                            classNames(
                                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                                            )
                                                                        }
                                                                        value="No Data">
                                                                        <span className={classNames('font-normal', 'block truncate')}>
                                                                            No Data
                                                                        </span>
                                                                    </Listbox.Option>
                                                            }
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>

                                    <div className="mt-1 grid grid-cols-2 gap-2" style={{ marginTop: 16 }}>

                                        <button
                                            onClick={() => {
                                                router.push({
                                                    pathname: 'sign_up_step_2',
                                                });
                                            }}
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
                                        </button>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            style={{
                                                borderRadius: 60
                                            }}
                                        >
                                            Finish
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                    <DownloadLayout />

                </div>
            </div >
            <Transition.Root show={prefDialog} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    open={prefDialog}
                    onClose={setPrefDialog}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" style={{ width: '80%', maxWidth: '100%', paddingLeft: '3rem', paddingRight: '3rem' }}>

                                <form onSubmit={signup} >

                                    <div className="sm:flex sm:items-start">
                                        {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div> */}
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Select Prefrences
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Select at least 3 Functional areas of growth you want to focus on. we'll customize the app to suit your needs.
                                                </p>
                                            </div>
                                            <div className="mt-2" style={{ marginTop: '16px', fontSize: '16px' }}>
                                                <p className="text-sm font-medium text-gray-900 " style={{ fontSize: '16px' }}>
                                                    Choose Prefrences
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ margin: '16px' }}>
                                        {/* Card */}
                                        {prefs.map((card) => (
                                            <div className={styles.checkvalue}>

                                                <div class="flex-1">
                                                    <input type="checkbox" id={card.id} name="prefs" onChange={onChangePref} />
                                                    <label for={card.id}>
                                                        <img className={styles.checkimg} src={card.image} alt="" />
                                                        <div className={styles.labelwr}>
                                                            {card.title} <span>{card.description}</span>
                                                        </div>
                                                        <div className={styles.chooseprefrence}>
                                                            <img src="../img/choose_prefrence.svg" alt="Choosse" />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                        {/* <SelectPrefrences /> */}
                                    </div>

                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        // onClick={() => setPrefDialog(false)}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => setPrefDialog(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={loadingDialog} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={loadingDialog} onClose={setLoadingDialog}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                                style={{ width: 'fit-content' }}
                            >

                                <div className="sm:flex sm:items-start" style={{ margin: '16px' }}>

                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        {/* <Step /> */}
                                        <ProgressBar />
                                    </div>
                                    <button className="h-0 w-0 overflow-hidden" />

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

        </>
    )
}

export async function getServerSideProps(context) {
    const grades = await queryGraph(client, {}, SchemeGetGrades)
        .then((res) => {
            return res.grades;
        }).catch((networkErr) => {
            return [];
        });
    const prefs = await queryGraph(prefClient, {}, SchemeGetPref)
        .then((res) => {
            return res.preferences;
        }).catch((networkErr) => {
            return [];
        });
    return {
        props: {
            grades,
            prefs
        }
    };
}