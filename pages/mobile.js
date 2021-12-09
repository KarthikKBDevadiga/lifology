import { useEffect } from 'react'
import localforage from "localforage"

export default function Mobile({ token }) {
    useEffect(() => {
        localforage.setItem('token', token)
        document.cookie = 'token=' + token + ';expires=3600;'
        router.push({
            pathname: '/subscription',
        })
    }, [])
    return (
        <div></div>
    );
}

export async function getServerSideProps(context) {

    const token = context.query.token ? context.query.token : '';
    return {
        props: {
            token
        }
    }
}