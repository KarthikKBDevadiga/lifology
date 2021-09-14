import 'tailwindcss/tailwind.css'
import '/styles/Calendar.css'


import React, { useState, useEffect } from 'react';
import { firebaseCloudMessaging } from '../components/WebPush'

import { getMessaging, onMessage } from "firebase/messaging";
import localforage from 'localforage';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setToken()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => console.log('event for the service worker', event))
    }
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init()
        if (token) {
          getMessage()
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  function getMessage() {
    const messaging = getMessaging()
    onMessage(messaging, (message) => console.log('foreground ' + message))
  }
  return <Component {...pageProps} />
}

export default MyApp;