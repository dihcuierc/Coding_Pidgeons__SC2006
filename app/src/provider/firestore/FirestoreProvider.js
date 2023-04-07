import {collection, doc, getCountFromServer, getDocs, getDoc, setDoc} from "firebase/firestore";
import {initializeFirebase} from "../FirebaseConfig";
const {db} = initializeFirebase();

async function AddCollection(path,size, data) {
    try {
        await setDoc(doc(db, path, size + 1), data);
        return true;
    } catch (err) {
        console.log(err);
    }
}


async function GetCollection(path, index) {
    try {
        if (!index) {
            const querySnapshot = await getDocs(collection(db, path));
            return querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        }
        const querySnapshot = await getDoc(doc(db,path,index));
        return ({...querySnapshot.data()});
    } catch (err) {
        throw err;
    }
}

async function CreateUser(uuID,{data}) {
    try {
        await setDoc(doc(db,"User",uuID), data);
        return true;
    } catch(err) {
        throw err;
    }
}

async function GetSize(path) {
    try {
        const collectionRef = collection(db, path);
        const snapshot = await getCountFromServer(collectionRef);
        return snapshot.data().count;
    } catch(err) {
        throw err;
    }
}


export {AddCollection,GetCollection, CreateUser, GetSize};