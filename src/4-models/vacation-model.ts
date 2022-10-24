import Joi from "joi";
import { UploadedFile } from "express-fileupload";

class VacationModel {

    public vacationId: number;
    public description: string;
    public destination: string;
    public imageName: string;
    public image: UploadedFile;
    public departDate: string;
    public returnDate: string;
    public price: number;
    public isFollowing: number;
    public followersCount: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.departDate = vacation.departDate;
        this.returnDate = vacation.returnDate;
        this.price = vacation.price;
        this.isFollowing = vacation.isFollowing;
        this.followersCount = vacation.followersCount;

    }


    private static validationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        description: Joi.string().required().min(10).max(250),
        destination: Joi.string().required().min(2).max(20),
        departDate: Joi.string().required(),
        returnDate: Joi.string().required(),
        price: Joi.number().required().min(1).max(6000),
        isFollowing: Joi.number().optional(),
        followersCount: Joi.number().optional(),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),

    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }



}

export default VacationModel