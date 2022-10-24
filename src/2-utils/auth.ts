import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";


const secretKey = "VacationsOfTsuri";




function generateNewToken(user: UserModel): string {


    const container = { user };
    console.log(container)


    const token = jwt.sign(container, secretKey, { expiresIn: "2h" });

    return token;
}

function verifyToken(authHeader: string): Promise<boolean | any> {

    return new Promise<boolean | any>((resolve, reject) => {

        try {

         
            if (!authHeader) {
                resolve(false);
                return;
            }

    
            const token = authHeader.substring(7);
            
           
            if (!token) {
                resolve(false);
                return;
            }

      
            jwt.verify(token, secretKey, (err,result) => {
           
                if (err) {
                    resolve(false);
                    return;
                }

       
                resolve(result);

            });

        }
        catch (err: any) {
            reject(err);
        }

    });

}

function getUserRoleFromToken(authHeader: string): string {


    const token = authHeader.substring(7);


    const container = jwt.decode(token) as { user: UserModel };


    const user = container.user;

 
    const role = user.roleName;

    return role;
}

export default {
    generateNewToken,
    verifyToken,
    getUserRoleFromToken
};