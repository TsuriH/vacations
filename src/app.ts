import dotenv from 'dotenv';
dotenv.config()
import express from "express";
import fs from "fs"
import cors from "cors";
import path from "path"
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import config from "./2-utils/config";
import vacationsController from "./6-controllers/vacations-controller";
import expressFileUpload from "express-fileupload"



const server = express();


console.log(process.env.NODE_ENV,config)


server.use("/1-assets", express.static(path.join(__dirname,'1-assets')))
server.use(express.static(path.join(__dirname, 'build')));
server.use(cors());
server.use(express.json());
server.use(expressFileUpload())
server.use("/api/auth",authController)
server.use("/api/vacations", vacationsController)


server.get('/*', async (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build','index.html'));
})


server.use("*", routeNotFound);


server.use(catchAll);

server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));
