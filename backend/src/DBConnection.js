import {collection, onSnapshot, getFirestore, addDoc, deleteDoc, 
    doc, query, where, orderBy, serverTimestamp
} from "firebase/firestore";

function collectData() {
    //init service
    const db = getFirestore()

    // User User collection ref
    const UserRef = collection(db, 'User')

    // User query -> Maybe can pass in a string to search for a particular "friend"
    // then return q as the friend result details
    const q = query(UserRef, where("User", "==", "friend"), orderBy('createdAt'))
    
    // real time User collection data
    onSnapshot(UserRef, (snapshot) => {
        let User = []
        snapshot.docs.forEach((doc) => {
            User.push({ ...doc.data(), id: doc.id })
        })
        console.log(User)
    })

};

function addData() {
    // add User data
    const addUser = document.querySelector('.add')
    addUser.addEventListener('submit', (e) => {
        e.preventDefault()

        addDoc(UserRef, {
            //all the attributes
            password: addUser.password.value,
            firstName: addUser.firstName.value,
            lastName: addUser.lastName.value,
            username: addUser.username.value,
            email: addUser.email.value,
            profile: addUser.profile.value,
            image: addUser.image.value,
            mobile: addUser.mobile.value,
            //goals, Reviews, friends can add separately
            createdAt: serverTimestamp()
        })
        .then(() => {
            addUser.reset()
        })
    })
}

function deleteData() {
    // delete User data
    const deleteUser = document.querySelector('.delete')
    deleteUser.addEventListener('submit', (e) => {
        e.preventDefault
        // require the id of the document to delete
        const UserRef = doc(db, 'User', deleteUser.id.value)

        deleteDoc(UserRef)
            .then(() => {
                deleteUser.reset()
            })
    })
}
export {collectData, addData, deleteData};