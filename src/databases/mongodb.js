
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
    await mongoClient.connect();
    db = mongoClient.db("MONGO_DATABASE");
    console.log('banco conectado');
} catch (error) {
    console.log('Erro ao se conectar com banco de dados!', error);
}
export default db;