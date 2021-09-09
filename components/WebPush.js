import * as firebase from "firebase/app"
import localforage from 'localforage'
import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging"
import cookies from "next-cookies";
import Constants from "../helpers/Constants";

const firebaseCloudMessaging = {
    //checking whether token is available in indexed DB
    tokenInlocalforage: async () => {
        return localforage.getItem('fcm_token')
    },
    //initializing firebase app
    init: async function () {
        const firebaseConfig = {
            apiKey: "AIzaSyDK-zY8eSvqD8XskiUmbxx2ieKY78g4Q4w",
            authDomain: "lifology-1571398858177.firebaseapp.com",
            projectId: "lifology-1571398858177",
            storageBucket: "lifology-1571398858177.appspot.com",
            messagingSenderId: "237059092365",
            appId: "1:237059092365:web:e26b9927c6f93e368cd7c4",
            measurementId: "G-HFPN24QSGK"
        }
        initializeApp(
            firebaseConfig
        )
        try {
            const messaging = getMessaging()
            const tokenInLocalForage = await this.tokenInlocalforage()
            //if FCM token is already there just return the token
            if (tokenInLocalForage !== null) {
                return tokenInLocalForage
            }
            // requesting notification permission from browser
            const status = await Notification.requestPermission()
            if (status && status === 'granted') {
                getToken(messaging, firebaseConfig).then((currentToken) => {
                    if (currentToken) {
                        localforage.getItem('token', function (err, value) {
                            if (value) {
                                const data = {
                                    notification_token: currentToken,
                                    notification_status: true,
                                    device_type: 'web'
                                }

                                var myHeaders = new Headers();
                                myHeaders.append("Authorization", "Bearer " + value);
                                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                                var urlencoded = new URLSearchParams();
                                urlencoded.append("notification_token", currentToken);
                                urlencoded.append("notification_status", true);
                                urlencoded.append("device_type", "web");

                                fetch("https://mobapi.lifology.com/api/update-device", {
                                    method: 'POST',
                                    headers: myHeaders,
                                    body: urlencoded,
                                })
                                    .then(response => {
                                        return response.json()
                                    })
                                    .then(result => {
                                        console.log(result)
                                        localforage.setItem('fcm_token', currentToken)
                                    })
                                    .catch(error => console.log('error', error));

                            }
                        })
                        return currentToken
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                });
            }

        } catch (error) {
            console.error(error)
            return null
        }

    },
};
export { firebaseCloudMessaging }