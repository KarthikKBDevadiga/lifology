import localforage from 'localforage';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
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

export default function CareerVideoDetail({ auth_token }) {

  const router = useRouter()
  console.log(auth_token)
  useEffect(() => {
    setTimeout(() => {
      localforage.setItem('token', auth_token)
      document.cookie = 'token=' + auth_token + ';expires=3600;'
      router.push({
        pathname: router?.query?.redirect ? router?.query?.redirect : '/',
      })
    }, 1000);
  });
  return (
    <>
    </>
  )
}

export async function getServerSideProps(context) {
  console.log(context.params.vendor);
  console.log(context.params.token)

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

  const data = await fetch("https://api-sandbox.lifology.com/api/sso-verification", requestOptions)
    .then(response => {
      return response.json()
    })
    .then(result => {
      console.log(result)
      return result
      // localforage.setItem('fcm_token', currentToken)
    })
    .catch(error => console.log('error', error));

  return {
    props: { auth_token: data.auth_token }
  }
}


