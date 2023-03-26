import {initializeFirebase} from "../FirebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "firebase/auth"
import {collection, addDoc, doc} from "firebase/firestore";

const {auth,db} = initializeFirebase();

function SignUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await addDoc(doc(collection(db,"User"), user.uid), {
                Reviews: "",
                email: user.email,
                firstName: user.firstName,
                goals: "",
                image: user.photoURL,
                lastName: user.lastName,
                mobile: user.phoneNumber,
                profile: "",
                username: user.displayName,
            })
        })
        .catch((error) => {
            return error;
        });
}

function SignIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const sessionToken = await user.getIdToken();
            sessionStorage.setItem("sessionToken", sessionToken);
        })
        .catch((err) => {
            throw err;
        })
}

function LogOut() {
    return signOut(auth)
        .then(() => {
            sessionStorage.clear();
    }).catch((err) => {
        throw err
    })
}

function ResetPassword(email) {
    return sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Email Sent");
            return true;
    }).catch((err) => {
        throw err;
    })
}

export {SignUp, SignIn, LogOut, ResetPassword}