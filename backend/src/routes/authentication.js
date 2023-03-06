import express from "express";

import {signUp} from "../controller/authController";

const router = express.Router();

router.post('/signup', async(req, res) => {
    const auth = req.headers["authorization"]
    if (!auth) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.status(401).send({Error: "There are no authorization placed in header"});
        return;
    }
    const {authenticated, err, accessToken,verified} = await signUp(auth);
    console.log(authenticated);
    if (!authenticated) {
        res.status(400).send({Error : "Unable to sign up to Firebase", description: err});
        return;
    }
    sendSuccess(accessToken,res);
});

router.post("/login", async(req,res) => {

})

router.post('/forget-password', async(req,res) => {

})

function sendSuccess(accessToken,res) {
    res.setHeader('Authorization', "Bearer " + accessToken);
    res.status(200).send({description: "success"});
}

export default router;