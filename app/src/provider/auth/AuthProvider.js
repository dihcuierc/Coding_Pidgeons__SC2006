import {initializeFirebase} from "../FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth"

const {auth} = initializeFirebase();

const provider = new GoogleAuthProvider();

async function GoogleAuth() {
    try {
        let registered = false;
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const sessionToken = credential.accessToken;
        sessionStorage.setItem("sessionToken", sessionToken);
        if (result.additionalUserInfo.isNewUser)
            registered = true;
        return {registered, user}
    } catch (err) {
        console.log(err);
    }
}

async function SignUp(email,password) {
    try {
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
       const user = userCredential.user;
       const sessionToken = await user.getIdToken();
       sessionStorage.setItem("sessionToken", sessionToken);
       return user.uid;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

async function SignIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const sessionToken = await userCredential.user.getIdToken();
        sessionStorage.setItem("sessionToken", sessionToken);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function LogOut() {
    try {
        await signOut(auth);
        sessionStorage.clear();
    } catch(err) {
        console.log(err);
        throw err;
    }
}

async function ResetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Email Sent");
        return true;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export {GoogleAuth, SignUp, SignIn, LogOut, ResetPassword}