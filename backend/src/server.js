import express from "express";
import cors from "cors";
import {initializeApp} from "firebase/app";

import authRoutes from "./routes/authentication";
import {firebase} from "./firebaseConfig";
import {collectData} from "./DBConnection";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/users",authRoutes);

app.listen(80, () => {
    console.log(`Server running on localhost:80`);
    collectData();
})