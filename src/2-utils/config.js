"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isProd = process.env.NODE_ENV === "production";
console.log(isProd);
var Config = /** @class */ (function () {
    function Config() {
        this.port = process.env.PORT || 3007;
        this.mysqlHost = isProd ? process.env.DATABASE_HOST : "localhost";
        this.mysqlUser = isProd ? process.env.DATABASE_USER : "root";
        this.mysqlPassword = isProd ? process.env.DATABASE_PASSWORD : "";
        this.mysqlDatabase = isProd ? process.env.DATABASE_NAME : "vacationideas";
        this.mysqlPort = isProd ? +process.env.DATABASE_PORT : 0;
    }
    return Config;
}());
var config = new Config();
exports.default = config;
