import {collection, doc, getCountFromServer, getDocs, getDoc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {initializeFirebase} from "../FirebaseConfig";
const {db} = initializeFirebase();

async function AddCollection(path,size, data) {
    try {
        await setDoc(doc(db, path, `${size + 1}`), data);
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


async function GetPlan(index) {
    return !index ?
        await GetCollection("Plan") :
        await GetCollection("Plan",index)

}

async function GetExercise(index) {
    return !index ?
        await GetCollection("Exercise") :
        await GetCollection("Exercise");
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

async function UpdateCollection(path,index,data) {
    try {
    const objRef = doc(db,path,index);
    await updateDoc(objRef,data);
    return true;
    } catch(err) {
        throw err;
    }
}

async function DeleteDoc(path,index) {
    try {
        const objRef = doc(db,path,index);
        await deleteDoc(objRef);
        return true;
    } catch (err) {
        throw err;
    }
}


export {AddCollection,GetCollection, GetExercise, GetPlan, CreateUser, GetSize, UpdateCollection, DeleteDoc};