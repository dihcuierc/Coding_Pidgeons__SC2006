import { ErrorFactory } from "@firebase/util";
import {collection, onSnapshot, getFirestore, addDoc, deleteDoc, 
    doc, query, where, orderBy, serverTimestamp, getDocs, equalsTo, getDoc, updateDoc,
    documentId, arrayRemove, arrayUnion
} from "firebase/firestore";

//init service
const db = getFirestore()

//User class
class User{
    constructor(id, password, firstName, lastName, username, email, mobile, Reviews, goals){
        this.id = id
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.username = username
        this.email = email
        this.mobile = mobile
        this.Reviews = Reviews
        this.goals = goals
    }
}
//User class converter
const userConverter = {
    toFirestore: (user) => {
        return {
            id: user.id,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            mobile: user.mobile,
            Reviews: user.Reviews,
            goals: user.goals
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.id, data.password, data.firstName, data.lastName, data.username, data.email, data.mobile, data.Reviews, data.goals);
    }
}
async function collectUserData() {
    const UserRef = collection(db, 'User')
    const reviewRef = collection(db, "Review")
    let User = []
    let UserRev = []
    // real time User collection data
    onSnapshot(UserRef, (snapshot) => {
        snapshot.docs.forEach((Doc) => {
            User.push({...Doc.data(), id: Doc.id})
            const reviews = Doc.data().reviews
            //for each user, get/display their reviews
            /*for(var key in reviews) {
                const review = doc(db, "Review", reviews[key])
                onSnapshot(review, (doc) => {
                    UserRev.push({...doc.data(), id: doc.id})
                    console.log(UserRev)
                })
            }*/
        })
        console.log(User)
        return UserRev
    })
    return User
}

function collectOneUser(id){
    // id represents a User's auto-generated id
    const UserRef = doc(db, 'User', id)    

    let User = []
    onSnapshot(UserRef, (Doc) => {
        User.push({...Doc.data(), id: Doc.id})
        const reviews = Doc.data().reviews
        console.log("User data: ", User)
    })
    return User
}

