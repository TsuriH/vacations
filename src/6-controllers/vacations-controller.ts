import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/vacation-model";
import vacationsLogic from "../5-logic/vacations-logic";



const router = express.Router()


router.get("/stats", async (request: any, response: Response, next: NextFunction) => {
    try {

        const result = await vacationsLogic.vacationsStats()

        response.json(result)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("", verifyLoggedIn, async (request: any, response: Response, next: NextFunction) => {
    try {

        const vacations = await vacationsLogic.showAllVacations(request.user.user.userId)
        response.json(vacations)

    }
    catch (err: any) {
        next(err);
    }
});

router.get("/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.vacationId;

        const vacation = await vacationsLogic.getOneVacation(id);

        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("", verifyLoggedIn, async (request: any, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body) 
        const addedVacation = await vacationsLogic.addVacation(vacation)
        response.status(201).json(addedVacation);

    }
    catch (err: any) {
        next(err);
    }
});


router.delete("/:vacationId", verifyLoggedIn, async (request: any, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId 

        await vacationsLogic.deleteVacation(vacationId)

        response.sendStatus(204)

    }
    catch (err: any) {
        next(err);
    }
});


router.post("/following", verifyLoggedIn, async (request: any, response: Response, next: NextFunction) => {

    const isFollow = request.body.isFollow
    const vacationId = request.body.vacationId

    
    try {
        const vacations = await vacationsLogic.followVacation(request.user.user.userId, vacationId, isFollow)
        response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});


router.put("/:vacationId", verifyLoggedIn, async (request: any, response: Response, next: NextFunction) => {

   

    
    try {
        if(request?.files?.image){
            request.body.image = request.files.image;
        }
      
        request.body.vacationId = +request.params.vacationId

        const vacation = new VacationModel(request.body) 
        const addedVacation = await vacationsLogic.updateVacation(vacation)
        response.status(201).json(addedVacation);

    }
    catch (err: any) {
        next(err);
    }
});




export default router;
