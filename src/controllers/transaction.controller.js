import { db } from "../database/database.connection.js";

export async function transaction(req, res) {
    try{
        const session = res.locals.session;
        await db.collection('transactions').insertOne({...req.body, value: Number(req.body.value), userId: session.userId, date: dayjs().format()});
        res.sendStatus(201);
    } catch(error){
        res.status(500).send(error.message);
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