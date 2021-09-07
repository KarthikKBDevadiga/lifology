import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDK-zY8eSvqD8XskiUmbxx2ieKY78g4Q4w",
    authDomain: "lifology-1571398858177.firebaseapp.com",
    projectId: "lifology-1571398858177",
    storageBucket: "lifology-1571398858177.appspot.com",
    messagingSenderId: "237059092365",
    appId: "1:237059092365:web:e26b9927c6f93e368cd7c4",
    measurementId: "G-HFPN24QSGK"
}

if (firebase.getApps.length) {
    firebase.initializeApp(firebaseConfig)
}

