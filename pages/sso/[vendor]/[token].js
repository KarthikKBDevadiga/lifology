
import { useRouter } from 'next/router'

import localforage from "localforage"
import { useEffect } from 'react';

var FormData = require('form-data');
// function getVideoId(url) {
//     var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/
//     var match = url.match(regExp);
//     if (match) {
//         return match[2]
//     }
//     return ''
// }

export default function CareerVideoDetail({ auth_token, is_new_user }) {

  const router = useRouter()
  console.log('Hllo ' + auth_token)
  useEffect(() => {
    const doMyAxiosCall = async () => {
      localforage.setItem('token', auth_token)
      document.cookie = 'token=' + auth_token + ';expires=3600;path=/'
      if (is_new_user)
        router.push({ pathname: '/preference' })
      else {
        let pathname = '/'
        if (router?.query?.redirect != null)
          switch (router?.query?.redirect) {
            case 'dashboard': pathname = '/'
              break
            case 'subscription': pathname = '/subscription'
              break
          }
        router.push({
          pathname
        })
      }
    }
    doMyAxiosCall();

    // setAuthToken(auth_token)
  }, [])
  return (
    <>
    </>
  )
}

export async function getServerSideProps(context) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("vendor_id", context.params.vendor);
  urlencoded.append("token", context.params.token);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  const data = await fetch("https://api.lifology.com/api/sso-verification", requestOptions)
    .then(response => {
      return response.json()
    })
    .then(result => {
      return result
    })
    .catch(error => console.log('error', error));

  return {
    props: { auth_token: data.auth_token, is_new_user: data.is_new_user }
  }
}


