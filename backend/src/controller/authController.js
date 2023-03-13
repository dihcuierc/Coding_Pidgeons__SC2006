import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {firebase} from "../firebaseConfig";

function decodingBasicAuth(auth) {
    const details = auth.split(' ');
    let buf = Buffer.from(details[1], "base64");
    const plain = buf.toString();
    const creds = plain.split(":");
    let email = creds[0];
    let password = creds[1];
    return {email, password};
}

async function signUp(auth,res) {
    const authMethod = getAuth(firebase);
    let authenticated = false;
    const {email, password} = decodingBasicAuth(auth);
    if (!email|| !password)
        return authenticated;
    return await createUserWithEmailAndPassword(authMethod,email,password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const accessToken = await user.getIdToken();
            const verified = user.emailVerified;
            authenticated = true;
            return {authenticated, accessToken, verified};
        })
        .catch((err) => {
            console.log(err);
            return {authenticated,err};
        })

}

function signIn() {

}

function signOut() {

}

export {signUp, signIn, signOut};