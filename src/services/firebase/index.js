import firebase from "firebase/app";
import { notification } from "antd";
import "firebase/auth";
import "firebase/database";
import { store } from "../..";

// const firebaseConfig = {
//   apiKey: 'AIzaSyBJVhr2WZshEGR7egcxoygQIphKOkKVIYQ',
//   authDomain: 'sellpixels-7d5d4.firebaseapp.com',
//   databaseURL: 'https://sellpixels-7d5d4.firebaseio.com',
//   projectId: 'sellpixels-7d5d4',
//   storageBucket: 'cleanui-72a42.appspot.com',
//   messagingSenderId: '338219933237',
// }

const firebaseConfig = {
  apiKey: "AIzaSyDAFhP163t4Op4dYh797-p2Kss6dFrIUJU",
  authDomain: "tradewin-1e868.firebaseapp.com",
  databaseURL: "https://tradewin-1e868-default-rtdb.firebaseio.com",
  projectId: "tradewin-1e868",
  storageBucket: "tradewin-1e868.appspot.com",
  messagingSenderId: "154009967470",
  appId: "1:154009967470:web:6956f82ce7743ffc377f7f",
  measurementId: "G-LKTNB6RVDF",
};

firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
export const firebaseDatabase = firebase.database();

export async function login(email, password) {
  return firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => true)
    .catch((error) => {
      notification.warning({
        message: error.code,
        description: error.message,
      });
    });
}

export async function register(email, password, name) {
  return firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      if (response.user) {
        const { uid } = response.user;
        firebaseDatabase.ref("users").child(uid).set({
          role: "admin",
          name,
        });
      }
      return true;
    })
    .catch((error) => {
      notification.warning({
        message: error.code,
        description: error.message,
      });
    });
}
export async function getNifty500Data() {
  let childData;

  let key = 0;
  let data = [];
  return new Promise(function (resolve, reject) {
    firebase
      .database()
      .ref("nifty500")
      .on("value", function (snapshot) {
        data = [];
        const dataSize = snapshot.numChildren();
        snapshot.forEach(function (childSnapshot) {
          childData = childSnapshot.val();
          key += 1;

          if (key < snapshot.numChildren()) {
            data.push({ key: childSnapshot.key, data: childData });
          } else {
            data.push({ key: childSnapshot.key, data: childData });
            if (data.length === dataSize)
              store.dispatch({
                type: "nifty500/SET_STATE",
                payload: {
                  data,
                  loading: false,
                },
              });
            resolve(data);
          }

          if (key > snapshot.numChildren()) reject();
        });
      });
  });
}
export async function currentAccount() {
  let userLoaded = false;
  function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
      if (userLoaded) {
        resolve(firebaseAuth.currentUser);
      }
      const unsubscribe = auth.onAuthStateChanged((user) => {
        userLoaded = true;
        unsubscribe();
        const getUserData = async () => {
          if (user) {
            const userFields = await firebaseDatabase
              .ref("users")
              .child(user.uid)
              .once("value")
              .then((snapshot) => {
                return snapshot.val();
              });
            const mergedUser = Object.assign(user, {
              id: user.uid,
              name: userFields.name,
              role: userFields.role,
              avatar: user.photoUrl,
            });
            return mergedUser;
          }
          return user;
        };
        resolve(getUserData());
      }, reject);
    });
  }
  return getCurrentUser(firebaseAuth);
}
export async function logout() {
  return firebaseAuth.signOut().then(() => true);
}
