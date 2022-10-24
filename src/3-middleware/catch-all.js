"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function catchAll(err, request, response, next) {
    console.log(err);
    var statusCode = err.status ? err.status : 500;
    if ((err === null || err === void 0 ? void 0 : err.code) === 'ER_DUP_ENTRY') {
        err.message = "User name is already taken";
    }
    if ((err === null || err === void 0 ? void 0 : err.code) === "ECONNREFUSED" && process.env.NODE_ENV === "production") {
        err.message = "Some error... Please try again...";
    }
    response.status(statusCode).send(err.message);
}
exports.default = catchAll;
