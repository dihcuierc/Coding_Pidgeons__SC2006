import express from "express";
import cors from "cors";

import authRoutes from "./routes/authentication";
import {collectUserData, collectOneUser, addUserData, deleteUserData, collectRevData, collectOneRev, addRevData, deleteRevData,
    collectGoalData, collectOneGoal, addGoalData, deleteGoalData, collectExData, collectOneEx, collectCH, collectOneCH, addCH, deleteCH, 
    collectSE, collectOneSE, addSE, deleteSE, collectExGroup, collectOneExGroup, collectPlan, collectOnePlan, addPlan, deletePlan, uploadFile} from "./controller/DBConnection";
import userRoutes from "./routes/user";
import {errorHandler} from "./errors/errorHandler";
import { deleteUser } from "firebase/auth";
import { uploadBytesResumable, getStorage, ref, getDownloadURL } from "firebase/storage";

const app = express();
const storage = getStorage();
app.use(cors());
app.use(express.json());
app.use("/users",authRoutes);
app.use("/DB", userRoutes)
app.use(errorHandler);

app.listen(8080, () => {
    console.log(`Server running on localhost:8080`);
    //uploadFile()
    getDownloadURL(ref(storage, 'Profile/Ernest.jpg'))
    //collectUserData();
    //collectRevData();
    //collectOneUser("2yJag0rbfr7VyQvkuzZn");
    //collectOneRev("9hkil8WTIIWf2XJdZxWU");
    //addUserData("123456", "Kai Jie", "Wan", "kjwan", "kjwan@gmail.com", null, "98765432")
    //deleteUserData("fTF3x1lyCfxvQJbepxRi")
    //collectOneRev("9hkil8WTIIWf2XJdZxWU")
    //addRevData("9hkil8WTIIWf2XJdZxWU", "Excellent workout", "Jojo", 4.8, 1)
    //deleteRevData("9hkil8WTIIWf2XJdZxWU", "di5dGgNI0nhIhDCmQTwG")
    //collectGoalData()
    //collectOneGoal("9hkil8WTIIWf2XJdZxWU")
    //addGoalData("9hkil8WTIIWf2XJdZxWU", "Gain muscle mass", 62, 75, "", "20-5-23", false)
    //deleteGoalData("9hkil8WTIIWf2XJdZxWU", 2)
    
})