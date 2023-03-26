import {useEffect, useState} from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDocs } from "firebase/firestore";
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

export {GetCollection};