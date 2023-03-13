import {collection, getDocs, getFirestore} from "firebase/firestore";

function collectData() {
    //init service
    const db = getFirestore()

// collection ref
    const colRef = collection(db, 'User')

// get collection data
    getDocs(colRef)
        .then((snapshot) => {
            let User = []
            snapshot.docs.forEach((doc) => {
                User.push({ ...doc.data(), id: doc.id })
            })
            console.log(User)
        })
        .catch(err => {
            console.log(err.message)
        })
};

export {collectData};