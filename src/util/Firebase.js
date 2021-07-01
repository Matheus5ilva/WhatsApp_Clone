const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {
    constructor() {
        this._config = {
            apiKey: "AIzaSyBz__KZGZvp_gLHGe4LFEJYvlKYpO-UAHU",
            authDomain: "whatsapp-clone-a0585.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-a0585.firebaseio.com",
            projectId: "whatsapp-clone-a0585",
            storageBucket: "gs://whatsapp-clone-a0585.appspot.com",
            messagingSenderId: "838580567878",
            appId: "1:838580567878:web:a3b3ae6e0886f96255ef47"
        };
        this.init();
    }
    init() {
        if (!window._initializedFirebase) {
            firebase.initializeApp(this._config);
            firebase.firestore().settings({});
            window._initializedFirebase = true;
        }
    }
    static db() {
        return firebase.firestore();
    }
    static hd() {
        return firebase.storage();
    }
    initAuth() {
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result => {
                let token = result.credential.accessToken;
                let user = result.user;
                s({
                    user,
                    token
                });
            });
        }).catch(err => {
            console.error(err)
        })
    }
}