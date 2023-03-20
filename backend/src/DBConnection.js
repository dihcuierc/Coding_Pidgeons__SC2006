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
    const UserRef = doc(db, 'User')
    const user = query(UserRef, where("id", "=", id))

    onSnapshot(user, (doc) => {
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
    const reviewRef = collection(db, 'Review')
    const review = query(reviewRef, where("id", "=", id))
    
    // collect all reviews from one user
    onSnapshot(review, (snapshot) => {
        let userRev = []
        snapshot.docs.forEach((doc) => {
            userRev.push({...doc.data(), id: doc.id})
        })
        console.log(userRev)
    })
}

function collectGoalData(){
    const goalRef = collection(db, 'Goal')

    onSnapshot(goalRef, (snapshot) => {
        let Goal = []
        snapshot.docs.forEach((doc) => {
            Goal.push({...doc.data(), id: doc.id})
        })
        console.log(Goal)
    })
}

function collectOneGoal(id){
    // id represents a User's unqiue id
    const goalRef = collection(db, 'Goal')
    const goal = query(goalRef, where("id", "=", id))
    
    // collect all goals from one user
    onSnapshot(goal, (snapshot) => {
        let userGoal = []
        snapshot.docs.forEach((doc) => {
            userGoal.push({...doc.data(), id: doc.id})
        })
        console.log(userGoal)
    })
}

function collectExData(){
    const ExRef = collection(db, 'Exercise')
    onSnapshot(ExRef, (snapshot) => {
        let Exercise = []
        snapshot.docs.forEach((doc) => {
            Exercise.push({...doc.data(), id: doc.id})
        })
        console.log(Exercise)
    })
}

//Collect data of one exercise only
function collectOneEx(exID){
    // id represents an exercise's unqiue id
    const ExRef = collection(db, 'Exercise')
    const exercise = query(ExRef, where("exID", "=", exID))
    
    // collect one exercise only
    onSnapshot(exercise, (doc) => {
        console.log(doc.data(), doc.id)
    })
}

function addUserData(new_id, new_password, new_firstName, new_lastName, new_username, new_email, new_profile, new_image, new_mobile) {
    // add User data
    const UserRef = collection(db, "User");
    const data = {
        //all the attributes
        id: new_id,
        password: new_password,
        firstName: new_firstName,
        lastName: new_lastName,
        username: new_username,
        email: new_email,
        profile: new_profile,
        image: new_image,
        mobile: new_mobile,
        //goals, Reviews, friends can add separately
        createdAt: serverTimestamp()
    }
    addDoc(UserRef, data)
    .then(() => {
        console.log("User has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
}

function addRevData(new_comment, new_name, new_rating, new_id){
    // add Review data
    const reviewRef = collection(db, "Review");
    const data = {
        //all the attributes
        comment: new_comment,
        name: new_name,
        rating: new_rating,
        id: new_id,
        createdAt: serverTimestamp()
    }
    addDoc(reviewRef, data)
    .then(() => {
        console.log("Review has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
}

function addGoalData(new_calories, new_date, new_goalSetting, new_image, new_name, new_id){
    // add Goal data
    const goalRef = collection(db, "Goal");
    const data = {
        //all the attributes
        calories: new_calories,
        date: new_date,
        goalSetting: new_goalSetting,
        image: new_image    ,
        name: new_name,
        id: new_id,
        createdAt: serverTimestamp()
    }
    addDoc(goalRef, data)
    .then(() => {
        console.log("Goal has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
}

function addExData(new_calories, new_date, new_goalSetting, new_image, new_name, new_id){
    // add new exercise data
    const goalRef = collection(db, "Exercise");
    const data = {
        //all the attributes
        exID: new_exID,
        
        createdAt: serverTimestamp()
    }
    addDoc(goalRef, data)
    .then(() => {
        console.log("Goal has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
}

function deleteUserData(docID) {
    // delete User data using document's ID
    const UserRef = doc(db, "User", docID)

    deleteDoc(UserRef)
    .then(() => {
        console.log("User has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
    })
}

function deleteRevData(docID){
    // delete Review data
    const reviewRef = doc(db, "Review", docID)

    deleteDoc(reviewRef)
    .then(() => {
        console.log("Review has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
    })
}

function deleteGoalData(docID){
    // delete Goal data
    const goalRef = doc(db, "Goal", docID)

    deleteDoc(goalRef)
    .then(() => {
        console.log("Goal has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
    })
}

export {collectUserData, collectOneUser, addUserData, deleteUserData, collectRevData, collectOneRev, addRevData, deleteRevData,
    collectGoalData, collectOneGoal, addGoalData, deleteGoalData};