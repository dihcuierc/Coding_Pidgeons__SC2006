import {initializeFirebase} from "../FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    EmailAuthProvider,
    GoogleAuthProvider,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword
} from "firebase/auth"
import {DeleteDoc} from "../firestore/FirestoreProvider";

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
        return userCredential.user.uid;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function LogOut() {
    try {
        await signOut(auth);
        sessionStorage.clear();
        localStorage.clear();
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

async function checkPassword(email, password) {
    const user = auth.currentUser;
    try {
        if (user !== null) {
            const credentials = EmailAuthProvider.credential(email,password);
            await reauthenticateWithCredential(user, credentials);
        }
        return new Error("User must be logged in or registered!");
    } catch (err) {
        switch (err.code) {
            case "auth/wrong-password":
                throw new Error("Your current password does not match! Please try again")
            default:
                throw err;
        }
    }
}

async function UpdatePassword(newPassword) {
    const user = auth.currentUser;
    try {
    if (user !== null) {
        await updatePassword(user,newPassword);
        return true;
    } else
        new Error("You have not login or register yet!");
    } catch(err) {
        console.log(err);
        throw err;
    }
}


async function DeleteUser() {
    try {
        const user = auth.currentUser;
        if (user !== null) {
            await deleteUser(user);
            sessionStorage.clear();
            localStorage.clear();
            return await DeleteDoc("User", user.uid);
        } else
            new Error("You have not login or register yet!");
    } catch(err) {
        console.log(err);
        throw err;
    }
}

export {GoogleAuth, SignUp, SignIn, LogOut, ResetPassword, checkPassword, UpdatePassword,DeleteUser}