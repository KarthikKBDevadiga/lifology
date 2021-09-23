import { ApolloClient, InMemoryCache } from "@apollo/client"
import Constants from '/helpers/Constants'
import { SchemeCheckSocial } from '/helpers/GraphQLSchemes'
import { queryGraph } from '/helpers/GraphQLCaller'
import { useRouter } from 'next/router'

import localforage from "localforage"
import { signIn, signOut, useSession } from "next-auth/client";
import useLocalStorage from "../helpers/useLocalStorage"
import ProgressBar from '../components/ProgressBar'

export default function Auth() {
    const router = useRouter()
    const [session, loading] = useSession()
    const [parentName, setParentName] = useLocalStorage("parentName", "")
    const [parentEmail, setParentEmail] = useLocalStorage("parentEmail", "")
    if (session) {
        console.log('Logged In')
        console.log(session)
        // socialLogin(session.id, session.user.email, session.user.name)

        const client = new ApolloClient({
            uri: Constants.baseUrl + "/api/auth",
            cache: new InMemoryCache(),
        })
        queryGraph(client, { social_id: session.id, email: session.user.email, }, SchemeCheckSocial)
            .then((res) => {
                console.log(res.checkSocial)
                if (res.checkSocial.is_user_exist) {
                    setSuccessDialogString('Login Successful')
                    setSuccessDialog(true)
                    setTimeout(() => {
                        setSuccessDialog(false)
                        localforage.setItem('token', res.checkSocial.auth_token)
                        document.cookie = 'token=' + res.checkSocial.auth_token + ';expires=3600;'
                        router.push({
                            pathname: router?.query?.redirect ? router?.query?.redirect : '/',
                        })
                    }, 1000)
                    setAuthToken(res.checkSocial.auth_token)
                } else {
                    setParentName(session.user.name);
                    setParentEmail(session.user.email);
                    router.push({
                        pathname: 'sign_up_step_2',
                    })
                    console.log('error')
                }
            }).catch((networkErr) => {
                console.log(networkErr)
            })
    } else {
        // router.push({
        //     pathname: 'login',
        // })
    }

    return (
        <div>
            <ProgressBar />
        </div>
    )
}