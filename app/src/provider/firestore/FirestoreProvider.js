import {useEffect, useState} from "react";
import { collection, onSnapshot, setDoc, doc, query, where, orderBy, serverTimestamp, getDocs } from "firebase/firestore";
import {initializeFirebase} from "../FirebaseConfig";
import {userConverter} from "../classes/User";

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

async function CreateUser({data}) {
    try {
        await setDoc(doc(db, "User", data.uid).withConverter(userConverter));
    } catch(err) {
        console.log(err);
    }
}

export {GetCollection, CreateUser};