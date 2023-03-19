import {getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    updatePassword,
    updateProfile ,
    sendPasswordResetEmail} from "firebase/auth";
import {firebase} from "../firebaseConfig";
import {Status} from "../errors/errorHandler";

let auth = getAuth(firebase);

async function signUp(b64auth) {
    let {authenticated, email, password, err} = authentication(b64auth);
    if (err)
        return {authenticated, err};
    return await createUserWithEmailAndPassword(auth,email,password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const accessToken = await user.getIdToken();
            authenticated = true;
            return {authenticated, accessToken};
        })
        .catch((err) => {
            err.code = Status.Forbidden;
            return {authenticated,err};
        });
}

async function logIn(b64auth) {
    let {authenticated, email, password, err} = authentication(b64auth);
    if (err)
        return {authenticated, err};
    return await signInWithEmailAndPassword(auth,email,password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const accessToken = await user.getIdToken();
            const verified = user.emailVerified;
            authenticated = true;
            return {authenticated, accessToken, verified};
    }).catch((err) => {
        err.code = Status.Forbidden;
        return {authenticated, err};
    })

}

 async function logOut(accessToken) {
     let loggedOut = false;
     return await signOut(accessToken).then(() => {
         loggedOut = true;
         return {loggedOut};
     }).catch((err) => {
         return {loggedOut, err}
     });
 }

 async function verify() {
    let verified = false;
    let user = auth.currentUser;
    if (!user) {
        let err = new Error("No Current User is Logged In");
        err.code = Status.NotFound;
        return {verified, err};
    }
    return await sendEmailVerification(user)
        .then(() => {
            console.log("Email Sent");
            verified = true;
            return {verified};
        }).catch((err) => {
            err.code = Status.BadRequest;
            return {verified, err};
    });
 }

 async function updatePass(newPassword) {
    let status = false;
    let user = auth.currentUser;
    return await updatePassword(user, newPassword).then(() => {
        console.log("Password successfully updated");
        status = true;
        return {status};
    }).catch((err) => {
        err.code = Status.Forbidden;
        return {status, err};
    })
 }

 async function updateUser() {

 }

 async function sendReset(email) {
    let sendStatus = false;
    return await sendPasswordResetEmail(auth, email).then(() => {
        console.log("Email Sent");
        sendStatus = true;
        return {sendStatus};
    }).catch((err) => {
        err.code = Status.BadRequest;
        return {sendStatus, err};
    })
 }

function decodingBasicAuth(b64auth) {
    try {
        const details = b64auth.split(' ');
        let buf = Buffer.from(details[1], "base64");
        const plain = buf.toString();
        const creds = plain.split(":");
        let email = creds[0];
        let password = creds[1];
        return {email, password};
    } catch (err) {
        let error = new Error("Wrong Authentication Method");
        error.code = Status.BadRequest;
        error.stack = err.stack;
        throw error;
    }
}

function authentication(b64auth) {
    let authenticated = false;
    try {
        let {email, password} = decodingBasicAuth(b64auth);
        if (!email || !password) {
            let err = new Error("Authorization Header is empty");
            err.code = Status.BadRequest;
            return {authenticated, err};
        }
        return {authenticated, email, password}
    } catch (err) {
        return {authenticated, err};
    }
}



export {signUp, logIn, logOut, verify};