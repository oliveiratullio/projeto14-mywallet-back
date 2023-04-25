import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
try {
    await mongoClient.connect()
    console.log('MongoDB conectado')
}catch(err) {
    console.log(err.message)
    console.log("vish")
}
export const db = mongoClient.db()