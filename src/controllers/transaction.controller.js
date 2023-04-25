import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function transaction(req, res) {
    const { description, value, type } = req.body
    const { session, user } = res.locals
    try {
        db.collection("transactions").insertOne({
            description,
            value: Number(value.toFixed(2)),
            type,
            userId: session.userId,
            date: dayjs().format("DD/MM")
        })
        return res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
export async function listTransaction(req, res){
    const {user} = res.locals
    try{
        const transactionList = await db.collection("transactions").find({userId: user._id}).toArray()
        return res.status(200).send(transactionList)
    } catch (err){
        res.status(500).send(err.message)
    }
}