"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var VacationModel = /** @class */ (function () {
    function VacationModel(vacation) {
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
    VacationModel.prototype.validate = function () {
        var _a;
        var result = VacationModel.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.validationSchema = joi_1.default.object({
        vacationId: joi_1.default.number().optional().positive().integer(),
        description: joi_1.default.string().required().min(10).max(250),
        destination: joi_1.default.string().required().min(2).max(20),
        departDate: joi_1.default.string().required(),
        returnDate: joi_1.default.string().required(),
        price: joi_1.default.number().required().min(1).max(6000),
        isFollowing: joi_1.default.number().optional(),
        followersCount: joi_1.default.number().optional(),
        imageName: joi_1.default.string().optional(),
        image: joi_1.default.object().optional(),
    });
    return VacationModel;
}());
exports.default = VacationModel;
