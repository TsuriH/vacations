import * as crypto from "crypto";
const salt = "ThisIsTheSiteOfTsuri";

function hash(plainText) {

    if (!plainText) return null;

    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");

}

export default hash
