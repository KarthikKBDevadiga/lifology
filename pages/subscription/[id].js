import { ApolloClient, InMemoryCache } from "@apollo/client"
import Constants from '../../helpers/Constants'

import { Fragment, useState } from 'react'

import { Dialog, RadioGroup, Transition } from '@headlessui/react'

import classNames from '/helpers/classNames'
import Link from 'next/link'

import MetaLayout from '../../components/MetaLayout'
import cookies from "next-cookies"
import { mutateGraph, queryGraph } from "../../helpers/GraphQLCaller"
import { SubscriptionList, SubscriptionPayment, SchemeGetProfile } from "../../helpers/GraphQLSchemes"
import LoadingDialog from "../../components/dialog/LoadingDialog"
import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"

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
export default function Page22({ plan, token, profile, redirect }) {
    const router = useRouter()

    const [selected, setSelected] = useState(plans[0])
    const [loadingDialog, setLoadingDialog] = useState(false)

    const [successDialog, setSuccessDialog] = useState(false)
    const [successDialogString, setSuccessDialogString] = useState('')
    const [errorDialog, setErrorDialog] = useState(false)
    const [errorDialogString, setErrorDialogString] = useState('')
    const [redirecetUrl, setRedirectUrl] = useState('')

    const proceedToPay = event => {
        setLoadingDialog(true)

        const client = new ApolloClient({
            uri: Constants.baseUrl + "/razorpay/payment",
            cache: new InMemoryCache(),
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        mutateGraph(client, { item_id: parseInt(plan.id) }, SubscriptionPayment)
            .then((res) => {
                console.log(res)
                setLoadingDialog(false)
                makePayment(res.createOrder);
            }).catch((networkErr) => {
                console.log('Error')
                setLoadingDialog(false)
            })
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function makePayment(order) {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        // console.log(order.id);
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        var options = {
            description: 'Buy Subscription',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: Constants.RAZOR_PAY_KEY,
            amount: order.amount,
            name: 'Lifology',
            order_id: order.id,
            prefill: {
                email: profile.email,
                contact: profile.mobile_number,
                name: profile.name
            },
            handler: async function (response) {
                console.log(response);
                setSuccessDialogString('Payment Completed Successfully')
                setSuccessDialog(true)
                if (redirect) {
                    const url = 'https://demo.lifology.com/paymentComplete?razorpay_payment_id=' + response['razorpay_payment_id']
                        + '&razorpay_order_id=' + response['razorpay_order_id']
                        + '&razorpay_signature=' + response['razorpay_signature'];
                    const data = 'https://lifology.page.link/?link=' + encodeURIComponent(url) + '&apn=com.app.lifology&isi=1574635714&ibi=com.septa.app.lifology'
                    setRedirectUrl(data)
                } else {
                    setRedirectUrl('/profile/page_94')
                }
                // setTimeout(() => {
                //     setSuccessDialog(false)
                //     if (redirect) {
                //         // { razorpay_payment_id: 'pay_IXeuWfyG1lDg5W', razorpay_order_id: 'order_IXeuJFYWPXmYTV', razorpay_signature: '06917a92437981f8d7597a0df032506652672c979059a8376302517d177c0c32' }
                //         const url = 'https://demo.lifology.com/paymentComplete?razorpay_payment_id=' + response['razorpay_payment_id']
                //             + '&razorpay_order_id=' + response['razorpay_order_id']
                //             + '&razorpay_signature=' + response['razorpay_signature'];
                //         const data = 'https://lifology.page.link/?link=' + encodeURIComponent(url) + '&apn=com.app.lifology&isi=1574635714&ibi=com.septa.app.lifology'
                //         console.log(data);
                //         window.open(data)
                //         // router.push({
                //         //     pathname: 'https://lifology.page.link',
                //         //     query: {
                //         //         link: url,
                //         //         apn: 'com.app.lifology',
                //         //         isi: '1574635714',
                //         //         ibi: 'com.septa.app.lifology'
                //         //     }
                //         // })
                //     } else {
                //         setRedirectUrl('/profile/page_94')
                //         // router.push({
                //         //     pathname: '/profile/page_94',
                //         // })
                //     }
                // }, 1000)
            },
            theme: { color: '#53a20e' }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.on('payment.failed', (response) => {
            console.log('Error')
            setErrorDialogString('Failed To Complete Payment')
            setErrorDialog(true)
        })
        paymentObject.open()
    }
    return (
        <>
            <MetaLayout title="Sign Up" description="Sign Up" />

            <div className="min-h-screen bg-white flex font-roboto" >
                <div className=" relative w-0 flex-1 leftloginbg overflow-auto h-screen" >

                    <div className="mx-auto w-full h-1/4" >
                        <div className="mt-8 ml-8 w-min flex">
                            <img src="/img/logoBlue.png" alt="Lifology" width="32px" className="ml-auto mr-auto text-lblue" />
                            <span className="self-center text-white font-bold pl-4 text-xl tracking-widest text-lblue">LIFOLOGY</span>
                        </div>
                        <div className="font-bold mx-8 mt-8 text-xl">Your plan details</div>

                        <div className='mx-8 my-4 relative block rounded-lg border border-lgrey-border bg-lgrey shadow-sm px-4 py-3 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'>
                            <div className="flex items-center">
                                <div className="text-sm">
                                    <p className="font-bold text-gray-900">
                                        {plan.title}
                                    </p>
                                    <p as="div" className="text-gray-500">
                                        {plan.description}
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
                            <div className="w-1/2 text-right">Rs. {plan.price}</div>
                        </div>
                        {/* <div className="flex mx-10 mt-2">
                            <div className="w-1/2">Super saver</div>
                            <div className="w-1/2 text-right">- Rs. 100.00</div>
                        </div> */}
                        {/* <div className="flex mx-10 mt-2">
                            <div className="w-1/2">Discount</div>
                            <div className="w-1/2 text-right">- Rs. 50.00</div>
                        </div> */}
                        <div className="border border-dashed mx-8 mt-4"></div>
                        <div className="flex mx-10 mt-2 font-bold">
                            <div className="w-1/2">Total</div>
                            <div className="w-1/2 text-right">Rs. {plan.price}</div>
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
                                        className="cursor-pointer text-sm w-full rounded-full border border-lblue bg-gray-100 inline-flex px-4 py-2 justify-center text-lblue hover:border-indigo-700 hover:bg-lblue hover:text-white duration-500"
                                        onClick={() => proceedToPay()}
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
                <div className="hidden lg:block w-1/2 flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-screen bg-lblue" style={{ background: 'url(/img/right_banner.jpeg) no-repeat center center fixed', backgroundSize: 'cover' }}>
                    <div className="mx-auto w-full max-w-md lg:w-96">
                    </div>
                </div>
            </div>

            <LoadingDialog showDialog={loadingDialog} setShowDialog={setLoadingDialog} />
            <Transition.Root show={successDialog} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={successDialog} onClose={setSuccessDialog}>
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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-4">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            {successDialogString}
                                        </Dialog.Title>
                                        <button className="absolute h-0 w-0 overflow-hidden" />
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <Link href={redirecetUrl}>
                                        <a className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                            Redirect To Application
                                        </a>
                                    </Link>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={errorDialog} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={errorDialog} onClose={setErrorDialog}>
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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            {errorDialogString}
                                        </Dialog.Title>
                                        <button className="absolute h-0 w-0 overflow-hidden" />
                                    </div>
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
    const { token } = cookies(context)
    const redirect = context.query.redirect

    if (token == null || token == '') {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
    const client = new ApolloClient({
        uri: Constants.baseUrl + "/razorpay/payment",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const plans = await queryGraph(client, {}, SubscriptionList)
        .then((res) => {
            return res.plans
        }).catch((networkErr) => {
            return [];
        })
    const plan = plans.find(({ id }) => id === context.params.id)
    console.log(plan);

    const profileClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
        });
    return {
        props: {
            plan, token, profile, redirect
        },
    };
}