async function addUserData(new_password, new_firstName, new_lastName, new_username, new_email, new_image, new_mobile) {
    // add User data
    const UserRef = collection(db, "User");
    const data = {
        //all the attributes
        password: new_password,
        firstName: new_firstName,
        lastName: new_lastName,
        username: new_username,
        email: new_email,
        image: new_image,
        mobile: new_mobile,
        //goals, Reviews, friends can add separately
        createdAt: serverTimestamp()
    }
    const ref = await addDoc(UserRef, data)
    .then(() => {
        console.log("User has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
    return "User has been added successfully"
}

function deleteUserData(docID) {
    // delete User data using document's ID
    const UserRef = doc(db, "User", docID)

    //Delete all reviews related to user
    const review = collection(db, "Review")
    const q_review = query(review, where("userID", "==", docID))
    getDocs(q_review).forEach((revDoc) => {
        deleteDoc(revDoc)
    })
    //Delete all plans related to user
    const plans = collection(db, "Plan")
    const q_plan = query(plans, where("userID", "==", docID))
    getDocs(q_plan).forEach((planDoc) => {
        deleteDoc(planDoc)
    })
    //Delete all scheduled exercises related to user
    const SE = collection(db, "ScheduleExercise")
    const q_SE = query(SE, where("userID", "==", docID))
    getDocs(q_SE).forEach((seDoc) => {
        deleteDoc(seDoc)
    })
    //Delete all goals related to user
    const goals = collection(db, "Goal")
    const q_goal = query(goals, where("userID", "==", docID))
    getDocs(q_goal).forEach((goalDoc) => {
        deleteDoc(goalDoc)
    })
    //Delete all calories history related to user
    const CH = collection(db, "CaloriesHistory")
    const q_CH = query(CH, where("userID", "==", docID))
    getDocs(q_CH).forEach((calDoc) => {
        deleteDoc(calDoc)
    })
    deleteDoc(UserRef)
    .then(() => {
        console.log("User has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
    })
    return "User has been deleted successfully"
}

//function for linking image referrence to attribute in document using download url


function collectRevData(){
    //Review collection ref
    const reviewRef = collection(db, 'Review')
    let Review = []
    // real time Review collection data
    onSnapshot(reviewRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            Review.push({...doc.data(), id: doc.id})
        })
        console.log(Review)
    })
    return Review
};

function collectOneRev(id){
    // id represents the auto-generated ID
    const reviewRef = collection(db, 'Review')
    const review = query(reviewRef, where("userID", "==", id))
    
    // collect all reviews from one user
    onSnapshot(review, (snapshot) => {
        let userRev = []
        snapshot.docs.forEach((doc) => {
            userRev.push({...doc.data(), id: doc.id})
        })
        console.log(userRev)
    })
    return userRev
}

async function addRevData(new_exercise, new_comments, new_date, new_rating, new_exID, new_UID){
    // add Review data
    const reviewRef = collection(db, "Review");
    const UserRef = doc(db, "User", new_UID)
    const data = {
        //all the attributes
        UID: new_UID,
        comments: new_comments,
        rating: new_rating,
        exID: new_exID,
        date: new_date,
        Exercise: new_exercise,
        createdAt: serverTimestamp()
    }
    addDoc(reviewRef, data)
    .then(async (item) => {
        /*await updateDoc(UserRef, {
            reviews: arrayUnion(item.id)
        });*/
        console.log("Review has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
    return "Review has been added successfully"
}

async function deleteRevData(UID, revID){
    // delete Review data
    //const reviewRef = collection(db, "Review")
    //const review = query(reviewRef, where("UID", "==", id), where("exID", "==", exID))
    const UserRef = doc(db, "User", UID)
    const review = doc(db, "Review", revID)

    await deleteDoc(review)
    .then(async () => {
        /*await updateDoc(UserRef, {
            reviews: arrayRemove(revID)
        });*/
        console.log("Review has been deleted successfully");
    })
    return "Review has been deleted successfully"
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
    return Goal
}

function collectOneGoal(UID){
    // id represents a User's unqiue id
    const goalRef = collection(db, 'Goal')
    const goal = query(goalRef, where("userID", "==", UID))
    
    // collect all goals from one user
    onSnapshot(goal, (snapshot) => {
        let userGoal = []
        snapshot.docs.forEach((doc) => {
            userGoal.push({...doc.data(), id: doc.id})
        })
        console.log(userGoal)
    })
    return userGoal
}

async function addGoalData(new_UID, new_Title, new_CV, new_TV, new_Deadline, new_Done){
    // add Goal data
    const goalRef = collection(db, "Goal");
    const UserRef = doc(db, "User", new_UID)
    const data = {
        //all the attributes
        UID: new_UID,
        Title: new_Title,
        CurrentValue: new_CV,
        TargetValue: new_TV,
        Deadline: new_Deadline,
        Done: new_Done,
        createdAt: serverTimestamp()
    }
    addDoc(goalRef, data)
    .then(async (item) => {
        /*await updateDoc(UserRef, {
            goals: arrayUnion(item.id)
        });*/
        console.log("Goal has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
    return "Goal has been added successfully"
}

async function deleteGoalData(UID, GID){
    // delete Goal data, GID is the goal's document id
    const goalRef = doc(db, "Goal", GID)
    const userRef = doc(db, "User", UID)

    await deleteDoc(goalRef)
    .then(async () =>{
        /*await updateDoc(userRef, {
            goals: arrayRemove(GID)
        })*/
        console.log("Goal has been deleted successfully")
    })
    return "Goal has been deleted successfully"
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
    const ExRef = collection(db, 'Exercise', exID)
    
    // collect one exercise only
    onSnapshot(ExRef, (doc) => {
        console.log(doc.data(), doc.id)
    })
}

function collectCH(){
    const CHref = collection(db, "CaloriesHistory")

    let Cal_Hist = []
    onSnapshot(CHref, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            Cal_Hist.push({...doc.data(), id: doc.id})
        })
        console.log(Cal_Hist)
    })
    return Cal_Hist
}

function collectOneCH(UID){
    const CHref = collection(db, 'CaloriesHistory')
    const userCH = query(CHref, where("userID", "==", UID))
    
    let Cal_Hist = []
    // collect all calories history from one user
    onSnapshot(userCH, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            Cal_Hist.push({...doc.data(), id: doc.id})
        })
        console.log(Cal_Hist)
    })
    return Cal_Hist
}

function addCH(new_UID, new_burnt, new_date){
    // add Calories History data
    const CHref = collection(db, "CaloriesHistory");
    const UserRef = doc(db, "User", new_UID)
    const data = {
        //all the attributes
        userID: new_UID,
        calories_burnt: new_burnt,
        date: new_date,
        createdAt: serverTimestamp()
    }
    addDoc(CHref, data)
    .then(async (item) => {
        /*await updateDoc(UserRef, {
            calories_history: arrayUnion(item.id)
        });*/
        console.log("Calories history has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
    return "Calories history has been added successfully"
}

async function deleteCH(UID, CHID){
    // delete Calories history data, CHID is the goal's document id
    const CHref = doc(db, "CaloriesHistory", CHID)
    const userRef = doc(db, "User", UID)

    await deleteDoc(CHref)
    .then(async () =>{
        /*await updateDoc(userRef, {
            calories_history: arrayRemove(CHID)
        })*/
        console.log("Calories history has been deleted successfully")
    })
    return "Calories history has been deleted successfully"
}

function collectSE(){
    const SEref = collection(db, "ScheduleExercise")

    let Sched_Ex = []
    onSnapshot(SEref, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            Sched_Ex.push({...doc.data(), id: doc.id})
        })
        console.log(Cal_Hist)
    })
    return Sched_Ex
}

function collectOneSE(UID){
    const SEref = collection(db, 'ScheduleExercise')
    const userCH = query(SEref, where("userID", "==", UID))
    
    let userSE = []
    // collect all calories history from one user
    onSnapshot(userCH, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            userSE.push({...doc.data(), id: doc.id})
        })
        console.log(userSE)
    })
    return userSE
}

