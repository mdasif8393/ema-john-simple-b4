import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
}

export const handleGoogleSignIn = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.app().auth().signInWithPopup(googleProvider)
    .then((res) => {

      // console.log(res.additionalUserInfo.profile.picture);
      const {name, email, picture} = res.additionalUserInfo.profile;
      const signedInUser = {
        isSignedIn: true,
        name: name,
        email: email,
        picture: picture,
        success: true,
      }
      return signedInUser;
    })
    .catch((err) => {
      // console.log(err);
      // console.log(err.message);
    })
  }

export const handleFbSignIn = () => {

    var facebookProvider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth()
    .signInWithPopup(facebookProvider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        user.success = true;
        return user;
        

    })
    .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
});
}

export const handleSignOut = () => {
    return firebase.auth().signOut().then(() => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        picture: '',
      }
      return signOutUser;
    }).catch((error) => {
      // An error happened.
    });
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)

    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })

    .catch( error => {

      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }
 
  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)

    .then( res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })

    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return(newUserInfo);
      
    });
  }

  const updateUserName = name => {

    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,

    })
    .then( res => {
      console.log("User name updated successfully")
    }).catch((error) => {
      console.log(error);
    });  
  }