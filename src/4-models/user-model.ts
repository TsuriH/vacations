import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public roleName: string; 

    constructor(user: UserModel ) {
        this.userId = user.userId
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.userName = user.userName
        this.password = user.password
        this.roleName = RoleModel.User
    }

    private static validationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        userName: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(4).max(500),
        roleName: Joi.optional()
    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }


}

export default UserModel