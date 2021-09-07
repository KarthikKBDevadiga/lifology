importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: "AIzaSyDK-zY8eSvqD8XskiUmbxx2ieKY78g4Q4w",
  authDomain: "lifology-1571398858177.firebaseapp.com",
  projectId: "lifology-1571398858177",
  storageBucket: "lifology-1571398858177.appspot.com",
  messagingSenderId: "237059092365",
  appId: "1:237059092365:web:e26b9927c6f93e368cd7c4",
  measurementId: "G-HFPN24QSGK"
})

const messaging = firebase.messaging()

// Both of them ain't working

//background notifications will be received here
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  }

  return self.registration.showNotification(notificationTitle, notificationOptions)
})

// messaging.onBackgroundMessage(function (payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload)
//   const notificationTitle = 'Background Message Title'
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   }

//   return self.registration.showNotification(notificationTitle, notificationOptions)
// })
