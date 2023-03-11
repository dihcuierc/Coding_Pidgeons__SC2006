import {collection, getDocs, getFirestore, addDoc, deleteDoc, doc} from "firebase/firestore";

function collectData() {
    //init service
    const db = getFirestore()

    // User User collection ref
    const UserRef = collection(db, 'User')

    // get User collection data
    getDocs(UserRef)
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

function addData() {
    // add User data
    const addUser = document.querySelector('<add_button>')
    addUser.addEventListener('<submit_button>', (e) => {
        e.preventDefault()

        addDoc(UserRef, {
            //all the attributes
            //<attribute> : addUser.<input_field>.value
        })
        .then(() => {
            addUser.reset()
        })
    })
}

function deleteData() {
    // delete User data
    const deleteUser = document.querySelector('<delete_button>')
    deleteUser.addEventListener('<submit_button>', (e) => {
        e.preventDefault

        const UserRef = doc(db, 'User', deleteUser.<id_field>.vaule)

        deleteDoc(UserRef)
            .then(() => {
                deleteUser.reset()
            })
    })
}
export {collectData, addData, deleteData};