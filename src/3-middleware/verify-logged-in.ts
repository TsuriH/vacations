import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../4-models/client-errors";
import jwt from "jsonwebtoken"; 
const secretKey = "VacationsOfTsuri";

async function verifyLoggedIn(request: any, response: Response, next: NextFunction): Promise<void> {

    try {
        const authHeader = request.header("authorization");
 
    
    const token = authHeader.substring(7);
    
    const user = jwt.verify(token, secretKey)

    
        if (!user) {
            next(new UnauthorizedError("You are not logged in"));
            return;
        }
    
        request.user = user
      
        next(); 
        
    } catch (error) {
        next(new UnauthorizedError("You are not logged in")); 
    }
  
}

export default verifyLoggedIn;
