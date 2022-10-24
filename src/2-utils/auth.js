"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secretKey = "VacationsOfTsuri";
function generateNewToken(user) {
    var container = { user: user };
    console.log(container);
    var token = jsonwebtoken_1.default.sign(container, secretKey, { expiresIn: "2h" });
    return token;
}
function verifyToken(authHeader) {
    return new Promise(function (resolve, reject) {
        try {
            if (!authHeader) {
                resolve(false);
                return;
            }
            var token = authHeader.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jsonwebtoken_1.default.verify(token, secretKey, function (err, result) {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(result);
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
function getUserRoleFromToken(authHeader) {
    var token = authHeader.substring(7);
    var container = jsonwebtoken_1.default.decode(token);
    var user = container.user;
    var role = user.roleName;
    return role;
}
exports.default = {
    generateNewToken: generateNewToken,
    verifyToken: verifyToken,
    getUserRoleFromToken: getUserRoleFromToken
};
