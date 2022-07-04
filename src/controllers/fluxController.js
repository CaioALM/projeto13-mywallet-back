
import db from "../databases/mongodb.js";
import chalk from "chalk";
import Joi from "joi";
import dayjs from "dayjs";

export async function inputFlux(req, res){

    const movimentation = req.body

        const outFluxSchema = Joi.object({
            value: Joi.number().required(),
            description: Joi.string().required(),
        });
        console.log()
        const {error} = outFluxSchema.validate(movimentation, {abortEarly: false});
        if(error){
            return res.status(422).send("Erro ao inserir os dados. Por favor, verifique-os novamente.");
        }; 

    try {
        const {authorization} = req.headers;
        const token = authorization?.replace("Bearer","").trim();
        
        const session = await db.collection("sessions").findOne({token});
     
        const id = session.userId;
        const dayFlux = dayjs().format("DD/MM");
        await db.collection("cashFlux").insertOne({
            userId: id,
            value: movimentation.value,
            description: movimentation.description,
            type: "entry", 
            day: dayFlux});
        res.status(201).send(console.log(chalk.bold.green("Influx funcionando!")));
    } catch (e) {
        res.status(500).send("Erro na página.");
    }

}
export async function outputFlux(req, res){

    const movimentatioOut = req.body

        const outFluxSchema = Joi.object({
            value: Joi.number().required(),
            description: Joi.string().required(),
        });

        const {error, value} = outFluxSchema.validate(movimentatioOut, {abortEarly: false});
        if(error){
            return res.status(422).send("Erro ao inserir os dados. Por favor, verifique-os novamente.");
        };  

    try {
        const {authorization} = req.headers;
        const token = authorization?.replace("Bearer","").trim();
  
        const session = await db.collection("sessions").findOne({token});

        const id = session.userId;
        const dayFlux = dayjs().format("DD/MM");
        await db.collection("cashFlux").insertOne({
            userId: id,
            value: movimentatioOut.value,
            description: movimentatioOut.description,
            type: "exit", 
            day: dayFlux});
        res.status(201).send(console.log(chalk.bold.green("Outflux funcionando!")));
    } catch (e) {
        res.status(500).send("Erro na página.");
    }
}