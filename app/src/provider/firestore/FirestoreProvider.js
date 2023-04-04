import {useEffect, useState} from "react";
import { collection, onSnapshot, setDoc, doc, getCountFromServer} from "firebase/firestore";
import {initializeFirebase} from "../FirebaseConfig";

const {db} = initializeFirebase();

function GetCollection(path) {
    const [data, setData] = useState(null);
    useEffect(() => {
        const unsub = onSnapshot(collection(db, path),(snapshot) => {
            const docs = snapshot.docs.map((doc) =>
                ({...doc.data(), id: doc.id}))
            setData(docs);
        });

        return () =>
            unsub();
    });
    return data;
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
        console.log("Tesvt");
        throw err;
    }
}

export {GetCollection, CreateUser, GetSize};