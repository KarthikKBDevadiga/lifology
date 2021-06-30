import { useState } from 'react'
import {
    ClockIcon,
    CreditCardIcon,
    HomeIcon,
    ScaleIcon,
    UserGroupIcon,
} from '@heroicons/react/outline'
import { queryGraph } from '../../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetCareerFamilies, SchemeGetGrades, SchemeGetProfile } from '../../helpers/GraphQLSchemes'
import Constants from '../../helpers/Constants.js'
import useLocalStorage from '../../components/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../../components/NavigationLayout'
import HeaderLayout from '../../components/HeaderLayout'

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: true },
    { name: 'My Child', href: '#', icon: ClockIcon, current: false },
    { name: 'Services', href: '#', icon: ScaleIcon, current: false },
    { name: 'Career Explorer', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Lifology Hub', href: '#', icon: UserGroupIcon, current: false },
]
const cards = [
    { name: 'Job Families & Career Fields', href: 'career_explorer/job_families', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Course and University', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Scholarship Program', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Magazine', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Career Videos', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    // More items...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function JobFamilies({ families, profile }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    return (
        <>
            <div className="h-screen flex overflow-hidden bg-gray-100">

                <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

                <div className="flex-1 overflow-auto focus:outline-none" >
                    <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Career Explorer / Job Families & Career Fields" />

                    <main className="flex-1 relative z-0 overflow-y-auto">

                        <div className="mt-8" style={{ margin: '16px' }}>

                            {/* Activity table (small breakpoint and up) */}
                            <div className="max-w-6xl mx-auto">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
                                        style={{ padding: '16px', background: 'white' }}>
                                        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                            {/* Card */}
                                            {families.map((card) => (
                                                <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg"
                                                    style={{ backgroundImage: `url(${card.image})`, height: '200px', position: 'relative' }}
                                                >
                                                    <img src="/img/bg_vertical.png" style={{ position: 'absolute', bottom: '0px' }} />
                                                    <div className="p-5" style={{ position: 'absolute', bottom: '0' }}>
                                                        <div style={{ fontSize: '16px', color: 'white', width: '100%', fontWeight: '500' }}>{card.name}</div>
                                                        <div style={{ width: '40px', height: '2px', background: '#FFC400', borderRadius: '1px', marginTop: '8px' }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <footer style={{ boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.3)', padding: '16px' }}>
                            <div style={{ textAlign: 'center', fontWeight: '500' }}>Copyright © 2021 Septa Milles Pvt Ltd. All Rights Reserved</div>
                        </footer>
                    </main>
                </div>


            </div >
        </>
    )
}
// JobFamilies.getInitialProps = async (context) => {
// const [authToken, setAuthToken] = useLocalStorage("authToken", "")
// }

export async function getServerSideProps(context) {
    const { token } = context.query;
    const familiesClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/career",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const families = await queryGraph(familiesClient, {}, SchemeGetCareerFamilies)
        .then((res) => {
            return res.careerPools
        }).catch((networkErr) => {
            return [];
        });
    const profileClient = new ApolloClient({
        uri: Constants.baseUrl + "/api/user",
        cache: new InMemoryCache(),
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
        .then((res) => {
            return res.profile
        }).catch((networkErr) => {
            return {};
            // console.log(networkErr);
        });
    return {
        props: { families, profile }
    }
}


