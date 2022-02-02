import { useEffect } from 'react'
import localforage from "localforage"
import { useRouter } from 'next/router'

export default function Mobile({ token, device }) {
    const router = useRouter()
    useEffect(() => {
        localforage.setItem('token', token)
        document.cookie = 'token=' + token + ';expires=3600;'
        router.push({
            pathname: '/subscription',
            query: { redirect: true, device: device }

        })
    }, [])
    return (
        <div></div>
    );
}

export async function getServerSideProps(context) {

    const token = context.query.token ? context.query.token : '';
    const device = context.query.device ? context.query.device : '';
    return {
        props: {
            token, device
        }
    }
}