import {initializeFirebase} from "../FirebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth"
const {auth} = initializeFirebase();

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

export {SignUp, SignIn, LogOut, ResetPassword}