import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import joi from 'joi'
import  db  from '../databases/mongodb.js'

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi
    .string()
    .pattern( new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
    confirmPassword: joi.ref("password")
})
.with("password", "confirmPassword")

const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
}) 

export async function userSignUp(req, res){

    const user = req.body
    try {

        const {error} = signupSchema.validate(user)

    if (error) {
        return res.sendStatus(422)
    }

    const users = await db.collection('users').find({}).toArray()
    if (users.some(elem => elem.email === user.email)) {
        return res.sendStatus(409)
    }

        const passwordCrypto = bcrypt.hashSync(user.password, 10)

        await db.collection('users').insertOne({...user, password: passwordCrypto})
    
        res.status(201).send('Usuário criado com sucesso')

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
}


export async function userSignIn(req, res){

    const user = req.body
    try{
        const {error} = signinSchema.validate(user)
        if (error) {
                res.sendStatus(422)
            }
            const usuario = await db.collection("users").findOne({email: user.email})

            if (usuario && bcrypt.compareSync(user.password, usuario.password)){
                const token = uuid()

                await db.collection('sessions').insertOne( {
                    token,
                    userId: user._id
                })
                return res.status(201).send({token})
            } else {
                return res.status(401).send('Email ou senha incorretos')
            }
    } catch(error) {
        res.sendStatus(500)
    }
 

    
}