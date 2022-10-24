"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var role_model_1 = __importDefault(require("./role-model"));
var UserModel = /** @class */ (function () {
    function UserModel(user) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.password = user.password;
        this.roleName = role_model_1.default.User;
    }
    UserModel.prototype.validate = function () {
        var _a;
        var result = UserModel.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    UserModel.validationSchema = joi_1.default.object({
        userId: joi_1.default.number().optional().positive().integer(),
        firstName: joi_1.default.string().required().min(2).max(20),
        lastName: joi_1.default.string().required().min(2).max(20),
        userName: joi_1.default.string().required().min(2).max(20),
        password: joi_1.default.string().required().min(4).max(500),
        roleName: joi_1.default.optional()
    });
    return UserModel;
}());
exports.default = UserModel;
