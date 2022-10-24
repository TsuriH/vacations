import { NextFunction, Request, Response } from "express";


function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {
    console.log(err);
    
    const statusCode = err.status ? err.status : 500;
   

    if (err?.code === 'ER_DUP_ENTRY'){
        err.message = "User name is already taken"

    }
 
    if(err?.code === "ECONNREFUSED" && process.env.NODE_ENV === "production"){
        err.message = "Some error... Please try again..."
    }

     
        response.status(statusCode).send(err.message);
}

export default catchAll;
