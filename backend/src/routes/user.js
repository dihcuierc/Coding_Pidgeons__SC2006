import express from "express";

import {collectUserData, collectOneUser, addUserData, deleteUserData} from "../controller/DBConnection";

const router = express.Router();

router.get('/collectUserData', async(req, res) => {
    const User = await collectUserData()
    //console.log(User)
    console.log("A")
    res.status(200).send({message: "received", body: User})
})



export default router;