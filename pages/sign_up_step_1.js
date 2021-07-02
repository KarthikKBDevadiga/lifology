import DownloadLayout from '../components/DownloadLayout';
import { useRouter } from 'next/router'
import useLocalStorage from '../helpers/useLocalStorage';
import Step from '../components/Step';

export default function SignUpStep1() {
    const [parentName, setParentName] = useLocalStorage("parentName", "");
    const [parentEmail, setParentEmail] = useLocalStorage("parentEmail", "");
    const router = useRouter()
    const submit = event => {
        event.preventDefault() // don't redirect the page
        // where we'll add our form logic
        // console.log('Login' + event.target.phone.value);
        // phoneNumber = event.target.phone.value;
        setParentName(event.target.name.value);
        setParentEmail(event.target.email.value);

        router.push({
            pathname: 'sign_up_step_2',
        });

    }

    return (
        <div className="min-h-screen bg-white flex font-roboto" >
            <div className="hidden lg:block relative w-0 flex-1 leftloginbg overflow-hidden" style={{ background: '#21AAED' }}>

                <div className="mx-auto w-full h-1/4" >
                    <div className="mt-8 ml-auto mr-auto w-min flex">
                        <img src="img/logoWhite.png" alt="Lifology" width="48px" className="ml-auto mr-auto" />
                        <span className="self-center text-white font-bold pl-4 text-xl tracking-widest">LIFOLOGY</span>
                    </div>
                    <p className="text-center text-white text-xl mt-8" >Building the world's best Super Parent Community</p>
                </div>
                <div className="text-center flex-1 flex flex-col mt-auto ml-auto mr-auto h-3/4 items-center" >

                    <img className="absolute glsignimg h-3/4" src="img/signup-left-view.png" alt="" /> :

                </div>

            </div>

            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">

                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto text-center">Complete your profile</h2>

                        <Step index="1" />
                    </div>

                    <div className="mt-8">


                        <div className="mt-6">

                            <div>
                                <h2 className="mt-6 text-xl font-extrabold text-gray-900 text-align-center font-roboto text-xl">1. Parent's Detail</h2>
                                <p className="mt-2 text-sm text-gray-600 font-roboto text-sm">
                                    Please enter the following details
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6 mt-4">
                                <div>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="name"
                                            autoComplete="name"
                                            placeholder="Your Full Name"
                                            required
                                            className="rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500"
                                        />
                                    </div>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="Email address"
                                            required
                                            className="rounded-full bg-gray-100 px-3 py-2 text-sm w-full outline-none border focus:border-indigo-700 duration-500 mt-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <DownloadLayout />

            </div>
        </div>
    )
}