function addSE(new_date, new_end_time, new_planID, new_start_time, new_UID){
    // add Schedule Exercise data
    const SEref = collection(db, "ScheduleExercise");
    const UserRef = doc(db, "User", new_UID)
    const data = {
        //all the attributes
        date: new_date,
        end_time: new_end_time,
        planID: new_planID,
        start_time: new_start_time,
        userID: new_UID,
        createdAt: serverTimestamp()
    }
    addDoc(SEref, data)
    .then(async (item) => {
        /*await updateDoc(UserRef, {
            scheduled_exercise: arrayUnion(item.id)
        });*/
        console.log("Schedule exercise has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
    return "Schedule exercise has been added successfully"
}

async function deleteSE(UID, SEID){
    // delete schedule exercise data, SEID is the schedule exercise's document id
    const SEref = doc(db, "ScheduleExercise", SEID)
    const userRef = doc(db, "User", UID)

    await deleteDoc(SEref)
    .then(async () =>{
        /*await updateDoc(userRef, {
            calories_history: arrayRemove(SEID)
        })*/
        console.log("Scheduled exercise has been deleted successfully")
    })
    return "Scheduled exercise has been deleted successfully"
}

function collectExGroup(){
    const EGref = collection(db, "ExerciseGroups")

    let EG = []
    onSnapshot(EGref, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            EG.push({...doc.data(), id: doc.id})
        })
        console.log(EG)
    })
    return EG
}

function collectOneExGroup(EGID){
    //EGID represents the particular exercise group's document id
    const EGref = doc(db, 'ExerciseGroups', EGID)
    
    let oneEG = []
    // collect all calories history from one user
    onSnapshot(EGref, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            oneEG.push({...doc.data(), id: doc.id})
        })
        console.log(oneEG)
    })
    return oneEG
}

function collectPlan(){
    const planRef = collection(db, "Plan")

    let plans = []
    onSnapshot(planRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            plans.push({...doc.data(), id: doc.id})
        })
        console.log(plans)
    })
    return plans
}

function collectOnePlan(UID){
    //collect all plans belonging to one user
    const planRef = collection(db, "Plan")
    const userPlan = query(planRef, where("userID", "==", UID))
    
    let userPlans = []
    // collect all calories history from one user
    onSnapshot(userPlan, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            userPlans.push({...doc.data(), id: doc.id})
        })
        console.log(userPlans)
    })
    return userPlans
}

function addPlan(new_UID, new_image, new_planID, new_title, new_totalCal, new_exercises){
    // add plan data
    const planRef = collection(db, "Plan");
    const UserRef = doc(db, "User", new_UID)
    const data = {
        //all the attributes
        userID: new_UID,
        image_ref: new_image,
        planID: new_planID,
        title: new_title,
        totalCalories: new_totalCal,
        exercises: new_exercises,
        createdAt: serverTimestamp()
    }
    addDoc(planRef, data)
    .then(async (item) => {
        /*await updateDoc(UserRef, {
            Plans: arrayUnion(item.id)
        });*/
        console.log("Plan has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
    return "Plan has been added successfully"
}

async function deletePlan(UID, planID){
    // delete Plan data, SEID is the schedule exercise's document id
    const planRef = doc(db, "ScheduleExercise", planID)
    const userRef = doc(db, "User", UID)

    await deleteDoc(planRef)
    .then(async () =>{
        /*await updateDoc(userRef, {
            Plans: arrayRemove(planID)
        })*/
        console.log("Plan has been deleted successfully")
    })
    return "Plan has been deleted successfully"
}

export {collectUserData, collectOneUser, addUserData, deleteUserData, collectRevData, collectOneRev, addRevData, deleteRevData,
    collectGoalData, collectOneGoal, addGoalData, deleteGoalData, collectExData, collectOneEx, collectCH, collectOneCH, addCH, deleteCH, 
    collectSE, collectOneSE, addSE, deleteSE, collectExGroup, collectOneExGroup, collectPlan, collectOnePlan, addPlan, deletePlan};