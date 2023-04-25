import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"

export async function signUp(req, res){
    const {name, email, password} = req.body
    const userUnavailable = await db.collection("users").findOne({email: email})
    if(userUnavailable) return res.sendStatus(409)

    const hash = bcrypt.hashSync(password, 10)
    try{
        await db.collection("users").insertOne({name, email, password: hash})
        return res.sendStatus(201)
    } catch (err) {
        res.sendStatus(500).send(err.message)
        console.log(err.message)
    }
} 