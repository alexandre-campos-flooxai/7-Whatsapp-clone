const firebase = require("firebase");
require("firebase/firestore");
require("firebase/auth");

export class Firebase {
  constructor() {
    this._config = {
      apiKey: "AIzaSyD5KAllTN_tbkULySmdilbnWNQTnBosc9s",
      authDomain: "whatsappclone-f23f9.firebaseapp.com",
      projectId: "whatsappclone-f23f9",
      storageBucket: "whatsappclone-f23f9.firebasestorage.app",
      messagingSenderId: "683170432121",
      appId: "1:683170432121:web:27c6e16c052310ce1340a8",
      measurementId: "G-135DQLC1PV",
    };
    this.init();
  }

  init() {
    if (!window._initializedFirebase) {
      firebase.initializeApp(this._config);

      firebase.firestore().settings({
        timestampsInSnapshots: true,
      });
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
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          s({ user, token });
        })
        .catch((err) => {
          f(err);
        });
    });
  }
}
