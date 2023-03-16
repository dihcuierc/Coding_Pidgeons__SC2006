import express from "express";

import {logIn, logOut, sendVerification, signUp, verify} from "../controller/authController";

const router = express.Router();

router.post('/signup', async(req, res, next) => {
    let b64auth = (req.header("authorization") || '');
    const {authenticated, err, accessToken} = await signUp(b64auth);
    if (!authenticated)
        return next(err);
    sendSuccessAuthentication(accessToken,res);
});

router.post("/signin", async(req,res, next) => {
    let b64auth = (req.header("authorization") || '');
    const { authenticated, err, accessToken, verified} = await logIn(b64auth);
    if (!authenticated)
        return next(err);
    sendSuccessAuthentication(accessToken,res);
})

router.post('/forget-password', async(req,res) => {

})

router.post('/signout', async(req,res) => {
    let header = req.header["authorization"];
    if (!header) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.status(401).send({Error: "There are no authorization placed in header"});
        return;
    }
    const {loggedOut, err} = await logOut(header);

})

router.post('/verifyEmail', async(req,res,next) => {
    const {verified,err} = await verify();
    if (!verified) {
        return next(err);
    }
    res.status(200).send({message: "success"});
})


function sendSuccessAuthentication(accessToken,res) {
    res.setHeader('Authorization', "Bearer " + accessToken);
    res.status(200).send({message: "success"});
}

export default router;