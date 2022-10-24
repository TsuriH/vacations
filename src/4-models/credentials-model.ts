import Joi from "joi";

class CredentialsModel {

    public userName: string;
    public password: string;

    constructor(user: CredentialsModel){
        this.userName = user.userName
        this.password = user.password
    }

    private static validationSchema = Joi.object({
        userName: Joi.string().optional().min(4).max(100),
        password: Joi.string().required().min(2).max(500),
    });

    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default CredentialsModel