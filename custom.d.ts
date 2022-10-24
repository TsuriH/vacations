import UserModel from "./src/4-models/user-model";

declare namespace Express {
    export interface Request {
       user?: UserModel
    }
 }

 export interface ProcessEnv {
    [key: string]: string | undefined
}