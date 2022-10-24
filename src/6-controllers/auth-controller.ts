import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";
import verifyLoggedIn from "../3-middleware/verify-logged-in";

const router = express.Router();

router.get("/loggedIn", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        response.status(201).json("is logged in")
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body)
        const token = await authLogic.register(user)
        response.status(201).json(token)
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const credentials = new CredentialsModel(request.body)
        const token = await authLogic.login(credentials)
        response.json(token)
    }
    catch (err: any) {

        next(err)
      

    }
});






export default router;
