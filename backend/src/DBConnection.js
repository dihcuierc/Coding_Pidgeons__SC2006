import {collection, onSnapshot, getFirestore, addDoc, deleteDoc, 
    doc, query, where, orderBy, serverTimestamp, getDoc
} from "firebase/firestore";

//init service
const db = getFirestore()

function collectUserData() {
    // User collection ref
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
}

function collectOneUser(id){
    // id represents a User's unqiue id
    const UserRef = doc(db, 'User', id)

    onSnapshot(UserRef, (doc) => {
        console.log(doc.data(), doc.id)
    })
}

function collectRevData(){
    //Review collection ref
    const reviewRef = collection(db, 'Review')

    // real time Review collection data
    onSnapshot(reviewRef, (snapshot) => {
        let Review = []
        snapshot.docs.forEach((doc) => {
            Review.push({...doc.data(), id: doc.id})
        })
        console.log(Review)
    })

};

function collectOneRev(id){
    // id represents a User's unqiue id
    const reviewRef = doc(db, 'Review', id)

    onSnapshot(reviewRef, (doc) => {
        console.log(doc.data(), doc.id)
    })
}

function addUserData(id) {
    // add User data
    const addUser = document.querySelector('.add')
    const UserRef = collection(db, 'User', id)
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

function addRevData(id){
    // add Review data
    const addReview = document.querySelector('.add')
    const reviewRef = collection(db, 'Review', id)
    addReview.addEventListener('submit', (e) => {
        e.preventDefault()

        addDoc(reviewRef, {
            //all the attributes
            comment: addReview.comment.value,
            name: addReview.name.value,
            rating: addReview.rating.value
        })
    })
}

//SEARCH HOW TO DELETE FOR A PARTICULAR DOCUMENT FROM A COLLECTION

function deleteUserData(id) {
    // delete User data
    const deleteUser = document.querySelector('.delete')
    deleteUser.addEventListener('submit', (e) => {
        e.preventDefault
        // require the input field of the document to delete
        const UserRef = doc(db, 'User', id, deleteUser.id.value)

        deleteDoc(UserRef)
            .then(() => {
                deleteUser.reset()
            })
    })
}

function deleteRevData(id){
    // delete Review data
    const deleteReview = document.querySelector('.delete')
    deleteReview.addEventListener('submit', (e) => {
        e.preventDefault
        // require the input field (id) of the review to delete
        const reviewRef = doc(db, 'User', id, deleteReview.id.value)

        deleteDoc(reviewRef)
            .then(() => {
                deleteReview.reset()
            })
    })
}
export {collectUserData, collectOneUser, addUserData, deleteUserData, collectRevData, collectOneRev, addRevData, deleteRevData};