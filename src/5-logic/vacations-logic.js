"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = __importDefault(require("../2-utils/dal"));
var client_errors_1 = require("../4-models/client-errors");
var uuid_1 = require("uuid");
//get all vacations
function showAllVacations(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, allVacations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT DISTINCT\n                 V.* , \n                 EXISTS(SELECT * FROM vacationsfollowers WHERE vacationId = F.vacationId AND userId = ".concat(userId, ") AS isFollowing,\n                 COUNT(F.userId) AS followersCount\n                 FROM vacations as V LEFT JOIN vacationsfollowers as F\n                 ON V.vacationId = F.vacationId\n                 GROUP BY vacationId\n                 ORDER BY departDate DESC");
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    allVacations = _a.sent();
                    return [2 /*return*/, allVacations];
            }
        });
    });
}
function getOneVacation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations, vacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM vacations WHERE vacationId = ".concat(id);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    vacations = _a.sent();
                    vacation = vacations[0];
                    if (!vacation)
                        throw new client_errors_1.IdNotFoundError(id);
                    return [2 /*return*/, vacation];
            }
        });
    });
}
function showFollowedVacationsByUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, followedVacationsByUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT DISTINCT\n                 V.*,\n                 EXISTS(SELECT * FROM vacationsfollowers WHERE vacationId = F.vacationId AND userId =".concat(userId, ") AS isFollowing,\n                 COUNT(F.userId) AS followersCount\n                 FROM vacations as V LEFT JOIN vacationsfollowers as F \n                 ON V.vacationId = F.vacationId WHERE f.userId = ").concat(userId, "\n                 GROUP BY vacationId\n                 ORDER BY isFollowing DESC");
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    followedVacationsByUser = _a.sent();
                    return [2 /*return*/, followedVacationsByUser];
            }
        });
    });
}
function addVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var error, extension, sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = vacation.validate();
                    if (error)
                        throw new client_errors_1.ValidationError(error);
                    if (!vacation.image) return [3 /*break*/, 2];
                    console.log(vacation.image);
                    console.log(vacation.image);
                    extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
                    vacation.imageName = (0, uuid_1.v4)() + extension;
                    return [4 /*yield*/, vacation.image.mv("./src/1-assets/images/" + vacation.imageName)];
                case 1:
                    _a.sent();
                    delete vacation.image;
                    _a.label = 2;
                case 2:
                    sql = "INSERT INTO vacations VALUES(\n        DEFAULT,\n         '".concat(vacation.description, "',\n         '").concat(vacation.destination, "',\n         '").concat(vacation.imageName, "',\n         '").concat(vacation.departDate, "',\n         '").concat(vacation.returnDate, "',\n          ").concat(vacation.price, "\n          ) ");
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 3:
                    result = _a.sent();
                    vacation.vacationId = result.insertId;
                    console.log(vacation);
                    return [2 /*return*/, vacation];
            }
        });
    });
}
//update vacation
function updateVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var error, extension, sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = vacation.validate();
                    if (error)
                        throw new client_errors_1.ValidationError(error);
                    if (!vacation.image) return [3 /*break*/, 2];
                    console.log(vacation.image);
                    extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
                    vacation.imageName = (0, uuid_1.v4)() + extension;
                    return [4 /*yield*/, vacation.image.mv("./src/1-assets/images/" + vacation.imageName)];
                case 1:
                    _a.sent();
                    delete vacation.image;
                    _a.label = 2;
                case 2:
                    console.log("BEFORE SAVE IN DBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", vacation);
                    sql = "UPDATE vacations SET\n      description = '".concat(vacation.description, "', \n      destination = '").concat(vacation.destination, "',\n      imageName = '").concat(vacation.imageName, "', \n      departDate = '").concat(vacation.departDate, "', \n      returnDate = '").concat(vacation.returnDate, "', \n      price = ").concat(vacation.price, "\n      WHERE vacationId = ").concat(vacation.vacationId);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 3:
                    result = _a.sent();
                    if (result.affectedRows === 0)
                        throw new client_errors_1.IdNotFoundError(vacation.vacationId);
                    return [2 /*return*/, vacation];
            }
        });
    });
}
//delete vacation
function deleteVacation(vacationId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "DELETE FROM vacations WHERE vacationId = ".concat(vacationId);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 0)
                        throw new client_errors_1.IdNotFoundError(vacationId);
                    return [2 /*return*/];
            }
        });
    });
}
//follow vacation
function followVacation(userId, vacationId, isFollow) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "";
                    if (isFollow === 0) {
                        sql = "INSERT INTO vacationsfollowers VALUES(".concat(vacationId, ", ").concat(userId, ")");
                    }
                    else {
                        sql = "DELETE FROM vacationsfollowers WHERE vacationsfollowers.vacationId = ".concat(vacationId, " AND \n            vacationsfollowers.userId = ").concat(userId);
                    }
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function vacationsStats() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "\n        SELECT DISTINCT V.* , \n        COUNT(F.vacationId) AS followersCount\n        FROM vacations as V  JOIN vacationsfollowers as F\n        ON V.vacationId = F.vacationId\n        GROUP BY vacationId\n    ";
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.default = {
    deleteVacation: deleteVacation,
    updateVacation: updateVacation,
    addVacation: addVacation,
    showFollowedVacationsByUser: showFollowedVacationsByUser,
    showAllVacations: showAllVacations,
    followVacation: followVacation,
    getOneVacation: getOneVacation,
    vacationsStats: vacationsStats
};
