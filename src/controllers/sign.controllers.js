import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

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

export async function signIn(req, res){
    const {email, password} = req.body
    try{
        const user = await db.collection("users").findOne({email: email})
        if(!user) return res.sendStatus(404)
        const correctPassword = bcrypt.compareSync(password, user.password)
        if(!correctPassword) return res.sendStatus(401)
        const token = uuid()
        db.collection("sessions").insertOne({userId: user._id, token})
        return res.status(200).send({name: user.name, token})
    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function logout(req, res){
    const {token} = req.body
    try{
        await db.collection("sessions").deleteOne({token})
        res.status(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}