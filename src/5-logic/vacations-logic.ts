import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid"

//get all vacations

async function showAllVacations(userId: number): Promise<VacationModel[]> {

    const sql = `SELECT DISTINCT
                 V.* , 
                 EXISTS(SELECT * FROM vacationsfollowers WHERE vacationId = F.vacationId AND userId = ${userId}) AS isFollowing,
                 COUNT(F.userId) AS followersCount
                 FROM vacations as V LEFT JOIN vacationsfollowers as F
                 ON V.vacationId = F.vacationId
                 GROUP BY vacationId
                 ORDER BY departDate DESC`

    const allVacations = await dal.execute(sql)
    return allVacations

}

async function getOneVacation(id: number): Promise<VacationModel> {

    const sql = `SELECT * FROM vacations WHERE vacationId = ${id}`;

    const vacations = await dal.execute(sql); 

    const vacation = vacations[0];

    if (!vacation) throw new IdNotFoundError(id);

    return vacation;
}


async function showFollowedVacationsByUser(userId: number) {

    const sql = `SELECT DISTINCT
                 V.*,
                 EXISTS(SELECT * FROM vacationsfollowers WHERE vacationId = F.vacationId AND userId =${userId}) AS isFollowing,
                 COUNT(F.userId) AS followersCount
                 FROM vacations as V LEFT JOIN vacationsfollowers as F 
                 ON V.vacationId = F.vacationId WHERE f.userId = ${userId}
                 GROUP BY vacationId
                 ORDER BY isFollowing DESC`

    const followedVacationsByUser = await dal.execute(sql)

    return followedVacationsByUser

}


async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validate()

    if(error) throw new ValidationError(error)

    if (vacation.image) {

        console.log(vacation.image)
        console.log(vacation.image);
        
         const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));

         vacation.imageName = uuid() + extension;

         await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);

         delete vacation.image;

    }

    

    const sql = `INSERT INTO vacations VALUES(
        DEFAULT,
         '${vacation.description}',
         '${vacation.destination}',
         '${vacation.imageName}',
         '${vacation.departDate}',
         '${vacation.returnDate}',
          ${vacation.price}
          ) `
        
          

    const result: OkPacket = await dal.execute(sql)

    vacation.vacationId = result.insertId
        console.log(vacation)
    return vacation


}

//update vacation

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    
    const error = vacation.validate()

    if(error) throw new ValidationError(error)

    if (vacation.image) {

        console.log(vacation.image);
        
         const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));

         vacation.imageName = uuid() + extension;

         await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);

         delete vacation.image;

    }

    console.log("BEFORE SAVE IN DBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",vacation)

    const sql = `UPDATE vacations SET
      description = '${vacation.description}', 
      destination = '${vacation.destination}',
      imageName = '${vacation.imageName}', 
      departDate = '${vacation.departDate}', 
      returnDate = '${vacation.returnDate}', 
      price = ${vacation.price}
      WHERE vacationId = ${vacation.vacationId}`

    const result: OkPacket = await dal.execute(sql)

    if (result.affectedRows === 0) throw new IdNotFoundError(vacation.vacationId)

    return vacation

}

//delete vacation

async function deleteVacation(vacationId: number): Promise<void> {

    const sql = `DELETE FROM vacations WHERE vacationId = ${vacationId}`

    const result: OkPacket = await dal.execute(sql);

    if (result.affectedRows === 0) throw new IdNotFoundError(vacationId);

}

//follow vacation

async function followVacation(userId: number, vacationId: number, isFollow: number): Promise<any> {

    let sql = ""


    if (isFollow === 0) {
        sql = `INSERT INTO vacationsfollowers VALUES(${vacationId}, ${userId})`
    } else {
        sql = `DELETE FROM vacationsfollowers WHERE vacationsfollowers.vacationId = ${vacationId} AND 
            vacationsfollowers.userId = ${userId}`

    }

    const result: OkPacket = await dal.execute(sql)
    return result
}


async function vacationsStats(): Promise<VacationModel[]> {
    const sql = `
        SELECT DISTINCT V.* , 
        COUNT(F.vacationId) AS followersCount
        FROM vacations as V  JOIN vacationsfollowers as F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
    `

    const result = await dal.execute(sql)
 
    return result
 }
 




export default {
    deleteVacation,
    updateVacation,
    addVacation,
    showFollowedVacationsByUser,
    showAllVacations,
    followVacation,
    getOneVacation,
    vacationsStats
};
