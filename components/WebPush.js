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
            // if (status && status === 'granted') {
            //     //getting token from FCM
            //     const fcm_token = await m.getToken()
            //     if (fcm_token) {
            //         //setting FCM token in indexed db using localforage
            //         localforage.setItem('fcm_token', fcm_token)
            //         console.log('fcm token', fcm_token)
            //         //return the FCM token after saving it
            //         return fcm_token
            //     }
            // }
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
                                var formBody = [];
                                for (var property in data) {
                                    var encodedKey = encodeURIComponent(property);
                                    var encodedValue = encodeURIComponent(data[property]);
                                    formBody.push(encodedKey + "=" + encodedValue);
                                }
                                formBody = formBody.join("&");
                                // var formData = new FormData()
                                // formData.append('notification_token', currentToken)
                                // formData.append('notification_status', true)
                                // formData.append('device_type', 'web')
                                fetch(Constants.baseUrl + '/api/update-device', {
                                    method: 'POST',
                                    body: JSON.stringify(data),
                                    headers: new Headers({
                                        'Authorization': 'Bearer ' + value,
                                        'Accept': 'application/json'
                                    })
                                }).then(function (res) {
                                    localforage.setItem('fcm_token', currentToken)
                                    console.log('Log' + res)
                                }).catch(function (error) {
                                    console.log('error');
                                })
                            }
                            // var formData = new FormData()
                            // formData.append('notification_token', currentToken)
                            // formData.append('notification_status', true)
                            // formData.append('device_type', 'web')
                            // fetch(Constants.baseUrl + '/api/update-device', {
                            //     method: 'POST',
                            //     body: formData,
                            //     headers: new Headers({
                            //         'Authorization': 'Bearer ' + value,
                            //         'Accept': 'application/json'
                            //     })
                            // }).then(function (res) {
                            //     console.log('Log' + res)
                            // }).catch(function (error) {
                            //     console.log('error');
                            // })
                        })
                        // localforage.setItem('fcm_token', currentToken)
                        console.log('fcm token', currentToken)
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