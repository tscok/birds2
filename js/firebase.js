import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


firebase.initializeApp({
    apiKey: "AIzaSyB4lx8ryB2LcN2sswd2efNfBSI2gQPmAr8",
    authDomain: "birds.firebaseapp.com",
    databaseURL: "https://birds.firebaseio.com",
    storageBucket: "firebase-birds.appspot.com",
});

const getUser = (authData) => {
    if (!authData) {
        return null;
    }
    
    const providerData = authData.providerData[0];

    return {
        uid: authData.uid,
        name: providerData.displayName,
        email: providerData.email,
        photoUrl: providerData.photoURL,
        provider: providerData.providerId
    };
};

const ref = (path) => {
    return firebase.database().ref(path);
}

export {
    firebase,
    getUser,
    ref
};
