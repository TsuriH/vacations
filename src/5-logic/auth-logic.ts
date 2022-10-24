import { OkPacket } from "mysql";
import auth from "../2-utils/auth";
import hash from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../4-models/client-errors";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> { 

    user.password = hash(user.password)

    console.log(user.password)

    const error = user.validate();

    if (error) throw new ValidationError(error);
    
    const sql = `INSERT INTO users VALUES(
        DEFAULT,
        '${user.firstName}',
        '${user.lastName}',
        '${user.userName}',
        '${user.password}',
        '${RoleModel.User}'
        )`;

    const result: OkPacket = await dal.execute(sql);

    user.userId = result.insertId;
   
    delete user.password;


    const token = auth.generateNewToken(user);

    return token;
}


async function login(credentials: CredentialsModel): Promise<string> {

    credentials.password = hash(credentials.password)

    console.log(credentials.password)

    const error = credentials.validate()
    
    if(error) throw new ValidationError(error)

    console.log(credentials.password)

    const sql = "SELECT userId, firstName, lastName, userName, roles.roleName FROM users JOIN roles WHERE users.roleName = roles.roleName AND userName = ? AND password = ?"

    console.log(sql)
    
    const user = await dal.execute(sql, [credentials.userName, credentials.password]);
    
    if(user.length === 0) throw new UnauthorizedError("Incorrect username or password")

    const token = auth.generateNewToken(user[0])
    
    return token
}

export default {
    register, login
};
