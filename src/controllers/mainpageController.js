import db from "../databases/mongodb.js";


export async function getMainPage(req, res){
    
    let sum = 0;    
    try {
        const {authorization} = req.headers;
        const token = authorization?.replace("Bearer","").trim();

        const session = await db.collection("sessions").findOne({token});
    
        const userFlux = await db.collection("cashFlux").find({userId: session.userId}).toArray();
        userFlux.map((elem) => {
            if(elem.type === "entry"){
                sum += parseFloat(elem.value);
            } else if (elem.type === "exit"){
                sum -= parseFloat(elem.value);
            }
        });
        res.status(200).send([userFlux, sum]);
    } catch (e) {
        res.status(500).send("Erro na página.");
    }
}